import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "../layout/Container";
// ============================
// ICON MAPPING
// ============================
const categoryIcons = {
    fiksi: "📖",
    lifestyle: "🌿",
    religious: "🕌",
    "self-help": "🧠",
    technology: "💻",
};
function getCategoryIcon(name) {
    return categoryIcons[name.toLowerCase()] || "📚";
}
// ============================
// COMPONENT
// ============================
export default function CategorySection({ activeCategoryId, onCategoryChange, }) {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    // ============================
    // FETCH CATEGORIES
    // ============================
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch("https://library-backend-production-b9cf.up.railway.app/api/categories");
                const json = await response.json();
                setCategories(json.data.categories);
            }
            catch (error) {
                console.error("Failed to fetch categories:", error);
            }
            finally {
                setLoading(false);
            }
        };
        fetchCategories();
    }, []);
    // ============================
    // LOADING STATE
    // ============================
    if (loading) {
        return (_jsx(Container, { className: "mt-8", children: _jsx("p", { children: "Loading categories..." }) }));
    }
    // ============================
    // RENDER
    // ============================
    return (_jsxs(Container, { className: "mt-8", children: [_jsx("h2", { className: "text-xl font-semibold mb-4", children: "Categories" }), _jsxs("div", { className: "flex flex-cols-6 w-24 gap-8 ", children: [_jsxs("button", { onClick: () => {
                            onCategoryChange(null);
                            navigate("/dashboard");
                        }, className: `
            flex flex-col items-center
            min-w-[100px]
            p-3
            rounded-xl
            transition
            ${activeCategoryId === null
                            ? "bg-blue-600 text-white"
                            : "bg-blue-100 text-blue-700"}
          `, children: [_jsx("div", { className: "text-2xl", children: "\uD83D\uDCDA" }), _jsx("div", { className: "text-sm mt-1", children: "All" })] }), categories.map((category) => {
                        const isActive = category.id === activeCategoryId;
                        return (_jsxs("button", { onClick: () => {
                                // update dashboard state
                                onCategoryChange(category.id);
                                // navigate to category page
                                navigate(`/category/${category.id}`);
                            }, className: `
                flex flex-col items-center
                min-w-[100px]
                p-3
                rounded-xl
                transition
                ${isActive
                                ? "bg-blue-600 text-white"
                                : "bg-blue-100 text-blue-700"}
              `, children: [_jsx("div", { className: "text-2xl", children: getCategoryIcon(category.name) }), _jsx("div", { className: "text-sm mt-1", children: category.name })] }, category.id));
                    })] })] }));
}
