import {Product} from "@/types/product";

export const products: Product[] = [
    {
        id: 1,
        title: "Cambridge English Authentic Examination Papers for Starters, Movers, Flyers",
        description:
            "Cambridge English Authentic Examination Papers for Starters, Movers, Flyers : PDF, Audio, Answer Booklet",
        tag: "YLE",
        categories: ["YLE", "STARTERS", "MOVERS", "FLYERS"],
        level: "Beginner",
        image: "/books/Cambridge-AEP.png",
        gallery: [],
        pages: "64",
        format: "PDF",
        publisher: "Cambridge",
        language: "English",
        items: [
            // Starters 1..5
            {
                key: "starters",
                title: "Starters 1, 2, 3, 4 - Digital PDF",
                price: 12,
                description: "Instant download",
                default: true,
                image: "/books/Cambridge-AEP.png"
            },
            // Movers 1..5
            {
                key: "movers",
                title: "Movers 1, 2, 3, 4 - Digital PDF",
                price: 14,
                description: "Instant download",
                image: "/books/Cambridge-AEP.png"
            },
            // Flyers 1..5
            {
                key: "flyers",
                title: "Flyers 1, 2, 3, 4 - Digital PDF",
                price: 16,
                description: "Instant download",
                image: "/books/Cambridge-AEP.png"
            },
        ],
    },
    {
        id: 2,
        title: "Cambridge Mini Trainer: Starters (Pre-A1), Movers (A1), Flyers (A2)",
        description: "Cambridge Mini Trainer: Starters (Pre-A1), Movers (A1), Flyers (A2) PDF, Audio, Answer keys",
        tag: "YLE",
        categories: ["YLE", "STARTERS", "MOVERS", "FLYERS"],
        level: "Beginner",
        image: "/books/Cambridge-MiniTrainer.png",
        pages: "56",
        format: "PDF + Audio",
        publisher: "Cambridge",
        language: "English",
        items: [
            {
                key: "mini-trainer-pdf",
                title: "Digital PDF",
                price: 15,
                description: "Instant download",
                default: true,
                image: "/books/Cambridge-MiniTrainer.png"
            },
        ],
    },
    {
        id: 3,
        title: "A2 KEY for Schools Trainer 2",
        description: "Six practice tests + Teacher's Notes: PDF + MP3 +SB + TB + AK",
        tag: "A2 Key",
        categories: ["KET-A2"],
        level: "Beginner",
        image: "/books/ket-cambridge-2024.jpeg",
        pages: "96",
        format: "PDF + Audio",
        publisher: "Cambridge",
        language: "English",
        items: [
            {
                key: "a2-trainer-pdf",
                title: "Digital PDF",
                price: 5,
                description: "Instant download",
                default: true,
                image: "/books/ket-cambridge-2024.jpeg"
            },
        ],
    },
    {
        id: 4,
        title: "A2 Key for Schools 3 (2025)",
        description: "PDF, audio answer key A2 Key for Schools 3 (2025)",
        tag: "A2 Key",
        categories: ["KET-A2"],
        level: "Beginner",
        image: "/books/A2-KeyForSchools-3.png",
        pages: "80",
        format: "PDF + Audio",
        publisher: "Cambridge",
        language: "English",
        items: [
            {
                key: "a2-3-pdf",
                title: "Digital PDF",
                price: 7,
                description: "Instant download",
                default: true,
                image: "/books/A2-KeyForSchools-3.png"
            },
        ],
    },
    {
        id: 5,
        title: "B1 Preliminary for Schools 3",
        description: "B1 Preliminary for Schools 3 PDF, Answer key, Audio Script, resources bank",
        tag: "B1 Preliminary",
        categories: ["PET-B1"],
        level: "Intermediate",
        image: "/books/B1-PreliminarySchools-3.jpg",
        pages: "112",
        format: "PDF + Audio",
        publisher: "Cambridge",
        language: "English",
        items: [
            {
                key: "b1-pdf",
                title: "Digital PDF",
                price: 9,
                description: "Instant download",
                default: true,
                image: "/books/B1-PreliminarySchools-3.jpg"
            },
        ],
    },
    {
        id: 6,
        title: "B2 First Trainer 3 (2025)",
        description: "B2 First Trainer 3 (2025): PDF, Audio, Test, Answer key, teacher note.",
        tag: "B2 First",
        categories: ["FCE-B2"],
        level: "Intermediate",
        image: "/books/B2-FirstTrainer-3.png",
        pages: "120",
        format: "PDF + Audio",
        publisher: "Cambridge",
        language: "English",
        items: [
            {
                key: "b2-pdf",
                title: "Digital PDF",
                price: 7,
                description: "Instant download",
                default: true,
                image: "/books/B2-FirstTrainer-3.png"
            },
        ],
    },
    {
        id: 7,
        title: "C1 Advanced 5 Student’s Book with Answers with Digital Pack",
        description: "C1 Advanced 5 Student’s Book with Answers with Digital Pack PDF + Audio",
        tag: "C1 Advanced",
        categories: ["CA1-C1"],
        level: "Advanced",
        image: "/books/C1-Advanced-5.png",
        pages: "176",
        format: "PDF + Audio + Digital Pack",
        publisher: "Cambridge",
        language: "English",
        items: [
            {
                key: "c1-pdf",
                title: "Digital PDF",
                price: 8,
                description: "Instant download",
                default: true,
                image: "/books/C1-Advanced-5.png"
            },
        ],
    },
    {
        id: 8,
        title: "The Official Guide to the TOEFL iBT Test 7th edition",
        description: "The Official Guide to the TOEFL iBT Test 7th edition PDF + Audio + Practice Test",
        tag: "TOEFL",
        categories: ["TOEFL"],
        level: "Advanced",
        image: "/books/TOEFLiBT-OfficialGuide-7th.png",
        pages: "512",
        format: "PDF + Audio",
        publisher: "ETS",
        language: "English",
        items: [
            {
                key: "toefl-pdf",
                title: "Digital PDF",
                price: 18,
                description: "Instant download",
                default: true,
                image: "/books/TOEFLiBT-OfficialGuide-7th.png"
            },
        ],
    },
    {
        id: 9,
        title: "Cambridge IELTS 20 Practice Tests Academic",
        description: "Cambridge IELTS 20 Practice Tests Academic: PDF, audio, answer key, transcript",
        tag: "IELTS",
        categories: ["IELTS"],
        level: "Advanced",
        image: "/books/IELTS-Academic-20.png",
        pages: "160",
        format: "PDF + Audio",
        publisher: "Cambridge",
        language: "English",
        items: [
            {
                key: "ielts-pdf",
                title: "Digital PDF",
                price: 7,
                description: "Instant download",
                default: true,
                image: "/books/IELTS-Academic-20.png"
            },
            {
                key: "ielts-physical",
                title: "Physical Book",
                price: 20,
                description: "Standard shipping",
                image: "/books/IELTS-Academic-20.png"
            },
            {
                key: "ielts-bundle",
                title: "Study Bundle",
                price: 30,
                description: "Book + Audio + Tests",
                image: "/books/IELTS-Academic-20.png"
            },
        ],
    },
];

export default products;

