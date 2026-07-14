export interface CategoryRule {
  keyword: string;
  category: string;
}

export function detectCategory(
  title: string,
  rules: CategoryRule[]
): string {

  const text =
    title.toLowerCase();

 for (const rule of rules) {

  const keywords =
    rule.keyword
      .toLowerCase()
      .split(",");

  for (const keyword of keywords) {

    const cleanKeyword =
      keyword.trim();

    if (
      cleanKeyword &&
      text.includes(cleanKeyword)
    ) {
      return rule.category;
    }
  }
}

  return "";
}