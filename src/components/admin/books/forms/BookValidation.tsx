export interface BookFormData {
    title: string;
    description: string;
    tag: string;
    level: string;
    year: string;
    format: string;
    publisher: string;
    language: string;
    image: string;
    price: string;
}

export function validateBookForm(
    formData: BookFormData
) {
    const errors: Record<string, string> = {};

    if (!formData.title.trim()) {
        errors.title = "Title is required";
    }

    if (!formData.description.trim()) {
        errors.description = "Description is required";
    }

    if (!formData.tag.trim()) {
        errors.tag = "Category is required";
    }

    if (!formData.level.trim()) {
        errors.level = "Level is required";
    }

    if (!formData.year.trim()) {
        errors.year = "Year is required";
    } else if (!/^\d{4}$/.test(formData.year)) {
        errors.year = "Year must contain 4 digits";
    }

    if (!formData.format.trim()) {
        errors.format = "Format is required";
    }

    if (!formData.publisher.trim()) {
        errors.publisher = "Publisher is required";
    }

    if (!formData.language.trim()) {
        errors.language = "Language is required";
    }

    if (!formData.price.trim()) {
        errors.price = "Price is required";
    } else if (Number(formData.price) <= 0) {
        errors.price = "Price must be greater than 0";
    }

    return errors;
}