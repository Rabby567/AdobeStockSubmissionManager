export function detectColorspace(title: string): string {
  const text = title.toLowerCase();

  // RGB Templates
  if (
    text.includes("ebook") ||
    text.includes("e-book") ||
    text.includes("landing page") ||
    text.includes("website") ||
    text.includes("web banner") ||
    text.includes("banner ad") ||
    text.includes("dashboard") ||
    text.includes("ui") ||
    text.includes("ux") ||
    text.includes("mobile app") ||
    text.includes("social media") ||
    text.includes("presentation") ||
    text.includes("infographic") ||
    text.includes("text effect") ||
    text.includes("photo effect") ||
    text.includes("mockup") ||
    text.includes("collages") ||
    text.includes("moodboard") ||
    text.includes("mood board") ||
    text.includes("story") ||
    text.includes("email newsletter") ||
    text.includes("pitch deck") ||
    text.includes("email") ||
    text.includes("wireframe")
  ) {
    return "RGB";
  }

  // CMYK Templates
  if (
    text.includes("business card") ||
    text.includes("rollup banner") ||
    text.includes("brochure") ||
    text.includes("catalog") ||
    text.includes("magazine") ||
    text.includes("booklet") ||
    text.includes("book") ||
    text.includes("editorial") ||
    text.includes("lookbook") ||
    text.includes("postcard") ||
    text.includes("post card") ||
    text.includes("identity card") ||
    text.includes("id card") ||
    text.includes("look book") ||
    text.includes("photo book") ||
    text.includes("wrist band") ||
    text.includes("wristband") ||
    text.includes("white paper") ||
    text.includes("whitepaper") ||
    text.includes("proposal") ||
    text.includes("photobook") ||
    text.includes("newsletter") ||
    text.includes("news paper") ||
    text.includes("badge") ||
    text.includes("logo") ||
    text.includes("icon set") ||
    text.includes("pattern") ||
    text.includes("texture") ||
    text.includes("label") ||
    text.includes("sticker") ||
    text.includes("wristband") ||
    text.includes("cook book") ||
    text.includes("cover") ||
    text.includes("data sheet") ||
    text.includes("coupon") ||
    text.includes("boarding pass") ||
    text.includes("guide book") ||
    text.includes("recipe book") ||
    text.includes("annual report") ||
    text.includes("certificate") ||
    text.includes("invoice") ||
    text.includes("letterhead") ||
    text.includes("stationery") ||
    text.includes("flyer") ||
    text.includes("poster") ||
    text.includes("menu") ||
    text.includes("resume") ||
    text.includes("cv") ||
    text.includes("invitation") ||
    text.includes("tshirt") ||
    text.includes("jersey") ||
    text.includes("ticket") ||
    text.includes("voucher") ||
    text.includes("calendar") ||
    text.includes("planner") ||
    text.includes("packaging") ||
    text.includes("label")

  ) {
    return "CMYK";
  }

  // Default
  return "";
}


//Developed by Fazle Rabby © 2026 All Rights Reserved. Version 1.0 Built with the assistance of AI tools for development, debugging, and content generation.