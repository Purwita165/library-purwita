const BASE_URL = "https://library-backend-production-b9cf.up.railway.app/api";
function getToken() {
    const token = localStorage.getItem("token");
    if (!token)
        throw new Error("No token found");
    return token;
}
// =======================
// GET REVIEWS BY BOOK
// =======================
export async function getReviewsByBook(bookId) {
    const response = await fetch(`${BASE_URL}/reviews/book/${bookId}`);
    const data = await response.json();
    console.log("RAW REVIEW RESPONSE:", data); // 🔥 tambahkan ini
    if (!response.ok) {
        throw new Error(data.message || "Failed to fetch reviews");
    }
    return data.data?.reviews ?? [];
}
export async function createReview(payload) {
    const token = localStorage.getItem("token");
    const response = await fetch(`${BASE_URL}/reviews`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || "Failed to create review");
    }
}
