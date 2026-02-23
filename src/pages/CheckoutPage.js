import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "../components/layout/Container";
import { getCheckoutData, } from "../services/cartService";
import { checkoutFromCart, } from "../services/loanService";
// ========================================
// PAGE
// ========================================
export default function CheckoutPage() {
    const navigate = useNavigate();
    // ========================================
    // STATE
    // ========================================
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [days, setDays] = useState(3);
    // ========================================
    // LOAD CHECKOUT DATA
    // ========================================
    async function loadCheckout() {
        try {
            setLoading(true);
            const checkout = await getCheckoutData();
            setData(checkout);
        }
        catch (err) {
            console.error(err);
            setError("Failed to load checkout");
        }
        finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        loadCheckout();
    }, []);
    // ========================================
    // HANDLE CHECKOUT
    // ========================================
    async function handleBorrow() {
        if (!data)
            return;
        try {
            setSubmitting(true);
            await checkoutFromCart({
                itemIds: data.items.map(item => item.id),
                days: days,
                borrowDate: new Date()
                    .toISOString()
                    .split("T")[0],
            });
            alert("Borrow success");
            navigate("/loans");
        }
        catch (err) {
            console.error(err);
            alert("Borrow failed");
        }
        finally {
            setSubmitting(false);
        }
    }
    // ========================================
    // LOADING
    // ========================================
    if (loading) {
        return (_jsx(Container, { children: _jsx("div", { className: "py-10 text-center", children: "Loading checkout..." }) }));
    }
    // ========================================
    // ERROR
    // ========================================
    if (error) {
        return (_jsx(Container, { children: _jsx("div", { className: "py-10 text-center text-red-500", children: error }) }));
    }
    if (!data)
        return null;
    // ========================================
    // UI
    // ========================================
    return (_jsx(Container, { children: _jsxs("div", { className: "py-10 max-w-2xl", children: [_jsx("div", { className: "text-2xl font-bold mb-6", children: "Checkout" }), _jsxs("div", { className: "mb-6", children: [_jsx("div", { className: "font-semibold", children: data.user.name }), _jsx("div", { className: "text-gray-500", children: data.user.email })] }), _jsx("div", { className: "flex flex-col gap-4 mb-6", children: data.items.map(item => (_jsxs("div", { className: "flex gap-4 border-b pb-4", children: [_jsx("img", { src: item.book.coverImage, alt: item.book.title, className: "w-16 h-20 object-cover rounded" }), _jsxs("div", { children: [_jsx("div", { className: "font-semibold", children: item.book.title }), _jsx("div", { className: "text-gray-500 text-sm", children: item.book.author.name })] })] }, item.id))) }), _jsxs("div", { className: "mb-6", children: [_jsx("div", { className: "font-semibold mb-2", children: "Borrow duration" }), _jsx("div", { className: "flex gap-3", children: [3, 5, 10].map(d => (_jsxs("button", { onClick: () => setDays(d), className: "px-4 py-2 rounded border " +
                                    (days === d
                                        ? "bg-blue-500 text-white"
                                        : "bg-white"), children: [d, " days"] }, d))) })] }), _jsx("button", { onClick: handleBorrow, disabled: submitting, className: "bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600 disabled:opacity-50", children: submitting
                        ? "Processing..."
                        : "Confirm Borrow" })] }) }));
}
