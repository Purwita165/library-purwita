import { useEffect, useState } from "react";

import Container from "../components/layout/Container";

import { getMyLoans, LoanItem } from "../services/loanService";

// ========================================
// PAGE
// ========================================

export default function LoanPage() {
  const [loans, setLoans] = useState<LoanItem[]>([]);

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
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Failed to load loans");
        }
      } finally {
        setLoading(false);
      }
    }

    loadLoans();
  }, []);

  // ========================================
  // UI STATES
  // ========================================

  if (loading) {
    return <Container>Loading loans...</Container>;
  }

  if (error) {
    return (
      <Container>
        <div className="text-red-500">{error}</div>
      </Container>
    );
  }

  // ========================================
  // UI
  // ========================================

  return (
    <Container>
      <h1 className="text-2xl font-bold mb-6">My Loans</h1>

      {loans.length === 0 && (
        <div className="text-gray-500">You have no borrowed books.</div>
      )}

      <div className="space-y-4">
        {loans.map((loan) => (
          <div key={loan.id} className="flex gap-4 border p-4 rounded">
            <img
              src={loan.book.coverImage}
              className="w-16 h-24 object-cover"
            />

            <div>
              <div className="font-semibold">{loan.book.title}</div>

              <div className="text-sm text-gray-500">
                {loan.book.author.name}
              </div>

              <div className="text-sm mt-2">
                Borrowed: {new Date(loan.borrowDate).toLocaleDateString()}
              </div>

              <div className="text-sm">
                Due: {new Date(loan.dueDate).toLocaleDateString()}
              </div>

              <div className="text-sm font-medium mt-1">
                Status:{" "}
                {loan.status === "RETURNED" ? (
                  <span className="text-gray-500">Returned</span>
                ) : loan.status === "OVERDUE" ? (
                  <span className="text-red-600">Overdue</span>
                ) : (
                  <span className="text-green-600">Active</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}
