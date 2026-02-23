import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import Container from "../components/layout/Container";
import { getCartItems, removeCartItem, clearCart, } from "../services/cartService";
export default function CartPage() {
    // ===============================
    // STATE
    // ===============================
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // ===============================
    // LOAD CART
    // ===============================
    async function loadCart() {
        try {
            setLoading(true);
            const items = await getCartItems();
            setCartItems(items);
        }
        catch (err) {
            console.error(err);
            setError("Failed to load cart");
        }
        finally {
            setLoading(false);
        }
    }
    // ===============================
    // REMOVE ITEM
    // ===============================
    async function handleRemove(itemId) {
        try {
            await removeCartItem(itemId);
            // reload cart
            loadCart();
        }
        catch (err) {
            console.error(err);
            alert("Failed to remove item");
        }
    }
    // ===============================
    // CLEAR CART
    // ===============================
    async function handleClearCart() {
        try {
            await clearCart();
            setCartItems([]);
        }
        catch (err) {
            console.error(err);
            alert("Failed to clear cart");
        }
    }
    // ===============================
    // FIRST LOAD
    // ===============================
    useEffect(() => {
        loadCart();
    }, []);
    // ===============================
    // LOADING STATE
    // ===============================
    if (loading) {
        return (_jsx(Container, { children: _jsx("div", { className: "py-10 text-center", children: "Loading cart..." }) }));
    }
    // ===============================
    // ERROR STATE
    // ===============================
    if (error) {
        return (_jsx(Container, { children: _jsx("div", { className: "py-10 text-center text-red-500", children: error }) }));
    }
    // ===============================
    // EMPTY STATE
    // ===============================
    if (cartItems.length === 0) {
        return (_jsx(Container, { children: _jsx("div", { className: "py-10 text-center", children: "Your cart is empty" }) }));
    }
    // ===============================
    // MAIN UI
    // ===============================
    return (_jsx(Container, { children: _jsxs("div", { className: "py-10", children: [_jsx("div", { className: "text-2xl font-bold mb-6", children: "My Cart" }), _jsx("div", { className: "flex flex-col gap-4", children: cartItems.map(item => (_jsxs("div", { className: "flex justify-between items-center border-b pb-4", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsx("img", { src: item.book.coverImage, alt: item.book.title, className: "w-16 h-20 object-cover rounded" }), _jsxs("div", { children: [_jsx("div", { className: "font-semibold", children: item.book.title }), _jsx("div", { className: "text-sm text-gray-500", children: item.book.author.name })] })] }), _jsx("button", { onClick: () => handleRemove(item.id), className: "text-red-500 hover:text-red-700", children: "Remove" })] }, item.id))) }), _jsx("div", { className: "mt-6", children: _jsx("button", { onClick: handleClearCart, className: "bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600", children: "Clear Cart" }) })] }) }));
}
