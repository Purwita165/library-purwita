const BASE_URL = "https://library-backend-production-b9cf.up.railway.app/api";
export async function getBooks() {
    const response = await fetch(`${BASE_URL}/books`);
    if (!response.ok) {
        throw new Error("Failed to fetch books");
    }
    const data = await response.json();
    return data.data;
}
/* TAMBAHKAN INI */
export async function getBookDetail(id) {
    const response = await fetch(`${BASE_URL}/books/${id}`);
    if (!response.ok) {
        throw new Error("Failed to fetch book detail");
    }
    const data = await response.json();
    return data.data;
}
export async function addToCart(bookId) {
    const response = await fetch(`${BASE_URL}/cart`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            bookId: bookId,
            quantity: 1,
        }),
    });
    if (!response.ok) {
        throw new Error("Failed to add to cart");
    }
    return response.json();
}
