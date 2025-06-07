import { useState } from 'react';
import { ArrowLeft, MapPin,  Plus, Minus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import AddressModal from '../AddressModal';

export default function Checkout() {
  const { state, dispatch } = useCart();
  const navigate = useNavigate();
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [shippingAddress, setShippingAddress] = useState({
    name: "Raman Bajaj",
    address: "1901, Malviya Nagar, New Delhi 110017",
    phone: "+91 9XXXXXXXX",
    email: "email@example.com"
  });
  const apiUrl = import.meta.env.VITE_API_URL

  const handleUpdateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    dispatch({
      type: 'UPDATE_QUANTITY',
      payload: { id, quantity: newQuantity }
    });
  };

  const handleRemoveItem = (id: number) => {
    dispatch({
      type: 'REMOVE_ITEM',
      payload: id
    });
  };

  const handleAddressUpdate = (newAddress: {
    name: string;
    address: string;
    phone: string;
    email: string;
  }) => {
    setShippingAddress(newAddress);
  };

  const handleCheckout = async () => {
    try {
      setIsLoading(true);
      const orderData = {
        customerInfo: shippingAddress,
        items: state.items,
        totalAmount: state.total,
        discount: 150,
        finalAmount: state.total - 150
      };

      const response = await fetch(`${apiUrl}/api/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();

      if (data.success) {
        dispatch({ type: 'CLEAR_CART' });
        navigate('/');
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Failed to process order. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-8">Add some products to your cart to checkout</p>
          <Link to="/" className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile View */}
      <div className="md:hidden">
        {/* Header */}
        <div className="bg-white px-4 py-3 flex items-center gap-4 border-b">
          <Link to="/">
            <ArrowLeft size={24} />
          </Link>
          <h1 className="text-xl font-semibold">Checkout</h1>
        </div>

        {/* Shipping Address */}
        <div className="bg-white px-4 py-3 mb-2">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-semibold">Shipping Address</h2>
            <button 
              onClick={() => setIsAddressModalOpen(true)}
              className="text-green-600 text-sm font-medium px-3 py-1 rounded-full border border-green-600"
            >
              CHANGE
            </button>
          </div>
          <div className="flex items-start gap-2">
            <MapPin className="text-gray-600 mt-1" size={16} />
            <div>
              <p className="font-medium">Home</p>
              <p className="text-sm text-gray-600">{shippingAddress.address}</p>
            </div>
          </div>
        </div>

        {/* Offers */}
        <div className="bg-white px-4 py-3 mb-2">
          <h2 className="font-semibold mb-3">Available Offers For You</h2>
          <div className="border border-gray-200 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Flat 10% Off</p>
                <p className="text-xs text-gray-500">REDEEM15</p>
              </div>
              <button className="text-green-600 text-sm font-medium">TAP TO APPLY</button>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="bg-white px-4 py-3 mb-2">
          <h2 className="font-semibold mb-3">Your Order</h2>
          <div className="space-y-4">
            {state.items.map((item) => (
              <div key={item.id} className="flex gap-3 items-start">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-medium">{item.title}</h3>
                  <p className="text-sm text-gray-500">₹{item.price}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button 
                      onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                      className="p-1 rounded-full border"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button 
                      onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                      className="p-1 rounded-full border"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <button 
                    onClick={() => handleRemoveItem(item.id)}
                    className="text-red-500 text-xs mt-2"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Price Summary */}
        <div className="bg-white px-4 py-3 mb-20">
          <h2 className="font-semibold mb-3">Price Summary</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Order Total</span>
              <span>₹{state.total}</span>
            </div>
            <div className="flex justify-between text-green-600">
              <span>Item Discount</span>
              <span>-₹150</span>
            </div>
            <div className="flex justify-between text-green-600">
              <span>Shipping</span>
              <span>FREE</span>
            </div>
            <div className="flex justify-between font-semibold text-base pt-2 border-t">
              <span>To Pay</span>
              <span>₹{state.total - 150}</span>
            </div>
          </div>
        </div>

        {/* Fixed Bottom Button */}
        <div className="fixed bottom-0 left-0 right-0 bg-white p-4 border-t">
          <button 
            onClick={handleCheckout}
            disabled={isLoading}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-medium disabled:bg-gray-400"
          >
            {isLoading ? 'Processing...' : 'Continue To Payment'}
          </button>
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden md:block container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Address Section */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-semibold mb-2">Shipping Address</h2>
                  <p className="text-gray-600 mb-1">{shippingAddress.name}</p>
                  <p className="text-gray-600">{shippingAddress.address}</p>
                </div>
                <button 
                  onClick={() => setIsAddressModalOpen(true)}
                  className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
                >
                  Change
                </button>
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Your Order</h2>
              <div className="space-y-4">
                {state.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 py-4 border-b">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium">{item.title}</h3>
                      <p className="text-gray-600">₹{item.price}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <button 
                          onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:bg-gray-100 rounded"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:bg-gray-100 rounded"
                        >
                          <Plus size={16} />
                        </button>
                        <button 
                          onClick={() => handleRemoveItem(item.id)}
                          className="text-red-500 text-sm ml-4 hover:underline"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Price Summary</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Order Total</span>
                  <span>₹{state.total}</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>Items Discount</span>
                  <span>-₹150</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>Shipping</span>
                  <span>FREE</span>
                </div>
                <div className="flex justify-between font-semibold pt-3 border-t">
                  <span>To Pay</span>
                  <span>₹{state.total - 150}</span>
                </div>
              </div>
              <button 
                onClick={handleCheckout}
                disabled={isLoading}
                className="w-full bg-black text-white py-3 rounded-lg mt-6 hover:bg-gray-800 disabled:bg-gray-400"
              >
                {isLoading ? 'Processing...' : 'Continue to Payment'}
              </button>
            </div>
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