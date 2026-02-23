const BASE_URL = "https://library-backend-production-b9cf.up.railway.app/api";

function getToken(): string {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");
  return token;
}

// =======================
// TYPES
// =======================

export type Review = {
  id: number;
  star: number; // 🔥 bukan rating
  comment: string;
  createdAt: string;
  user: {
    id: number;
    name: string;
  };
};

export type CreateReviewPayload = {
  bookId: number;
  rating: number;
  comment: string;
};

// =======================
// GET REVIEWS BY BOOK
// =======================

export async function getReviewsByBook(bookId: number): Promise<Review[]> {
  const response = await fetch(`${BASE_URL}/reviews/book/${bookId}`);

  const data = await response.json();

  console.log("RAW REVIEW RESPONSE:", data); // 🔥 tambahkan ini

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch reviews");
  }

  return data.data?.reviews ?? [];
}

// =======================
// CREATE / UPDATE REVIEW
// =======================

type CreateReviewRequest = {
  bookId: number;
  star: number; // backend pakai "star"
  comment: string;
};

export async function createReview(
  payload: CreateReviewRequest,
): Promise<void> {
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
