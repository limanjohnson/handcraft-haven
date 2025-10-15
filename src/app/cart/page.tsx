"use client";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const {
    items,
    addItem,
    decrementItem,
    removeItem,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
  } = useCart();

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-MW", {
      style: "currency",
      currency: "MWK",
      minimumFractionDigits: 2,
    }).format(amount);

  if (items.length === 0) {
    return (
      <div className="p-6 text-center">
        <h2>Your cart is empty 😢</h2>
        <Link href="/products" className="text-blue-600 underline">
          View products
        </Link>
      </main>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Shopping Cart 🛒</h1>
      <ul className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex flex-col sm:flex-row sm:items-center justify-between border rounded-lg p-4 shadow-sm"
          >
            <div className="flex items-center gap-4 flex-1">
              <img
                src={item.image || "/placeholder.png"}
                alt={item.title}
                className="w-20 h-20 object-cover rounded"
              />
              <div>
                <h2 className="font-semibold text-lg">{item.title}</h2>
                <p className="text-gray-600">
                  {formatCurrency(item.price)} each
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() => decrementItem(item.id)}
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    aria-label={`Decrease quantity of ${item.title}`}
                  >
                    −
                  </button>
                  <input
                    type="number"
                    value={item.quantity}
                    min={1}
                    onChange={(e) =>
                      updateQuantity(
                        item.id,
                        Math.max(1, Number(e.target.value) || 1)
                      )
                    }
                    className="w-14 text-center border rounded"
                  />
                  <button
                    onClick={() =>
                      addItem({
                        id: item.id,
                        title: item.title,
                        price: item.price,
                        image: item.image,
                      })
                    }
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    aria-label={`Increase quantity of ${item.title}`}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-end mt-4 sm:mt-0">
              <p className="font-medium">
                {formatCurrency(item.price * item.quantity)}
              </p>
              <button
                onClick={() => removeItem(item.id)}
                className="text-sm text-red-600 hover:underline mt-2"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center border-t pt-4">
        <button
          onClick={clearCart}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Clear Cart
        </button>
      </div>

      <div className="text-right mt-6">
        <Link
          href="/checkout"
          className="inline-block px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
        >
          Proceed to Checkout
        </Link>
      </div>
    </main>
  );
}

