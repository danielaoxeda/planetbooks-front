import Hero from "@/components/home/Hero";
import Certifications from "@/components/home/Certifications";
import BooksSection from "@/components/home/BooksSection";
import products from "@/data/products";

export default function Page() {
    
    const featured = products.slice(0, 4);

    return (
        <>
            <Hero />
            <Certifications />
            <BooksSection books={featured} />
        </>
    );
}