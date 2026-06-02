import AboutHero from "@/components/user/about/AboutHero";
import AboutWho from "@/components/user/about/AboutWho";
import AboutWhy from "@/components/user/about/AboutWhy";

export default function AboutPage() {
    return (
        <main className="flex flex-col">
            <AboutHero/>
            <AboutWho/>
            <AboutWhy/>
        </main>
    );
}