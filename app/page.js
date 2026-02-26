import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import Architecture from "@/components/sections/Architecture";
import Tokens from "@/components/sections/Tokens";
import Invariants from "@/components/sections/Invariants";
import Lifecycle from "@/components/sections/Lifecycle";
import Tokenomics from "@/components/sections/Tokenomics";
import Governance from "@/components/sections/Governance";
import CTA from "@/components/sections/CTA";
import Footer from "@/components/sections/Footer";
import Divider from "@/components/ui/Divider";

export default function FOMOSite() {
  return (
    <div className="bg-bg text-text font-body overflow-x-hidden leading-[1.6] min-h-screen">
      <div className="fixed inset-0 -z-[1] bg-[linear-gradient(rgba(0,255,170,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,170,0.03)_1px,transparent_1px)] bg-[size:60px_60px] animate-[gridShift_20s_linear_infinite]" />

      <Navbar />
      <Hero />
      <Divider />
      <Architecture />
      <Divider />
      <Tokens />
      <Divider />
      <Invariants />
      <Divider />
      <Lifecycle />
      <Divider />
      <Tokenomics />
      <Divider />
      <Governance />
      <Divider />
      <CTA />
      <Footer />
    </div>
  );
}
