import { CareerThread } from "@/components/home/career-thread";
import { HomeContact } from "@/components/home/home-contact";
import { HomeIntroduction } from "@/components/home/home-introduction";

export default function Home() {
  return (
    <main id="main-content" tabIndex={-1} className="overflow-hidden">
      <HomeIntroduction />
      <CareerThread />
      <HomeContact />
    </main>
  );
}
