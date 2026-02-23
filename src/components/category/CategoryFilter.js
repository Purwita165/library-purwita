import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate, useParams } from "react-router-dom";
export default function CategoryFilter({ categories, selectedRating, onRatingChange, }) {
    const navigate = useNavigate();
    const { categoryId } = useParams();
    const activeCategoryId = Number(categoryId);
    const ratings = [5, 4, 3, 2, 1];
    return (_jsxs("div", { className: "w-64 shrink-0 pr-6 border-r border-gray-200", children: [_jsx("div", { className: "font-semibold text-lg mb-6", children: "FILTER" }), _jsxs("div", { className: "mb-8", children: [_jsx("div", { className: "font-semibold mb-3", children: "Category" }), _jsx("div", { className: "space-y-2", children: categories.map((category) => {
                            const checked = category.id === activeCategoryId;
                            return (_jsxs("label", { className: "flex items-center gap-2 cursor-pointer", children: [_jsx("input", { type: "checkbox", checked: checked, onChange: () => navigate(`/category/${category.id}`) }), _jsx("span", { children: category.name })] }, category.id));
                        }) })] }), _jsxs("div", { children: [_jsx("div", { className: "font-semibold mb-3", children: "Rating" }), _jsx("div", { className: "space-y-2", children: ratings.map((rating) => {
                            const checked = selectedRating === rating;
                            return (_jsxs("label", { className: "flex items-center gap-2 cursor-pointer", children: [_jsx("input", { type: "checkbox", checked: checked, onChange: () => onRatingChange(checked ? null : rating) }), _jsx("span", { className: "text-yellow-500", children: "\u2605" }), _jsx("span", { children: rating })] }, rating));
                        }) })] })] }));
}
