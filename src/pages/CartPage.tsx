import { useEffect, useState } from "react";
import Container from "../components/layout/Container";

import {
  getCartItems,
  removeCartItem,
  clearCart,
  CartItem,
} from "../services/cartService";

export default function CartPage() {

  // ===============================
  // STATE
  // ===============================

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ===============================
  // LOAD CART
  // ===============================

  async function loadCart() {

    try {

      setLoading(true);

      const items = await getCartItems();

      setCartItems(items);

    } catch (err) {

      console.error(err);

      setError("Failed to load cart");

    } finally {

      setLoading(false);

    }

  }

  // ===============================
  // REMOVE ITEM
  // ===============================

  async function handleRemove(itemId: number) {

    try {

      await removeCartItem(itemId);

      // reload cart
      loadCart();

    } catch (err) {

      console.error(err);

      alert("Failed to remove item");

    }

  }

  // ===============================
  // CLEAR CART
  // ===============================

  async function handleClearCart() {

    try {

      await clearCart();

      setCartItems([]);

    } catch (err) {

      console.error(err);

      alert("Failed to clear cart");

    }

  }

  // ===============================
  // FIRST LOAD
  // ===============================

  useEffect(() => {

    loadCart();

  }, []);

  // ===============================
  // LOADING STATE
  // ===============================

  if (loading) {

    return (

      <Container>

        <div className="py-10 text-center">
          Loading cart...
        </div>

      </Container>

    );

  }

  // ===============================
  // ERROR STATE
  // ===============================

  if (error) {

    return (

      <Container>

        <div className="py-10 text-center text-red-500">
          {error}
        </div>

      </Container>

    );

  }

  // ===============================
  // EMPTY STATE
  // ===============================

  if (cartItems.length === 0) {

    return (

      <Container>

        <div className="py-10 text-center">
          Your cart is empty
        </div>

      </Container>

    );

  }

  // ===============================
  // MAIN UI
  // ===============================

  return (

    <Container>

      <div className="py-10">

        {/* TITLE */}
        <div className="text-2xl font-bold mb-6">
          My Cart
        </div>


        {/* CART LIST */}
        <div className="flex flex-col gap-4">

          {cartItems.map(item => (

            <div
              key={item.id}
              className="flex justify-between items-center border-b pb-4"
            >

              {/* LEFT */}
              <div className="flex items-center gap-4">

                <img
                  src={item.book.coverImage}
                  alt={item.book.title}
                  className="w-16 h-20 object-cover rounded"
                />

                <div>

                  <div className="font-semibold">
                    {item.book.title}
                  </div>

                  <div className="text-sm text-gray-500">
                    {item.book.author.name}
                  </div>

                </div>

              </div>


              {/* RIGHT */}
              <button
                onClick={() => handleRemove(item.id)}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button>

            </div>

          ))}

        </div>


        {/* CLEAR CART BUTTON */}
        <div className="mt-6">

          <button
            onClick={handleClearCart}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Clear Cart
          </button>

        </div>

      </div>

    </Container>

  );

}