// src/services/cartService.ts
// ========================================
// BASE URL
// ========================================
const BASE_URL = "https://library-backend-production-b9cf.up.railway.app/api";
// ========================================
// TOKEN HELPER
// ========================================
function getToken() {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("No token found");
    }
    return token;
}
// ========================================
// GET CART ITEMS
// GET /api/cart
// ========================================
export async function getCartItems() {
    const token = getToken();
    const response = await fetch(`${BASE_URL}/cart`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    const data = await response.json();
    if (!response.ok) {
        console.error(data);
        throw new Error(data.message ||
            "Failed to fetch cart");
    }
    return data.data.items;
}
// ========================================
// ADD TO CART
// POST /api/cart/items
// ========================================
export async function addToCart(bookId) {
    const token = getToken();
    const response = await fetch(`${BASE_URL}/cart/items`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            bookId,
        }),
    });
    const data = await response.json();
    if (!response.ok) {
        console.error("ADD CART ERROR:", data);
        throw new Error(data.message ||
            "Failed to add to cart");
    }
}
// ========================================
// REMOVE CART ITEM
// DELETE /api/cart/items/{id}
// ========================================
export async function removeCartItem(cartItemId) {
    const token = getToken();
    const response = await fetch(`${BASE_URL}/cart/items/${cartItemId}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    if (!response.ok) {
        throw new Error("Failed to remove cart item");
    }
}
// ========================================
// CLEAR CART
// DELETE /api/cart
// ========================================
export async function clearCart() {
    const token = getToken();
    const response = await fetch(`${BASE_URL}/cart`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    if (!response.ok) {
        throw new Error("Failed to clear cart");
    }
}
// ========================================
// GET CHECKOUT DATA
// GET /api/cart/checkout
// ========================================
export async function getCheckoutData() {
    const token = getToken();
    const response = await fetch(`${BASE_URL}/cart/checkout`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    const data = await response.json();
    if (!response.ok) {
        console.error(data);
        throw new Error(data.message ||
            "Failed to fetch checkout data");
    }
    return data.data;
}
