import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Container from "../layout/Container";
export default function WelcomeBanner() {
    return (_jsx(Container, { className: "mt-6", children: _jsxs("div", { className: "\r\n          w-full\r\n          h-[180px]\r\n          rounded-2xl\r\n          bg-gradient-to-r\r\n          from-[#1C65DA]\r\n          to-[#1A87D7]\r\n          flex\r\n          items-center\r\n          justify-between\r\n          px-8\r\n          text-white\r\n        ", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-[28px] font-semibold", children: "Welcome to Booky" }), _jsx("p", { className: "mt-2 text-white/80", children: "Discover your next favorite book" })] }), _jsx("img", { src: "/banner.svg", alt: "banner", className: "h-[140px]" })] }) }));
}
