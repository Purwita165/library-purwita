import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

import WelcomeBanner from "../components/home/WelcomeBanner";
import RecommendationSection from "../components/home/RecommendationSection";
import PopularAuthorsSection from "../components/home/PopularAuthorsSection";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-white">

      <Header />

      <WelcomeBanner />

      <RecommendationSection />

      <PopularAuthorsSection />

      <Footer />

    </div>
  );
}