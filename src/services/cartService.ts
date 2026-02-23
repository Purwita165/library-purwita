// src/services/cartService.ts

// ========================================
// BASE URL
// ========================================

const BASE_URL =
  "https://library-backend-production-b9cf.up.railway.app/api";


// ========================================
// TOKEN HELPER
// ========================================

function getToken(): string {

  const token =
    localStorage.getItem("token");

  if (!token) {

    throw new Error("No token found");

  }

  return token;

}


// ========================================
// TYPES
// ========================================


// Cart item (for CartPage)

export type CartItem = {

  id: number;

  book: {

    id: number;

    title: string;

    coverImage: string;

    author: {

      id: number;

      name: string;

    };

  };

};


// Checkout item (for CheckoutPage)

export type CheckoutItem = {

  id: number;

  book: {

    id: number;

    title: string;

    coverImage: string;

    author: {

      name: string;

    };

  };

};


// Checkout data

export type CheckoutData = {

  user: {

    name: string;

    email: string;

  };

  items: CheckoutItem[];

};



// ========================================
// GET CART ITEMS
// GET /api/cart
// ========================================

export async function getCartItems():
  Promise<CartItem[]> {

  const token = getToken();

  const response =
    await fetch(

      `${BASE_URL}/cart`,

      {

        method: "GET",

        headers: {

          Authorization:
            `Bearer ${token}`,

        },

      }

    );

  const data =
    await response.json();

  if (!response.ok) {

    console.error(data);

    throw new Error(

      data.message ||
      "Failed to fetch cart"

    );

  }

  return data.data.items;

}



// ========================================
// ADD TO CART
// POST /api/cart/items
// ========================================

export async function addToCart(
  bookId: number
): Promise<void> {

  const token = getToken();

  const response =
    await fetch(

      `${BASE_URL}/cart/items`,

      {

        method: "POST",

        headers: {

          "Content-Type":
            "application/json",

          Authorization:
            `Bearer ${token}`,

        },

        body: JSON.stringify({

          bookId,

        }),

      }

    );

  const data =
    await response.json();

  if (!response.ok) {

    console.error(
      "ADD CART ERROR:",
      data
    );

    throw new Error(

      data.message ||
      "Failed to add to cart"

    );

  }

}



// ========================================
// REMOVE CART ITEM
// DELETE /api/cart/items/{id}
// ========================================

export async function removeCartItem(
  cartItemId: number
): Promise<void> {

  const token = getToken();

  const response =
    await fetch(

      `${BASE_URL}/cart/items/${cartItemId}`,

      {

        method: "DELETE",

        headers: {

          Authorization:
            `Bearer ${token}`,

        },

      }

    );

  if (!response.ok) {

    throw new Error(
      "Failed to remove cart item"
    );

  }

}



// ========================================
// CLEAR CART
// DELETE /api/cart
// ========================================

export async function clearCart():
  Promise<void> {

  const token = getToken();

  const response =
    await fetch(

      `${BASE_URL}/cart`,

      {

        method: "DELETE",

        headers: {

          Authorization:
            `Bearer ${token}`,

        },

      }

    );

  if (!response.ok) {

    throw new Error(
      "Failed to clear cart"
    );

  }

}



// ========================================
// GET CHECKOUT DATA
// GET /api/cart/checkout
// ========================================

export async function getCheckoutData():
  Promise<CheckoutData> {

  const token = getToken();

  const response =
    await fetch(

      `${BASE_URL}/cart/checkout`,

      {

        method: "GET",

        headers: {

          Authorization:
            `Bearer ${token}`,

        },

      }

    );

  const data =
    await response.json();

  if (!response.ok) {

    console.error(data);

    throw new Error(

      data.message ||
      "Failed to fetch checkout data"

    );

  }

  return data.data;

}