import { CareerLedIntro } from "@/components/home/career-led-intro";
import { CareerMap } from "@/components/home/career-map";
import { SimpleContact } from "@/components/home/simple-contact";
import { getProject } from "@/content/projects";

const careerProjects = [
  getProject("memx"),
  getProject("domani"),
  getProject("iffers-pictures"),
  getProject("pixelverse-studios"),
  getProject("earthcam"),
];

export default function Home() {
  return (
    <main id="main-content" tabIndex={-1} className="overflow-hidden">
      <CareerLedIntro />
      <CareerMap projects={careerProjects} />
      <SimpleContact />
    </main>
  );
}
