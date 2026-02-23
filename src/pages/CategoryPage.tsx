import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Container from "../components/layout/Container";

import CategoryFilter from "../components/category/CategoryFilter";
import BookCard from "../components/book/BookCard";

type Category = {
  id: number;
  name: string;
};

type Book = {
  id: number;
  title: string;
  author: {
    name: string;
  };
  coverImage: string;
  rating: number;
};

export default function CategoryPage() {
  const navigate = useNavigate();
  const { categoryId } = useParams();

  const activeCategoryId = Number(categoryId);

  const [categories, setCategories] = useState<Category[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);

  const API_BASE = "https://library-backend-production-b9cf.up.railway.app/api";

  // fetch categories
  useEffect(() => {
    fetch(`${API_BASE}/categories`)
      .then((res) => res.json())
      .then((res) => setCategories(res.data.categories))
      .catch(console.error);
  }, []);

  // fetch books by category
  useEffect(() => {
    if (!activeCategoryId) return;

    fetch(`${API_BASE}/books?categoryId=${activeCategoryId}`)
      .then((res) => res.json())
      .then((res) => setBooks(res.data.books))
      .catch(console.error);
  }, [activeCategoryId]);

  // filter by rating
  const filteredBooks = books.filter((book) =>
    selectedRating ? book.rating >= selectedRating : true,
  );

  const activeCategory = categories.find((c) => c.id === activeCategoryId);

  return (
    <>
      <Header />

      <Container>
        {/* back button */}
        <div className="mb-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="text-blue-600 hover:underline"
          >
            ← Back to Dashboard
          </button>
        </div>

        {/* title */}
        <h1 className="text-2xl font-bold mb-8">
          {activeCategory?.name || "Category"} Books
        </h1>

        <div className="flex gap-12 mt-6">
          {/* sidebar */}
          <CategoryFilter
            categories={categories}
            selectedRating={selectedRating}
            onRatingChange={setSelectedRating}
          />

          {/* books */}
          <div className="flex-1">
            {filteredBooks.length === 0 ? (
              <div>No books found</div>
            ) : (
              <div
                className="
  grid 
  grid-cols-1 
  sm:grid-cols-2 
  md:grid-cols-3 
  lg:grid-cols-4 
  gap-6
"
              >
                {filteredBooks.map((book) => (
                  <BookCard
                    key={book.id}
                    id={book.id}
                    title={book.title}
                    author={book.author.name}
                    coverImage={book.coverImage}
                    rating={book.rating}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </Container>

      <Footer />
    </>
  );
}
