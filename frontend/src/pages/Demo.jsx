









// import React, { useState } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import Navbar from "./components/Navbar";
// import Home from "./pages/Home";
// import Cart from "./pages/Cart";
// import Checkout from "./pages/Checkout";
// import OrderConfirmation from "./pages/OrderConfirmation";
// import YourOrders from "./pages/YourOrders";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";

// export default function App() {
//   // ---------- States ----------
//   const [cartItems, setCartItems] = useState([]);
//   const [orders, setOrders] = useState([]);

//   // ---------- Cart Functions ----------
//   const addToCart = (product) => {
//     setCartItems((prev) => {
//       const exist = prev.find((item) => item.id === product.id);
//       if (exist)
//         return prev.map((item) =>
//           item.id === product.id ? { ...item, qty: item.qty + 1 } : item
//         );
//       return [...prev, { ...product, qty: 1 }];
//     });
//   };

//   const updateQuantity = (id, qty) => {
//     setCartItems((prev) =>
//       prev.map((item) =>
//         item.id === id ? { ...item, qty: qty < 1 ? 1 : qty } : item
//       )
//     );
//   };

//   // ---------- Order Function ----------
//   const confirmOrder = (cartItems) => {
//     const order = {
//       id: Date.now(),
//       items: cartItems,
//       total: cartItems.reduce((sum, item) => sum + item.price * item.qty, 0),
//     };
//     setOrders((prev) => [...prev, order]);
//     setCartItems([]); // clear cart after order
//     window.location = "/order-confirmation";
//   };

//   // ---------- Return JSX ----------
//   return (
//     <Router>
//       <Navbar cartCount={cartItems.length} />

//       <Routes>
//         {/* Login & Signup */}
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />

//         {/* Shop Pages */}
//         <Route path="/" element={<Home addToCart={addToCart} />} />
//         <Route
//           path="/cart"
//           element={
//             <Cart
//               cartItems={cartItems}
//               updateQuantity={updateQuantity}
//               proceedToCheckout={() => (window.location = "/checkout")}
//             />
//           }
//         />
//         <Route
//           path="/checkout"
//           element={
//             <Checkout cartItems={cartItems} confirmOrder={confirmOrder} />
//           }
//         />
//         <Route
//           path="/order-confirmation"
//           element={<OrderConfirmation orders={orders} />}
//         />
//         <Route path="/orders" element={<YourOrders orders={orders} />} />
//       </Routes>
//     </Router>
//   );
// }
