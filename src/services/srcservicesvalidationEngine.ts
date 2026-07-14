type Template = {
  title: string;
  filename: string;
  category: string;
  templateSize: string;
  pages: string;
  keywords: string;
};

export function validateTemplate(item: Template) {

    const errors: string[] = [];

    // Missing Fields

    if (!item.title?.trim())
        errors.push("Missing Title");

    if (!item.filename?.trim())
        errors.push("Missing Filename");

    if (!item.category)
        errors.push("Missing Category");

    if (!item.templateSize)
        errors.push("Missing Template Size");

    if (!item.pages)
        errors.push("Missing Pages");

    // Double Space

    if (/\s{2,}/.test(item.title))
        errors.push("Double Space in Title");

    if (/\s{2,}/.test(item.filename))
        errors.push("Double Space in Filename");

    // Keywords

    if (item.keywords) {

        const list = item.keywords
            .split(",")
            .map((k: string) => k.trim())
            .filter(Boolean);

        if (list.length > 50)
            errors.push(`Keywords Too High (${list.length}/50)`);

    }

    return [...new Set(errors)];

}