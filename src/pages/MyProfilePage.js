import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "../components/layout/Container";
import { getMyProfile } from "../services/profileService";
export default function MyProfilePage() {
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        async function loadProfile() {
            try {
                const result = await getMyProfile();
                setData(result);
            }
            catch (err) {
                setError("Failed to load profile");
            }
            finally {
                setLoading(false);
            }
        }
        loadProfile();
    }, []);
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("isLoggedIn");
        navigate("/login");
    };
    if (loading)
        return (_jsx(Container, { children: _jsx("div", { className: "py-10", children: "Loading profile..." }) }));
    if (error || !data)
        return (_jsx(Container, { children: _jsx("div", { className: "py-10 text-red-500", children: error }) }));
    return (_jsx(Container, { children: _jsxs("div", { className: "py-10 max-w-xl mx-auto", children: [_jsx("h1", { className: "text-2xl font-bold mb-6", children: "My Profile" }), _jsxs("div", { className: "bg-white shadow rounded-xl p-6 space-y-4", children: [_jsxs("div", { children: [_jsx("div", { className: "text-sm text-gray-500", children: "Name" }), _jsx("div", { className: "font-semibold", children: data.profile.name })] }), _jsxs("div", { children: [_jsx("div", { className: "text-sm text-gray-500", children: "Email" }), _jsx("div", { className: "font-semibold", children: data.profile.email })] }), _jsxs("div", { children: [_jsx("div", { className: "text-sm text-gray-500", children: "Role" }), _jsx("div", { className: "font-semibold", children: data.profile.role })] }), _jsx("hr", {}), _jsx("h2", { className: "font-semibold", children: "Loan Statistics" }), _jsxs("div", { className: "grid grid-cols-2 gap-4 text-sm", children: [_jsxs("div", { children: ["Borrowed: ", data.loanStats.borrowed] }), _jsxs("div", { children: ["Returned: ", data.loanStats.returned] }), _jsxs("div", { children: ["Late: ", data.loanStats.late] }), _jsxs("div", { children: ["Total: ", data.loanStats.total] })] }), _jsxs("div", { className: "mt-4 text-sm", children: ["Reviews Written: ", data.reviewsCount] }), _jsx("button", { onClick: handleLogout, className: "mt-6 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600", children: "Logout" })] })] }) }));
}
