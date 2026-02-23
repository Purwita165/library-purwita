import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import Header from "../components/layout/Header";
import WelcomeBanner from "../components/home/WelcomeBanner";
import CategorySection from "../components/home/CategorySection";
import RecommendationSection from "../components/home/RecommendationSection";
import PopularAuthorsSection from "../components/home/PopularAuthorsSection";
export default function DashboardPage() {
    const [activeCategoryId, setActiveCategoryId] = useState(null);
    return (_jsxs(_Fragment, { children: [_jsx(Header, {}), _jsx(WelcomeBanner, {}), _jsx(CategorySection, { activeCategoryId: activeCategoryId, onCategoryChange: setActiveCategoryId }), _jsx(RecommendationSection, { activeCategoryId: activeCategoryId }), _jsx(PopularAuthorsSection, {})] }));
}
