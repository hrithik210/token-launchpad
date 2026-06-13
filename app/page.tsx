import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Footer from "@/components/landing/Footer";

// One-pager landing. The token-creation app lives at /launch; the single CTA
// routes there.
export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#0a0a0a] text-zinc-50">
      <Navbar />
      <main>
        <Hero />
      </main>
      <Footer />
    </div>
  );
}
