import type { TemplateItem } from "../types/template";
export function validateTemplate(item: TemplateItem) {

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

    
    if (!item.colorspace) {
  errors.push("Unknown Colorspace");
}

    if (!item.pages)
        errors.push("Missing Pages");

    if (!item.keywords?.trim())
    errors.push("Missing Keywords");

    // Double Space

    if (/\s{2,}/.test(item.title))
        errors.push("Double Space in Title");

    if (/\s{2,}/.test(item.filename))
        errors.push("Double Space in Filename");


    // Missing File

    if (!item.hasThumbnail) {
    errors.push("Thumbnail.jpg Missing");
}

if (!item.hasPreview) {
    errors.push("Preview1.jpg Missing");
}

if (item.templateCount === 0) {
    errors.push("Missing Template File (.ait/.indt/.psdt)");
}

if (item.templateCount > 1) {
    errors.push("Multiple Template Files Found");
}

    // Thumbnail Size

if (
  item.thumbnailWidth !== 2048 ||
  item.thumbnailHeight !== 1424
) {
  errors.push("Thumbnail Size Invalid");
}

// Preview Size

if (
  item.previewWidth !== 2048 ||
  item.previewHeight < 1536 ||
  item.previewHeight > 6144
) {
  errors.push("Preview Size Invalid");
}

    // Keywords

    if (item.keywords) {

        const list = item.keywords
            .split(",")
            .map((k: string) => k.trim())
            .filter(Boolean);

        if (list.length > 50)
            errors.push(`Keywords Too High (${list.length}/50)`);

    }

    const keywordList = item.keywords
    .split(",")
    .map(k => k.trim())
    .filter(Boolean);

if (keywordList.length < 20)
    errors.push(
        `Keywords Too Low (${keywordList.length}/20)`
    );

    return [...new Set(errors)];

}