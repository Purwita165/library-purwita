import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import Container from "../layout/Container";
import BookCard from "../book/BookCard";
export default function RecommendationSection({ activeCategoryId, }) {
    // =============================
    // STATE
    // =============================
    const [books, setBooks] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    // =============================
    // FETCH FUNCTION
    // =============================
    const fetchRecommendedBooks = async (targetPage) => {
        try {
            if (targetPage === 1) {
                setLoading(true);
            }
            else {
                setLoadingMore(true);
            }
            const response = await fetch(`https://library-backend-production-b9cf.up.railway.app/api/books/recommend?mode=rating&page=${targetPage}&limit=10`);
            const json = await response.json();
            const newBooks = json.data.books;
            const pagination = json.data.pagination;
            // Append kalau page > 1
            if (targetPage === 1) {
                setBooks(newBooks);
            }
            else {
                setBooks((prev) => [...prev, ...newBooks]);
            }
            setPage(pagination.page);
            setTotalPages(pagination.totalPages);
        }
        catch (error) {
            console.error("Failed to fetch recommendations:", error);
        }
        finally {
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
        return (_jsx(Container, { className: "mt-8", children: _jsx("p", { children: "Loading recommendations..." }) }));
    }
    // =============================
    // EMPTY STATE
    // =============================
    if (books.length === 0) {
        return (_jsxs(Container, { className: "mt-8", children: [_jsx("h2", { className: "text-xl font-semibold mb-4", children: "Recommendation" }), _jsx("p", { children: "No recommendations found." })] }));
    }
    // =============================
    // RENDER
    // =============================
    return (_jsxs(Container, { className: "mt-8", children: [_jsx("h2", { className: "text-xl font-semibold mb-4", children: "Recommendation" }), _jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6", children: books.map((book) => (_jsx(BookCard, { id: book.id, title: book.title, author: book.author.name, coverImage: book.coverImage, rating: book.rating }, book.id))) }), page < totalPages && (_jsx("div", { className: "flex justify-center mt-8", children: _jsx("button", { onClick: handleLoadMore, disabled: loadingMore, className: "\r\n              px-6 py-2\r\n              bg-blue-600\r\n              text-white\r\n              font-semibold\r\n              rounded-lg\r\n              hover:bg-blue-700\r\n              disabled:opacity-50\r\n              transition\r\n            ", children: loadingMore ? "Loading..." : "Load More" }) }))] }));
}
