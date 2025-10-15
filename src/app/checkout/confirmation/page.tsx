"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

type OrderItem = {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image_url?: string | null;
};

type OrderData = {
  items: OrderItem[];
  total: number;
  customer: {
    fullName: string;
    email: string;
    address: string;
    city: string;
    zipCode: string;
  };
  orderNumber: string;
  date: string;
};

export default function ConfirmationPage() {
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Get order data from localStorage
    const savedOrder = localStorage.getItem("lastOrder");
    if (savedOrder) {
      setOrderData(JSON.parse(savedOrder));
    }
  }, []);

  if (!mounted) {
    return null;
  }

  if (!orderData) {
    return (
      <div className="p-8 max-w-4xl mx-auto text-center">
        <h1 className="text-3xl font-bold mb-4">No Order Found</h1>
        <p className="text-gray-600 mb-6">We couldn't find your order information.</p>
        <Link
          href="/products"
          className="inline-block bg-[#8B6F47] text-white px-6 py-3 rounded-md hover:bg-[#7a603e] transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      {/* Success Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
          <span className="text-4xl">✓</span>
        </div>
        <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
        <p className="text-gray-600">
          Thank you for your order. We've sent a confirmation email to{" "}
          <span className="font-semibold">{orderData.customer.email}</span>
        </p>
      </div>

      {/* Order Details */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="font-semibold mb-2">Order Number</h3>
            <p className="text-gray-600">#{orderData.orderNumber}</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Order Date</h3>
            <p className="text-gray-600">{orderData.date}</p>
          </div>
        </div>

        {/* Shipping Address */}
        <div className="border-t pt-4">
          <h3 className="font-semibold mb-2">Shipping Address</h3>
          <p className="text-gray-600">{orderData.customer.fullName}</p>
          <p className="text-gray-600">{orderData.customer.address}</p>
          <p className="text-gray-600">
            {orderData.customer.city}, {orderData.customer.zipCode}
          </p>
        </div>
      </div>

      {/* Order Items */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Order Items</h2>
        <div className="space-y-4">
          {orderData.items.map((item) => (
            <div key={item.id} className="flex gap-4 pb-4 border-b last:border-b-0">
              <div className="w-20 h-20 flex-shrink-0">
                {item.image_url ? (
                  <Image
                    src={item.image_url}
                    alt={item.title}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover rounded"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 rounded flex items-center justify-center">
                    No Image
                  </div>
                )}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                <p className="text-sm text-gray-600">${item.price.toFixed(2)} each</p>
              </div>
              <div className="text-right">
                <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Order Total */}
        <div className="mt-6 pt-4 border-t">
          <div className="flex justify-between text-sm mb-2">
            <span>Subtotal:</span>
            <span>${orderData.total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm mb-2">
            <span>Shipping:</span>
            <span className="text-green-600">FREE</span>
          </div>
          <div className="flex justify-between text-lg font-bold pt-2 border-t">
            <span>Total:</span>
            <span className="text-[#8B6F47]">${orderData.total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
        <h3 className="font-semibold mb-2">What's Next?</h3>
        <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
          <li>You'll receive an email confirmation shortly</li>
          <li>Your order will be prepared by our artisans</li>
          <li>We'll send you a shipping notification when your order ships</li>
          <li>Expected delivery: 5-7 business days</li>
        </ul>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 justify-center">
        <Link
          href="/products"
          className="bg-[#8B6F47] hover:bg-[#7a603e] text-white px-6 py-3 rounded-md font-semibold transition-colors"
        >
          Continue Shopping
        </Link>
        <Link
          href="/"
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-md font-semibold transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
