import AboutHero from "@/components/about/AboutHero";
import AboutWho from "@/components/about/AboutWho";
import AboutWhy from "@/components/about/AboutWhy";

export default function AboutPage() {
    return (
        <main className="flex flex-col">
            <AboutHero/>
            <AboutWho/>
            <AboutWhy/>
        </main>
    );
}