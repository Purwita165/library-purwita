import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Container from "../components/layout/Container";
import CategoryFilter from "../components/category/CategoryFilter";
import BookCard from "../components/book/BookCard";
export default function CategoryPage() {
    const navigate = useNavigate();
    const { categoryId } = useParams();
    const activeCategoryId = Number(categoryId);
    const [categories, setCategories] = useState([]);
    const [books, setBooks] = useState([]);
    const [selectedRating, setSelectedRating] = useState(null);
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
        if (!activeCategoryId)
            return;
        fetch(`${API_BASE}/books?categoryId=${activeCategoryId}`)
            .then((res) => res.json())
            .then((res) => setBooks(res.data.books))
            .catch(console.error);
    }, [activeCategoryId]);
    // filter by rating
    const filteredBooks = books.filter((book) => selectedRating ? book.rating >= selectedRating : true);
    const activeCategory = categories.find((c) => c.id === activeCategoryId);
    return (_jsxs(_Fragment, { children: [_jsx(Header, {}), _jsxs(Container, { children: [_jsx("div", { className: "mb-4", children: _jsx("button", { onClick: () => navigate("/dashboard"), className: "text-blue-600 hover:underline", children: "\u2190 Back to Dashboard" }) }), _jsxs("h1", { className: "text-2xl font-bold mb-8", children: [activeCategory?.name || "Category", " Books"] }), _jsxs("div", { className: "flex gap-12 mt-6", children: [_jsx(CategoryFilter, { categories: categories, selectedRating: selectedRating, onRatingChange: setSelectedRating }), _jsx("div", { className: "flex-1", children: filteredBooks.length === 0 ? (_jsx("div", { children: "No books found" })) : (_jsx("div", { className: "\r\n  grid \r\n  grid-cols-1 \r\n  sm:grid-cols-2 \r\n  md:grid-cols-3 \r\n  lg:grid-cols-4 \r\n  gap-6\r\n", children: filteredBooks.map((book) => (_jsx(BookCard, { id: book.id, title: book.title, author: book.author.name, coverImage: book.coverImage, rating: book.rating }, book.id))) })) })] })] }), _jsx(Footer, {})] }));
}
