export const DEFAULT_HIGHLIGHTS = [
  "Thoughtful space planning tailored to how you live",
  "Material and finish choices that age gracefully",
  "Layered lighting for atmosphere and everyday comfort",
  "Execution details checked at every stage",
] as const;

export function parseHighlights(value: string | null | undefined) {
  if (!value) return [...DEFAULT_HIGHLIGHTS];

  try {
    const parsed = JSON.parse(value);
    if (
      Array.isArray(parsed) &&
      parsed.length === 4 &&
      parsed.every((item) => typeof item === "string")
    ) {
      return parsed as string[];
    }
  } catch {
    // Fall back to the built-in content for older or invalid records.
  }

  return [...DEFAULT_HIGHLIGHTS];
}