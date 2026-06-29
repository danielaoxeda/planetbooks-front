export interface BookFormData {
    title: string;
    description: string;
    tag: string;
    level: string;
    pages: string;
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
        errors.title = "Book title is required";
    }

    if (!formData.description.trim()) {
        errors.description = "Description is required";
    }

    if (!formData.tag.trim()) {
        errors.tag = "Exam is required";
    }

    if (!formData.level.trim()) {
        errors.level = "Level is required";
    }

    if (!formData.pages.trim()) {
        errors.pages = "Pages is required";
    } else if (Number(formData.pages) <= 0) {
        errors.pages = "Pages must be greater than 0";
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