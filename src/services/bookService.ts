const BASE_URL = "https://library-backend-production-b9cf.up.railway.app/api";

export interface Book {
  id: number;
  title: string;
  coverImage: string;
  rating: number;
  author: {
    id: number;
    name: string;
  };
}

export async function getBooks(): Promise<Book[]> {
  const response = await fetch(`${BASE_URL}/books`);

  if (!response.ok) {
    throw new Error("Failed to fetch books");
  }

  const data = await response.json();

  return data.data;
}

/* TAMBAHKAN INI */
export async function getBookDetail(id: number): Promise<BookDetail> {
  const response = await fetch(`${BASE_URL}/books/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch book detail");
  }

  const data = await response.json();

  return data.data;
}

export interface BookDetail {
  id: number;

  title: string;

  coverImage: string;

  rating: number;

  reviewCount: number;

  totalCopies: number;

  availableCopies: number;

  author: {
    id: number;
    name: string;
    bio: string | null;
  };

  category: {
    id: number;
    name: string;
  };

  reviews: {
    id: number;
    rating: number;
    comment: string;
    user: {
      id: number;
      name: string;
    };
  }[];
}

export async function addToCart(bookId: number) {

  const response = await fetch(
    `${BASE_URL}/cart`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        bookId: bookId,
        quantity: 1,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to add to cart");
  }

  return response.json();
}
