import type { Metadata } from "next";

import ServicesHero from "@/components/sections/ServicesPage/ServicesHero";
import Tier1Section from "@/components/sections/ServicesPage/Tier1Section";
import Tier2Section from "@/components/sections/ServicesPage/Tier2Section";
import Tier3Section from "@/components/sections/ServicesPage/Tier3Section";
import ServicesFAQ from "@/components/sections/ServicesPage/ServicesFAQ";
import ServicesClosingCTA from "@/components/sections/ServicesPage/ServicesClosingCTA";

export const metadata: Metadata = {
  title: "Services | Novacare Growth",
  description:
    "Three ways to work with us. Clinic sites, AI reception, and full growth systems for UAE wellness practices. Public pricing, full feature lists, transparent timelines.",
};

export default function ServicesPage() {
  return (
    <main>
      <ServicesHero />
      <Tier1Section />
      <Tier2Section />
      <Tier3Section />
      <ServicesFAQ />
      <ServicesClosingCTA />
    </main>
  );
}
