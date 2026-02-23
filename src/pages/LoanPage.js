import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import Container from "../components/layout/Container";
import { getMyLoans } from "../services/loanService";
// ========================================
// PAGE
// ========================================
export default function LoanPage() {
    const [loans, setLoans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    // ========================================
    // LOAD LOANS
    // ========================================
    useEffect(() => {
        async function loadLoans() {
            try {
                const data = await getMyLoans();
                setLoans(data.items);
            }
            catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                }
                else {
                    setError("Failed to load loans");
                }
            }
            finally {
                setLoading(false);
            }
        }
        loadLoans();
    }, []);
    // ========================================
    // UI STATES
    // ========================================
    if (loading) {
        return _jsx(Container, { children: "Loading loans..." });
    }
    if (error) {
        return (_jsx(Container, { children: _jsx("div", { className: "text-red-500", children: error }) }));
    }
    // ========================================
    // UI
    // ========================================
    return (_jsxs(Container, { children: [_jsx("h1", { className: "text-2xl font-bold mb-6", children: "My Loans" }), loans.length === 0 && (_jsx("div", { className: "text-gray-500", children: "You have no borrowed books." })), _jsx("div", { className: "space-y-4", children: loans.map((loan) => (_jsxs("div", { className: "flex gap-4 border p-4 rounded", children: [_jsx("img", { src: loan.book.coverImage, className: "w-16 h-24 object-cover" }), _jsxs("div", { children: [_jsx("div", { className: "font-semibold", children: loan.book.title }), _jsx("div", { className: "text-sm text-gray-500", children: loan.book.author.name }), _jsxs("div", { className: "text-sm mt-2", children: ["Borrowed: ", new Date(loan.borrowDate).toLocaleDateString()] }), _jsxs("div", { className: "text-sm", children: ["Due: ", new Date(loan.dueDate).toLocaleDateString()] }), _jsxs("div", { className: "text-sm font-medium mt-1", children: ["Status:", " ", loan.status === "RETURNED" ? (_jsx("span", { className: "text-gray-500", children: "Returned" })) : loan.status === "OVERDUE" ? (_jsx("span", { className: "text-red-600", children: "Overdue" })) : (_jsx("span", { className: "text-green-600", children: "Active" }))] })] })] }, loan.id))) })] }));
}
