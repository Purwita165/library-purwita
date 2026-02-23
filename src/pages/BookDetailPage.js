import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Container from "../components/layout/Container";
import { addToCart } from "../services/cartService";
import { getReviewsByBook, createReview, } from "../services/reviewService";
export default function BookDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [adding, setAdding] = useState(false);
    const [borrowing, setBorrowing] = useState(false);
    const [reviews, setReviews] = useState([]);
    const [reviewLoading, setReviewLoading] = useState(true);
    const [reviewSubmitting, setReviewSubmitting] = useState(false);
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");
    // ===============================
    // FETCH BOOK
    // ===============================
    const fetchBook = async () => {
        if (!id)
            return;
        try {
            setLoading(true);
            const response = await fetch(`https://library-backend-production-b9cf.up.railway.app/api/books/${id}`);
            if (!response.ok)
                throw new Error();
            const result = await response.json();
            setBook(result.data);
        }
        catch {
            setError("Failed to load book");
        }
        finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchBook();
    }, [id]);
    // ===============================
    // FETCH REVIEWS
    // ===============================
    useEffect(() => {
        if (!id)
            return;
        const fetchReviews = async () => {
            try {
                setReviewLoading(true);
                const data = await getReviewsByBook(Number(id));
                setReviews(data);
            }
            catch {
                console.error("Failed to load reviews");
            }
            finally {
                setReviewLoading(false);
            }
        };
        fetchReviews();
    }, [id]);
    // ===============================
    // ADD TO CART
    // ===============================
    const handleAddToCart = async () => {
        if (!book)
            return;
        try {
            setAdding(true);
            await addToCart(book.id);
            navigate("/cart");
        }
        catch {
            alert("Failed to add to cart");
        }
        finally {
            setAdding(false);
        }
    };
    // ===============================
    // BORROW
    // ===============================
    const handleBorrow = async () => {
        if (!book)
            return;
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                alert("Please login first.");
                navigate("/login");
                return;
            }
            const response = await fetch("https://library-backend-production-b9cf.up.railway.app/api/loans", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    bookId: book.id,
                    days: 7, // default 7 hari
                }),
            });
            const result = await response.json();
            if (!response.ok) {
                throw new Error(result.message || "Borrow failed");
            }
            alert("Book borrowed successfully!");
            // refresh book detail supaya availableCopies update
            window.location.reload();
        }
        catch (error) {
            if (error instanceof Error) {
                alert(error.message);
            }
            else {
                alert("Buku sedang tidak tersedia.");
            }
        }
    };
    const [alreadyBorrowed, setAlreadyBorrowed] = useState(false);
    useEffect(() => {
        const checkUserLoan = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token || !book)
                    return;
                const response = await fetch("https://library-backend-production-b9cf.up.railway.app/api/loans/my?status=all&page=1&limit=50", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (!response.ok)
                    return;
                const result = await response.json();
                const loans = result.data.loans;
                const isBorrowed = loans.some((loan) => loan.book.id === book.id &&
                    loan.status === "BORROWED" &&
                    loan.returnAt === null);
                setAlreadyBorrowed(isBorrowed);
            }
            catch (err) {
                console.log("Loan check failed");
            }
        };
        if (book) {
            checkUserLoan();
        }
    }, [book]);
    // ===============================
    // SUBMIT REVIEW
    // ===============================
    const handleSubmitReview = async () => {
        if (!id)
            return;
        try {
            setReviewSubmitting(true);
            await createReview({
                bookId: Number(id),
                star: rating,
                comment,
            });
            const updated = await getReviewsByBook(Number(id));
            setReviews(updated);
            setComment("");
        }
        catch {
            alert("Failed to submit review");
        }
        finally {
            setReviewSubmitting(false);
        }
    };
    // ===============================
    // RENDER STATES
    // ===============================
    if (loading) {
        return (_jsx(Container, { children: _jsx("div", { className: "py-10", children: "Loading book..." }) }));
    }
    if (!book || error) {
        return (_jsx(Container, { children: _jsx("div", { className: "py-10 text-red-500", children: error || "Book not found" }) }));
    }
    // ===============================
    // MAIN UI
    // ===============================
    return (_jsxs(Container, { children: [_jsx("button", { onClick: () => navigate("/dashboard"), className: "mb-6 text-blue-600 hover:underline", children: "\u2190 Back to Dashboard" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-10", children: [_jsx("img", { src: book.coverImage, alt: book.title, className: "w-full max-w-xs rounded shadow" }), _jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold mb-2", children: book.title }), _jsx("p", { className: "text-gray-600 mb-2", children: book.author.name }), _jsxs("p", { className: "mb-2", children: ["Category: ", book.category.name] }), _jsxs("p", { className: "mb-2", children: ["\u2B50 ", book.rating, " (", book.totalReviews, " reviews)"] }), _jsxs("p", { className: "mb-6", children: ["Available copies: ", book.availableCopies] }), _jsxs("div", { className: "flex gap-4 mt-4", children: [_jsx("button", { onClick: handleAddToCart, disabled: adding, className: "bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400", children: adding ? "Adding..." : "Add to Cart" }), _jsx("button", { onClick: handleBorrow, disabled: alreadyBorrowed || book.availableCopies === 0, className: "bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 disabled:bg-gray-400", children: alreadyBorrowed
                                            ? "Already Borrowed"
                                            : book.availableCopies === 0
                                                ? "Out of Stock"
                                                : "Borrow" })] }), _jsx("hr", { className: "my-8" }), _jsx("h2", { className: "text-xl font-semibold mb-4", children: "Reviews" }), _jsxs("div", { className: "mb-6", children: [_jsx("select", { value: rating, onChange: (e) => setRating(Number(e.target.value)), className: "border px-2 py-1 rounded mb-2", children: [1, 2, 3, 4, 5].map((r) => (_jsx("option", { value: r, children: r }, r))) }), _jsx("textarea", { value: comment, onChange: (e) => setComment(e.target.value), placeholder: "Write your review...", className: "w-full border p-2 rounded mb-2" }), _jsx("button", { onClick: handleSubmitReview, disabled: reviewSubmitting, className: "bg-blue-600 text-white px-4 py-2 rounded", children: reviewSubmitting ? "Submitting..." : "Submit Review" })] }), reviewLoading ? (_jsx("div", { children: "Loading reviews..." })) : reviews.length === 0 ? (_jsx("div", { children: "No reviews yet." })) : (reviews.map((review) => (_jsxs("div", { className: "border-b py-3", children: [_jsx("div", { className: "font-medium", children: review.user?.name || "User" }), _jsxs("div", { children: ["\u2B50 ", review.star] }), _jsx("div", { className: "text-sm text-gray-600", children: review.comment })] }, review.id))))] })] })] }));
}
