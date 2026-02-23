import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import Container from "../layout/Container";
import AuthorCard from "../author/AuthorCard";
import { getPopularAuthors } from "../../services/authorService";
export default function PopularAuthorsSection() {
    const [authors, setAuthors] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetchAuthors();
    }, []);
    const fetchAuthors = async () => {
        try {
            const data = await getPopularAuthors();
            setAuthors(data);
        }
        catch (error) {
            console.error("Failed to fetch authors:", error);
        }
        finally {
            setLoading(false);
        }
    };
    if (loading) {
        return (_jsx(Container, { className: "mt-10", children: "Loading authors..." }));
    }
    return (_jsxs(Container, { className: "mt-16", children: [_jsx("h2", { className: "text-xl font-semibold mb-6", children: "Popular Authors" }), _jsx("div", { className: "flex gap-10 flex-wrap", children: authors.map((author) => (_jsx(AuthorCard, { name: author.name, bookCount: author.bookCount }, author.id))) })] }));
}
