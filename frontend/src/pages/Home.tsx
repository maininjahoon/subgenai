import FeaturesSection from "@/components/FeaturesSection";
import Footer from "@/components/Footer";
import GetStarted from "@/components/GetStarted";
import Header from "@/components/Header";
import Information from "@/components/Information";
import SubtitlePreview from "@/components/SubtitlePreview";

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-background">
      <Header />

      <main>
        <Information />

        <div className="mt-20 sm:mt-28 space-y-28 pb-28 sm:space-y-36 sm:pb-36">
          <SubtitlePreview />
          <FeaturesSection />
          <GetStarted />
        </div>
      </main>

      <Footer />
    </div>
  );
}
