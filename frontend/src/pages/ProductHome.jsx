import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import banner1 from "../assets/banner1.jpg";
import banner2 from "../assets/banner2.jpg";
import banner3 from "../assets/banner3.jpg";
import ProductCard from "../components/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsThunk } from "../redux/slices/productSlice";
import Header from "../components/Header";

export default function ProductHome() {

  const banners = [banner1, banner2, banner3];

  const [index, setIndex] = useState(0);

  const dispatch = useDispatch()

  const { products } = useSelector((state) => state.productSlice);

  useEffect(() => {
    dispatch(fetchProductsThunk())
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % banners.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [banners.length]);

  const prevSlide = () => {
    setIndex((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % banners.length);
  };

  return (
    <>
      <Header />
      <div className="bg-gray-100 min-h-screen">
        <div className="relative">
          <div className="overflow-hidden relative h-[400px]">
            {banners.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`Banner ${i + 1}`}
                className={`absolute w-full h-full object-cover transition-opacity duration-700 ${i === index ? "opacity-100" : "opacity-0"
                  }`}
              />
            ))}

            <button
              onClick={prevSlide}
              className="absolute top-1/2 left-4 bg-white/70 p-2 rounded-full hover:bg-white"
            >
              <ChevronLeft />
            </button>
            <button
              onClick={nextSlide}
              className="absolute top-1/2 right-4 bg-white/70 p-2 rounded-full hover:bg-white"
            >
              <ChevronRight />
            </button>
          </div>

          <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t to-transparent"></div>
        </div>

        <div className="mt-10 px-6">
          <h2 className="text-xl font-semibold mb-4">Products</h2>
          <div className="relative">
            <div className="flex space-x-4 overflow-x-scroll scrollbar-hide pb-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
