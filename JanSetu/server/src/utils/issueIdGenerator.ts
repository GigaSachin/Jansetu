/**
 * Generates JanSetu issue identifier format:
 * JS-JH-2026-XXXXXX (e.g. JS-JH-2026-849201)
 */
export function generateIssueId(): string {
  const randomNum = Math.floor(100000 + Math.random() * 900000);
  return `JS-JH-2026-${randomNum}`;
}
