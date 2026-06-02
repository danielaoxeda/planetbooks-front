import Hero from "@/components/user/home/Hero";
import Certifications from "@/components/user/home/Certifications";
import BooksSection from "@/components/user/home/BooksSection";
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