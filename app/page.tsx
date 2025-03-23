import { LandingPage } from "@/components/LandingPage";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";

export default function Home() {
  return (
    <div>
      <div className="w-full">
        <Navbar />
      </div>
      <div className="block justify-center items-center">
        <LandingPage />
      </div>
      <div className="mx-60 pt-16">
        <Footer />
      </div>
      <TextHoverEffect text="SIGNIFY" />
    </div>
  );
}
