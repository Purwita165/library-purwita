import { useEffect, useState } from "react";
import Container from "../layout/Container";
import BookCard from "../book/BookCard";

type Book = {
  id: number;
  title: string;
  coverImage: string;
  rating: number;
  author: {
    name: string;
  };
};

type RecommendationSectionProps = {
  activeCategoryId: number | null;
};

export default function RecommendationSection({
  activeCategoryId,
}: RecommendationSectionProps) {
  // =============================
  // STATE
  // =============================

  const [books, setBooks] = useState<Book[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  // =============================
  // FETCH FUNCTION
  // =============================

  const fetchRecommendedBooks = async (targetPage: number) => {
    try {
      if (targetPage === 1) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }

      const response = await fetch(
        `https://library-backend-production-b9cf.up.railway.app/api/books/recommend?mode=rating&page=${targetPage}&limit=10`
      );

      const json = await response.json();

      const newBooks = json.data.books;
      const pagination = json.data.pagination;

      // Append kalau page > 1
      if (targetPage === 1) {
        setBooks(newBooks);
      } else {
        setBooks((prev) => [...prev, ...newBooks]);
      }

      setPage(pagination.page);
      setTotalPages(pagination.totalPages);
    } catch (error) {
      console.error("Failed to fetch recommendations:", error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  // =============================
  // INITIAL LOAD & CATEGORY CHANGE
  // =============================

  useEffect(() => {
    setBooks([]);
    setPage(1);
    setTotalPages(1);

    fetchRecommendedBooks(1);
  }, [activeCategoryId]);

  // =============================
  // LOAD MORE HANDLER
  // =============================

  const handleLoadMore = () => {
    if (page < totalPages && !loadingMore) {
      fetchRecommendedBooks(page + 1);
    }
  };

  // =============================
  // LOADING STATE
  // =============================

  if (loading) {
    return (
      <Container className="mt-8">
        <p>Loading recommendations...</p>
      </Container>
    );
  }

  // =============================
  // EMPTY STATE
  // =============================

  if (books.length === 0) {
    return (
      <Container className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Recommendation</h2>
        <p>No recommendations found.</p>
      </Container>
    );
  }

  // =============================
  // RENDER
  // =============================

  return (
    <Container className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Recommendation</h2>

      {/* Book List */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {books.map((book) => (
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

      {/* Load More Button */}
      {page < totalPages && (
        <div className="flex justify-center mt-8">
          <button
            onClick={handleLoadMore}
            disabled={loadingMore}
            className="
              px-6 py-2
              bg-blue-600
              text-white
              font-semibold
              rounded-lg
              hover:bg-blue-700
              disabled:opacity-50
              transition
            "
          >
            {loadingMore ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </Container>
  );
}