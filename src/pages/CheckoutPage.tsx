import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Container from "../components/layout/Container";

import {
  getCheckoutData,
  CheckoutData,
} from "../services/cartService";

import {
  checkoutFromCart,
} from "../services/loanService";


// ========================================
// PAGE
// ========================================

export default function CheckoutPage() {

  const navigate = useNavigate();


  // ========================================
  // STATE
  // ========================================

  const [data, setData] =
    useState<CheckoutData | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  const [submitting, setSubmitting] =
    useState(false);

  const [days, setDays] =
    useState(3);


  // ========================================
  // LOAD CHECKOUT DATA
  // ========================================

  async function loadCheckout() {

    try {

      setLoading(true);

      const checkout =
        await getCheckoutData();

      setData(checkout);

    }
    catch (err) {

      console.error(err);

      setError("Failed to load checkout");

    }
    finally {

      setLoading(false);

    }

  }


  useEffect(() => {

    loadCheckout();

  }, []);


  // ========================================
  // HANDLE CHECKOUT
  // ========================================

  async function handleBorrow() {

    if (!data) return;

    try {

      setSubmitting(true);

      await checkoutFromCart({

        itemIds:
          data.items.map(item => item.id),

        days: days,

        borrowDate:
          new Date()
            .toISOString()
            .split("T")[0],

      });

      alert("Borrow success");

      navigate("/loans");

    }
    catch (err) {

      console.error(err);

      alert("Borrow failed");

    }
    finally {

      setSubmitting(false);

    }

  }


  // ========================================
  // LOADING
  // ========================================

  if (loading) {

    return (
      <Container>
        <div className="py-10 text-center">
          Loading checkout...
        </div>
      </Container>
    );

  }


  // ========================================
  // ERROR
  // ========================================

  if (error) {

    return (
      <Container>
        <div className="py-10 text-center text-red-500">
          {error}
        </div>
      </Container>
    );

  }


  if (!data) return null;


  // ========================================
  // UI
  // ========================================

  return (

    <Container>

      <div className="py-10 max-w-2xl">

        {/* TITLE */}
        <div className="text-2xl font-bold mb-6">
          Checkout
        </div>


        {/* USER INFO */}
        <div className="mb-6">

          <div className="font-semibold">
            {data.user.name}
          </div>

          <div className="text-gray-500">
            {data.user.email}
          </div>

        </div>


        {/* BOOK LIST */}
        <div className="flex flex-col gap-4 mb-6">

          {data.items.map(item => (

            <div
              key={item.id}
              className="flex gap-4 border-b pb-4"
            >

              <img
                src={item.book.coverImage}
                alt={item.book.title}
                className="w-16 h-20 object-cover rounded"
              />

              <div>

                <div className="font-semibold">
                  {item.book.title}
                </div>

                <div className="text-gray-500 text-sm">
                  {item.book.author.name}
                </div>

              </div>

            </div>

          ))}

        </div>


        {/* DURATION */}
        <div className="mb-6">

          <div className="font-semibold mb-2">
            Borrow duration
          </div>

          <div className="flex gap-3">

            {[3, 5, 10].map(d => (

              <button
                key={d}
                onClick={() => setDays(d)}
                className={
                  "px-4 py-2 rounded border " +
                  (days === d
                    ? "bg-blue-500 text-white"
                    : "bg-white")
                }
              >
                {d} days
              </button>

            ))}

          </div>

        </div>


        {/* BORROW BUTTON */}
        <button
          onClick={handleBorrow}
          disabled={submitting}
          className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600 disabled:opacity-50"
        >
          {submitting
            ? "Processing..."
            : "Confirm Borrow"}
        </button>


      </div>

    </Container>

  );

}