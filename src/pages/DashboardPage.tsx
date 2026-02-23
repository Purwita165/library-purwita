import { useState } from "react";

import Header from "../components/layout/Header";
import WelcomeBanner from "../components/home/WelcomeBanner";
import CategorySection from "../components/home/CategorySection";
import RecommendationSection from "../components/home/RecommendationSection";
import PopularAuthorsSection from "../components/home/PopularAuthorsSection";

export default function DashboardPage() {

  const [activeCategoryId, setActiveCategoryId] =
    useState<number | null>(null);

  return (
    <>

      <Header />

      <WelcomeBanner />

      <CategorySection
        activeCategoryId={activeCategoryId}
        onCategoryChange={setActiveCategoryId}
      />

      <RecommendationSection
        activeCategoryId={activeCategoryId}
      />

      <PopularAuthorsSection />

    </>
  );

}