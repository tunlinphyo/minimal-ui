import { knowledgeBase, KnowledgeItem } from "./knowledge";

function normalize(text: string): string {
  return text.toLowerCase().replace(/[^\w\s]/g, " ");
}

function scoreItem(message: string, item: KnowledgeItem): number {
  const query = normalize(message);
  const searchable = normalize(
    `${item.title} ${item.tags.join(" ")} ${item.content}`
  );

  const words = query.split(/\s+/).filter(Boolean);

  let score = 0;

  for (const word of words) {
    if (word.length < 3) continue;

    if (searchable.includes(word)) {
      score += 1;
    }

    if (item.tags.some((tag) => normalize(tag).includes(word))) {
      score += 3;
    }

    if (normalize(item.title).includes(word)) {
      score += 2;
    }
  }

  return score;
}

export function retrieveRelevantKnowledge(message: string, limit = 3): KnowledgeItem[] {
  return knowledgeBase
    .map((item) => ({
      item,
      score: scoreItem(message, item),
    }))
    .filter((result) => result.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((result) => result.item);
}