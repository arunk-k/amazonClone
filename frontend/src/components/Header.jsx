import { useState, useEffect } from "react";
import { Search, ShoppingCart } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { search } from "../redux/slices/productSlice";


function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hasToken, setHasToken] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cartSlice);

 const handleSearch = (e) => {
  dispatch(search(e.target.value));
};


  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) setHasToken(true);
  }, []);

  return (
    <header className="bg-[#090909] text-white">
      <div className="flex justify-between px-4 py-2 md:px-6 items-center">
        <div className="flex items-center space-x-2">
          <a href="/" className="flex items-center space-x-1">
            <img
              src="https://wallpapers.com/images/hd/amazon-logo-black-background-xb9pdemosnjfz9ej.jpg"
              alt="Amazon"
              className="h-6 md:h-8"
            />
          </a>
        </div>

        <div className="hidden md:flex mx-4 w-[500px]">
          <div className="flex w-full">
            <select className="w-20 bg-gray-100 text-gray-700 px-2 rounded-l-md border-r border-gray-300 text-sm focus:outline-none">
              <option>All</option>
              <option>Books</option>
              <option>Electronics</option>
              <option>Fashion</option>
              <option>Home</option>
            </select>
            <input
              type="text"
              placeholder="Search Amazon"
              onChange={handleSearch}
              className="w-full px-3 py-2 bg-white text-gray-800 focus:outline-none"
            />
            <button className="bg-[#febd69] hover:bg-[#f3a847] p-2 rounded-r-md flex items-center justify-center">
              <Search className="text-white w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-4 text-sm font-medium">
          {!hasToken && (
            <button
              onClick={() => navigate("/auth")}
              className="md:block hover:underline text-left"
            >
              <div>Sign in</div>
              <div className="font-bold">Account</div>
            </button>
          )}

          <a href="#" className="hidden md:block hover:underline">
            <div>Returns</div>
            <div className="font-bold">& Orders</div>
          </a>

          <button onClick={() => navigate("/cart")} className="relative">
            <ShoppingCart className="w-6 h-6" />
            <span className="absolute -top-2 -right-2 bg-[#f3a847] text-black text-xs font-bold rounded-full px-1">
              {cart.length}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
