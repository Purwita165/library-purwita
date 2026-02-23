import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from "react-router-dom";
export default function BookCard({ id, title, author, coverImage, rating, }) {
    const navigate = useNavigate();
    return (_jsxs("div", { className: "w-[224px] flex flex-col cursor-pointer hover:opacity-80 transition", onClick: () => navigate(`/books/${id}`), children: [_jsx("img", { src: coverImage, alt: title, className: "w-full h-56 object-cover rounded-lg" }), _jsxs("div", { className: "flex flex-col gap-1 p-4", children: [_jsx("div", { className: "text-[18px] font-bold text-neutral-900", children: title }), _jsx("div", { className: "text-[16px] text-neutral-700", children: author }), _jsxs("div", { className: "flex items-center gap-1", children: [_jsx("span", { className: "text-yellow-500 text-lg", children: "\u2605" }), _jsx("span", { className: "text-[16px] font-semibold", children: rating })] })] })] }));
}
