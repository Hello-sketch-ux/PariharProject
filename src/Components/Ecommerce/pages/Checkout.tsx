import { useState } from "react";
import { ArrowLeft, MapPin, Plus, Minus } from "lucide-react";
import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import AddressModal from "../AddressModal";

export default function Checkout() {
  const { state, dispatch } = useCart();
  const navigate = useNavigate();

  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [shippingAddress, setShippingAddress] = useState({
    name: "Raman Bajaj",
    address: "1901, Malviya Nagar, New Delhi 110017",
    phone: "+91 9XXXXXXXX",
    email: "email@example.com",
  });

  const apiUrl = import.meta.env.VITE_API_URL;

  const handleUpdateQuantity = (id: number, qty: number) => {
    if (qty < 1) return;
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity: qty } });
  };

  const handleRemoveItem = (id: number) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
  };

  const handleAddressUpdate = (addr: typeof shippingAddress) => {
    setShippingAddress(addr);
  };

  const handleCheckout = async () => {
    try {
      setIsLoading(true);

      const orderData = {
        customerInfo: shippingAddress,
        items: state.items,
        totalAmount: state.total,
        discount: 150,
        finalAmount: state.total - 150,
      };

      const res = await fetch(`${apiUrl}/api/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      const data = await res.json();

      if (data.success) {
        dispatch({ type: "CLEAR_CART" });
        navigate("/");
      } else {
        throw new Error(data.error);
      }
    } catch (err) {
      alert("Checkout failed. Try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
        <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
        <Link
          to="/"
          className="mt-4 bg-black text-white px-6 py-3 rounded-lg"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24 md:pb-0">
      {/* MOBILE VIEW */}
      <div className="md:hidden">
        <div className="bg-white px-4 py-3 flex items-center gap-3 border-b">
          <Link to="/">
            <ArrowLeft />
          </Link>
          <h1 className="text-lg font-semibold">Checkout</h1>
        </div>

        <div className="bg-white p-4 mt-2">
          <div className="flex justify-between mb-2">
            <h2 className="font-semibold">Shipping Address</h2>
            <button
              onClick={() => setIsAddressModalOpen(true)}
              className="text-green-600 text-sm"
            >
              Change
            </button>
          </div>
          <div className="flex gap-2 text-sm text-gray-600">
            <MapPin size={16} />
            <p>{shippingAddress.address}</p>
          </div>
        </div>

        <div className="bg-white p-4 mt-2">
          <h2 className="font-semibold mb-3">Your Order</h2>
          {state.items.map((item) => (
            <div key={item.id} className="flex gap-3 mb-4">
              <img
                src={item.imageUrl}
                className="w-16 h-16 rounded object-cover"
              />
              <div className="flex-1">
                <p className="font-medium">{item.title}</p>
                <p className="text-sm text-gray-500">₹{item.price}</p>
                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() =>
                      handleUpdateQuantity(item.id, item.quantity - 1)
                    }
                    className="border rounded p-1"
                  >
                    <Minus size={14} />
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() =>
                      handleUpdateQuantity(item.id, item.quantity + 1)
                    }
                    className="border rounded p-1"
                  >
                    <Plus size={14} />
                  </button>
                </div>
                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className="text-red-500 text-xs mt-1"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white p-4 mt-2">
          <div className="flex justify-between text-sm">
            <span>Total</span>
            <span>₹{state.total}</span>
          </div>
          <div className="flex justify-between text-sm text-green-600">
            <span>Discount</span>
            <span>-₹150</span>
          </div>
          <div className="flex justify-between font-semibold mt-2">
            <span>To Pay</span>
            <span>₹{state.total - 150}</span>
          </div>
        </div>

        <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4">
          <button
            onClick={handleCheckout}
            disabled={isLoading}
            className="w-full bg-green-600 text-white py-3 rounded-lg"
          >
            {isLoading ? "Processing..." : "Continue to Payment"}
          </button>
        </div>
      </div>

      {/* DESKTOP VIEW */}
      <div className="hidden md:block container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Checkout</h1>

        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-2 space-y-6">
            <div className="bg-white p-6 rounded shadow">
              <h2 className="font-semibold mb-2">Shipping Address</h2>
              <p>{shippingAddress.name}</p>
              <p className="text-gray-600">{shippingAddress.address}</p>
              <button
                onClick={() => setIsAddressModalOpen(true)}
                className="mt-3 bg-black text-white px-4 py-2 rounded"
              >
                Change
              </button>
            </div>

            <div className="bg-white p-6 rounded shadow">
              {state.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 border-b py-4"
                >
                  <img
                    src={item.imageUrl}
                    className="w-20 h-20 rounded"
                  />
                  <div className="flex-1">
                    <p className="font-medium">{item.title}</p>
                    <p>₹{item.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded shadow h-fit">
            <h2 className="font-semibold mb-4">Summary</h2>
            <div className="flex justify-between">
              <span>Total</span>
              <span>₹{state.total}</span>
            </div>
            <div className="flex justify-between text-green-600">
              <span>Discount</span>
              <span>-₹150</span>
            </div>
            <div className="flex justify-between font-semibold mt-3">
              <span>To Pay</span>
              <span>₹{state.total - 150}</span>
            </div>

            <button
              onClick={handleCheckout}
              disabled={isLoading}
              className="w-full mt-6 bg-black text-white py-3 rounded"
            >
              {isLoading ? "Processing..." : "Continue to Payment"}
            </button>
          </div>
        </div>
      </div>

      <AddressModal
        isOpen={isAddressModalOpen}
        onClose={() => setIsAddressModalOpen(false)}
        currentAddress={shippingAddress}
        onSave={handleAddressUpdate}
      />
    </div>
  );
}
