# app/services/deduplication.py
import os
import re
from typing import List, Tuple
import numpy as np
from app.data.knowledge_base import HISTORICAL_PROBLEMS
from app.models.schemas import SimilarProblemMatch

# Limit thread memory allocation for constrained cloud environments (e.g. Render 512MB)
os.environ["OMP_NUM_THREADS"] = "1"
os.environ["MKL_NUM_THREADS"] = "1"
os.environ["TOKENIZERS_PARALLELISM"] = "false"

_embedder = None
_kb_vectors = None

def get_embedder_and_vectors():
    """Lazy-load SentenceTransformer or gracefully fall back to TF-IDF vectorizer if memory is limited."""
    global _embedder, _kb_vectors
    if _embedder is None:
        try:
            import torch
            torch.set_num_threads(1)
            from sentence_transformers import SentenceTransformer
            _embedder = SentenceTransformer('all-MiniLM-L6-v2')
            kb_texts = [p["description"] for p in HISTORICAL_PROBLEMS]
            _kb_vectors = _embedder.encode(kb_texts, normalize_embeddings=True) if kb_texts else np.array([])
        except Exception as e:
            print(f"⚠️ [SentenceTransformer Fallback to Light Vectorizer]: {e}")
            _embedder = "TFIDF_FALLBACK"
            _kb_vectors = None
    return _embedder, _kb_vectors

def compute_lightweight_similarity(query: str, target: str) -> float:
    """Ultra-fast, zero-memory cosine keyword similarity for memory-constrained environments."""
    def tokenize(s: str):
        return set(re.findall(r'\w+', s.lower()))
    
    q_words = tokenize(query)
    t_words = tokenize(target)
    if not q_words or not t_words:
        return 0.0
    
    intersection = q_words.intersection(t_words)
    return len(intersection) / float(len(q_words.union(t_words)))

def detect_relationships(text: str, user_lat: float, user_lon: float) -> Tuple[List[SimilarProblemMatch], str]:
    """
    Returns list of SimilarProblemMatch objects and relationship action.
    Resilient across both GPU/High-RAM and 512MB free tier containers.
    """
    embedder, kb_vectors = get_embedder_and_vectors()
    matches = []
    has_exact = False
    has_similar = False

    if embedder != "TFIDF_FALLBACK" and kb_vectors is not None and len(kb_vectors) > 0:
        try:
            from sklearn.metrics.pairwise import cosine_similarity
            query_vec = embedder.encode([text], normalize_embeddings=True)
            sims = cosine_similarity(query_vec, kb_vectors)[0]

            for idx, score in enumerate(sims):
                score_val = float(score)
                if score_val >= 0.50:
                    prob = HISTORICAL_PROBLEMS[idx]
                    if score_val >= 0.80:
                        rel = "EXACT_DUPLICATE"
                        has_exact = True
                    elif score_val >= 0.62:
                        rel = "SIMILAR_PROBLEM"
                        has_similar = True
                    else:
                        rel = "RELATED_THEME"

                    matches.append(SimilarProblemMatch(
                        problemId=prob["id"],
                        title=prob["title"],
                        similarity=round(score_val, 2),
                        relationship=rel,
                        blueprintUrl=prob.get("blueprintUrl")
                    ))
        except Exception:
            pass

    # If neural embeddings yielded no matches or failed due to memory
    if not matches:
        for prob in HISTORICAL_PROBLEMS:
            sim = compute_lightweight_similarity(text, prob["title"] + " " + prob["description"])
            # Scale heuristic to similarity range
            sim_score = min(0.95, sim * 1.8 + 0.35)
            if sim_score >= 0.50:
                if sim_score >= 0.78:
                    rel = "EXACT_DUPLICATE"
                    has_exact = True
                elif sim_score >= 0.62:
                    rel = "SIMILAR_PROBLEM"
                    has_similar = True
                else:
                    rel = "RELATED_THEME"

                matches.append(SimilarProblemMatch(
                    problemId=prob["id"],
                    title=prob["title"],
                    similarity=round(sim_score, 2),
                    relationship=rel,
                    blueprintUrl=prob.get("blueprintUrl")
                ))

    # Sort matches by similarity score descending
    matches.sort(key=lambda x: x.similarity, reverse=True)

    if has_exact:
        summary_action = "REUSE_EXISTING_SOLUTION"
    elif has_similar:
        summary_action = "ADAPT_SIMILAR_BLUEPRINT"
    else:
        summary_action = "ROUTE_TO_INSTITUTION"

    return matches, summary_action