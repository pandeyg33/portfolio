import Header from "@/components/Header";
import Hero from "@/components/Hero";
import IntroPill from "@/components/IntroPill"; // ← add this
import ExperienceSequence from "@/components/ExperienceSequence"; // ← new
import ProjectsGallery from "@/components/ProjectsGallery";
import SkillsMarquees from "@/components/SkillsMarquees";
import ContactSection from "@/components/ContactSection";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <IntroPill /> {/* ← new pinned intro section */}
      <ExperienceSequence /> {/* ← experience sequence */}
      <ProjectsGallery />
      <SkillsMarquees />
      <ContactSection />
      <div className="h-24" />
    </main>
  );
}
