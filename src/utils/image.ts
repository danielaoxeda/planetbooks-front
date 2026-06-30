export function getImageUrl(
    image?: string
) {
    if (!image) return "";

    if (image.startsWith("/uploads")) {
        return `https://planetbook.solidwebs.com${image}`;
    }

    return image;
}