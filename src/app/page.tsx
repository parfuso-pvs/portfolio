import { HomeHero } from "@/components/home/home-hero";
import { HomeContactClose } from "@/components/home/home-contact-close";
import { HomeFeaturedWork } from "@/components/home/home-featured-work";
import { HomePracticeContext } from "@/components/home/home-practice-context";
import { RouteViewTransition } from "@/components/motion/route-view-transition";
import { getProject } from "@/content/projects";

export default function Home() {
  return (
    <RouteViewTransition>
      <main id="main-content" tabIndex={-1} className="overflow-hidden">
        <HomeHero featuredProject={getProject("memx")} />
        <HomeFeaturedWork projects={[getProject("domani"), getProject("iffers-pictures")]} />
        <HomePracticeContext
          projects={[getProject("pixelverse-studios"), getProject("earthcam")]}
        />
        <HomeContactClose />
      </main>
    </RouteViewTransition>
  );
}
