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
// CHECKOUT FROM CART
// POST /api/loans/from-cart
// ========================================
export async function checkoutFromCart(payload) {
    const token = getToken();
    const response = await fetch(`${BASE_URL}/loans/from-cart`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
    });
    const data = await response.json();
    if (!response.ok) {
        console.error("CHECKOUT ERROR:", data);
        throw new Error(data.message || "Failed to checkout");
    }
}
// ========================================
// GET MY LOANS
// GET /api/loans/my
// ========================================
export async function getMyLoans() {
    const token = getToken();
    const response = await fetch(`${BASE_URL}/loans/my`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || "Failed to fetch loans");
    }
    return data.data;
}
