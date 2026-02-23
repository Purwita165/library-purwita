// ========================================
// BASE URL
// ========================================

const BASE_URL =
  "https://library-backend-production-b9cf.up.railway.app/api";


// ========================================
// TOKEN HELPER
// ========================================

function getToken(): string {

  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No token found");
  }

  return token;
}


// ========================================
// TYPES
// ========================================

export type CheckoutLoanRequest = {

  itemIds: number[];

  days: number;

  borrowDate: string;

};


export type LoanBook = {

  id: number;

  title: string;

  coverImage: string;

  author: {
    name: string;
  };

};


export type LoanItem = {

  id: number;

  book: LoanBook;

  borrowDate: string;

  dueDate: string;

  status: string;

};


export type LoanListResponse = {

  items: LoanItem[];

  total: number;

};


// ========================================
// CHECKOUT FROM CART
// POST /api/loans/from-cart
// ========================================

export async function checkoutFromCart(
  payload: CheckoutLoanRequest
): Promise<void> {

  const token = getToken();

  const response = await fetch(
    `${BASE_URL}/loans/from-cart`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify(payload),
    }
  );

  const data = await response.json();

  if (!response.ok) {

    console.error("CHECKOUT ERROR:", data);

    throw new Error(
      data.message || "Failed to checkout"
    );

  }

}


// ========================================
// GET MY LOANS
// GET /api/loans/my
// ========================================

export async function getMyLoans(): Promise<LoanListResponse> {

  const token = getToken();

  const response = await fetch(
    `${BASE_URL}/loans/my`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {

    throw new Error(
      data.message || "Failed to fetch loans"
    );

  }

  return data.data;

}