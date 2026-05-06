import { AIAnswerScene } from "@/components/sections/AIAnswerScene";
import { Hero } from "@/components/sections/Hero";
import { PhoneScene } from "@/components/sections/PhoneScene";
import { Services } from "@/components/sections/Services";
import { WhyNovacare } from "@/components/sections/WhyNovacare";

export default function Home() {
  return (
    <main>
      <Hero />
      <PhoneScene />
      <AIAnswerScene />
      <Services />
      <WhyNovacare />
    </main>
  );
}
