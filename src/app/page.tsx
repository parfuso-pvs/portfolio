import { HomeHero } from "@/components/home/home-hero";
import { getProject } from "@/content/projects";

export default function Home() {
  return <HomeHero featuredProject={getProject("memx")} />;
}
