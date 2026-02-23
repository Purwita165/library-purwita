import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export default function AuthorCard({ name, bookCount }) {
    return (_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-10 h-10 rounded-full bg-gradient-to-br from-blue-200 to-blue-400" }), _jsxs("div", { children: [_jsx("p", { className: "font-medium text-sm", children: name }), _jsxs("p", { className: "text-xs text-gray-500", children: [bookCount, " books"] })] })] }));
}
