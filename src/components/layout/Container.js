import { jsx as _jsx } from "react/jsx-runtime";
export default function Container({ children, className = "" }) {
    return (_jsx("div", { className: "w-full px-4", children: _jsx("div", { className: `max-w-[1280px] mx-auto ${className}`, children: children }) }));
}
