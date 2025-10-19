import { useDispatch, useSelector } from "react-redux";
import {
  checkOut,
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from "../redux/slices/cartSlice";
import Header from "../components/Header";

const Cart = () => {
  const { cart } = useSelector((state) => state.cartSlice);
  const dispatch = useDispatch();

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <>
    <Header />
      <div className="min-h-screen bg-gray-100">
        {/* Cart Container */}
        <div className="max-w-6xl mx-auto p-4 md:p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Section */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-4">
            <h1 className="text-2xl font-semibold mb-4 border-b pb-2">
              Shopping Cart
            </h1>

            {cart.length > 0 ? (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col md:flex-row items-center md:items-start border-b py-4 gap-4"
                >
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-32 h-32 object-contain"
                  />
                  <div className="flex-1">
                    <h2 className="text-lg font-medium">{item.title}</h2>
                    <p className="text-green-700 text-sm mt-1">In Stock</p>
                    <p className="text-sm mt-1">
                      Eligible for FREE Shipping & Returns
                    </p>

                    <div className="mt-3 flex items-center gap-4">
                      <label className="text-sm font-medium">Qty:</label>
                      <div className="flex items-center">
                        <button
                          onClick={() => dispatch(decrementQuantity(item.id))}
                          className="px-2 py-1 border rounded-l-md"
                        >
                          -
                        </button>
                        <span className="px-3 py-1 border-t border-b">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => dispatch(incrementQuantity(item.id))}
                          className="px-2 py-1 border rounded-r-md"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => dispatch(removeFromCart(item.id))}
                        className="text-sm text-blue-600 hover:underline"
                      >
                        Delete
                      </button>
                      <button className="text-sm text-blue-600 hover:underline">
                        Save for later
                      </button>
                    </div>
                  </div>
                  <div className="text-right font-semibold text-lg mt-2 md:mt-0">
                    ${item.price.toFixed(2)}
                  </div>
                </div>
              ))
            ) : (
              <h2 className="text-center text-red-500 text-xl my-8">
                Your cart is empty.
              </h2>
            )}

            {cart.length > 0 && (
              <div className="text-right text-lg font-medium mt-4">
                Subtotal ({cart.length} items):{" "}
                <span className="font-semibold">${subtotal.toFixed(2)}</span>
              </div>
            )}
          </div>

          {/* Right Section - Checkout Box */}
          {cart.length > 0 && (
            <div className="bg-white rounded-lg shadow-sm p-4 h-fit">
              <h2 className="text-lg font-medium mb-2">
                Subtotal ({cart.length} items):{" "}
                <span className="font-semibold">${subtotal.toFixed(2)}</span>
              </h2>
              <label className="flex items-center space-x-2 mb-4">
                <input type="checkbox" className="accent-yellow-500" />
                <span className="text-sm">This order contains a gift</span>
              </label>
              <button
                onClick={() => dispatch(checkOut())}
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-2 rounded-full"
              >
                Proceed to Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
