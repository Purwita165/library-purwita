const BASE_URL = "https://library-backend-production-b9cf.up.railway.app/api";
function getToken() {
    const token = localStorage.getItem("token");
    if (!token)
        throw new Error("No token found");
    return token;
}
export async function getMyProfile() {
    const token = getToken();
    const response = await fetch(`${BASE_URL}/me`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || "Failed to fetch profile");
    }
    return data.data; // 🔥 sekarang benar
}
