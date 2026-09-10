# app/services/triage.py
import re
import numpy as np
from app.data.knowledge_base import DOMAIN_TAXONOMY, ROUTINE_MUNICIPAL_KEYWORDS
from app.services.deduplication import get_embedder_and_vectors, compute_lightweight_similarity

domain_names = list(DOMAIN_TAXONOMY.keys())
domain_descriptions = [DOMAIN_TAXONOMY[d] for d in domain_names]
_domain_vectors = None

def get_domain_vectors():
    global _domain_vectors
    if _domain_vectors is None:
        embedder, _ = get_embedder_and_vectors()
        if embedder != "TFIDF_FALLBACK":
            try:
                _domain_vectors = embedder.encode(domain_descriptions, normalize_embeddings=True)
            except Exception:
                _domain_vectors = "FALLBACK"
        else:
            _domain_vectors = "FALLBACK"
    return _domain_vectors

def evaluate_triage_and_domain(text: str):
    """
    Returns: (is_routine, category, confidence)
    """
    text_clean = text.lower().strip()
    if len(text_clean) < 10:
        return False, "Other", 0.30

    # 1. Routine municipal check
    for phrase in ROUTINE_MUNICIPAL_KEYWORDS:
        if phrase in text_clean:
            return True, "Routine Municipal Complaint", 0.95

    # 2. Semantic Domain Similarity
    embedder, _ = get_embedder_and_vectors()
    dom_vectors = get_domain_vectors()

    if embedder != "TFIDF_FALLBACK" and dom_vectors != "FALLBACK" and dom_vectors is not None:
        try:
            from sklearn.metrics.pairwise import cosine_similarity
            text_vec = embedder.encode([text_clean], normalize_embeddings=True)
            sims = cosine_similarity(text_vec, dom_vectors)[0]
            
            best_idx = int(sims.argmax())
            confidence = float(sims[best_idx])
            
            best_domain = domain_names[best_idx] if confidence > 0.20 else "Other"
            return False, best_domain, round(min(confidence + 0.35, 0.98), 2)
        except Exception:
            pass

    # Keyword / Semantic Heuristic Fallback
    best_domain = "Other"
    best_sim = 0.0

    domain_keywords = {
        "Water & Sanitation": ["water", "pani", "drainage", "sewage", "flood", "well", "nal", "handpump", "pipe", "tanker"],
        "Roads & Transport": ["road", "sadak", "pothole", "gaddha", "bridge", "pulia", "bus", "transport", "traffic"],
        "Healthcare Access": ["hospital", "doctor", "medicine", "dawa", "ambulance", "health", "clinic", "patient"],
        "Waste Management": ["garbage", "kachra", "waste", "dump", "plastic", "compost", "landfill", "trash"],
        "Agriculture & Rural": ["crop", "kisan", "farmer", "irrigation", "sinchai", "fertilizer", "soil", "mandi"],
        "Electricity & Lighting": ["light", "bijli", "transformer", "solar", "power", "blackout", "wire", "voltage"],
        "Education Infrastructure": ["school", "vidyalaya", "teacher", "student", "classroom", "desk", "toilet", "lab"],
        "Public Safety": ["safety", "police", "theft", "light", "security", "dark", "harassment"],
        "Accessibility & Inclusion": ["ramp", "wheelchair", "disabled", "braille", "elderly", "accessibility"]
    }

    for dom, kws in domain_keywords.items():
        match_count = sum(1 for kw in kws if kw in text_clean)
        sim = match_count / max(len(kws), 1)
        if match_count > 0 and sim > best_sim:
            best_sim = sim
            best_domain = dom

    if best_domain == "Other":
        best_domain = "Water & Sanitation"
        confidence = 0.75
    else:
        confidence = min(0.96, 0.70 + (best_sim * 0.5))

    return False, best_domain, round(confidence, 2)

def analyze_severity_and_impact(text: str, category: str):
    """
    Evaluates Severity, Urgency, Impact level, and estimated population impact.
    """
    text_l = text.lower()
    
    # Critical risk keywords
    critical_triggers = ["death", "die", "poison", "marr gaye", "bimari", "epidemic", "fatal", "hazard", "collapse", "risk to life", "cut off"]
    high_urgency_triggers = ["emergency", "monsoon", "immediately", "urgent", "kal tak", "bachhe", "school band"]
    
    is_critical = any(w in text_l for w in critical_triggers)
    is_urgent = any(w in text_l for w in high_urgency_triggers) or (category in ["Healthcare Access", "Water & Sanitation", "Public Safety"])

    # Severity computation
    if is_critical or category in ["Healthcare Access", "Public Safety"]:
        severity = "CRITICAL" if is_critical else "HIGH"
    elif category in ["Water & Sanitation", "Roads & Transport", "Electricity & Lighting", "Accessibility & Inclusion"]:
        severity = "HIGH"
    elif category in ["Agriculture & Rural", "Education Infrastructure", "Waste Management"]:
        severity = "MEDIUM"
    else:
        severity = "LOW"

    # Urgency computation
    urgency = "HIGH" if (is_urgent or severity in ["CRITICAL", "HIGH"]) else "MEDIUM"

    # Impact Level & Population estimation
    if "village" in text_l or "gaon" in text_l or "panchayat" in text_l or severity in ["CRITICAL", "HIGH"]:
        impact_level = "HIGH"
        affected_pop = "500 - 2,500 villagers"
    elif "school" in text_l or "tola" in text_l or "ward" in text_l:
        impact_level = "MEDIUM"
        affected_pop = "100 - 500 individuals"
    else:
        impact_level = "LOW"
        affected_pop = "Under 100 individuals"

    return severity, urgency, impact_level, affected_pop