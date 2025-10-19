import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";
import Header from "../components/Header";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const products = JSON.parse(sessionStorage.getItem("apiData")) || [];
    const found = products.find((item) => item.id == id);
    setProduct(found || null);
    if (found?.thumbnail) setSelectedImage(found.thumbnail);
  }, [id]);


  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart({ ...product, quantity }));
    }
  };

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto text-center py-16">
        <h2 className="text-xl text-gray-600">Product not found.</h2>
      </div>
    );
  }

  return (
    <>
    <Header />
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid md:grid-cols-2 gap-10">
          {/* ---------- Product Images ---------- */}
          <div>
            <img
              src={selectedImage}
              alt={product.title}
              className="w-full h-96 object-contain border rounded-lg p-4"
            />

            <div className="flex mt-4 gap-2 flex-wrap">
              {product.images?.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Thumbnail ${idx}`}
                  onClick={() => setSelectedImage(img)}
                  className={`w-20 h-20 border rounded-md object-contain cursor-pointer transition ${selectedImage === img
                      ? "border-blue-500 shadow-md scale-105"
                      : "border-gray-300"
                    }`}
                />
              ))}
            </div>
          </div>

          {/* ---------- Product Details ---------- */}
          <div>
            <h1 className="text-3xl font-semibold mb-2">{product.title}</h1>
            <p className="text-gray-600 mb-2">Brand: {product.brand}</p>

            {/* Rating */}
            <div className="flex items-center mb-2">
              {Array.from({ length: 5 }, (_, i) => (
                <svg
                  key={i}
                  className={`w-5 h-5 ${i < Math.round(product.rating || 0)
                      ? "text-yellow-400"
                      : "text-gray-300"
                    }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.488 6.91l6.561-.954L10 0l2.951 5.956 6.561.954-4.757 4.635 1.123 6.545z" />
                </svg>
              ))}
              <span className="ml-2 text-gray-600">
                ({product.rating?.toFixed(1)} / 5)
              </span>
            </div>

            <p className="text-3xl font-bold mt-4 text-green-600">
              ₹{product.price}
            </p>

            <div className="flex items-center mt-5 space-x-4">


              <button
                onClick={handleAddToCart}
                className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-2 rounded transition"
              >
                Add to Cart
              </button>
            </div>

            {/* Extra Info */}
            <div className="mt-6 space-y-2 text-gray-700">
              <p>
                <strong>Category:</strong> {product.category}
              </p>
              <p>
                <strong>Stock:</strong> {product.stock} available
              </p>
              <p>
                <strong>Warranty:</strong> {product.warrantyInformation}
              </p>
              <p>
                <strong>Shipping:</strong> {product.shippingInformation}
              </p>
              <p>
                <strong>Return Policy:</strong> {product.returnPolicy}
              </p>
            </div>

            {/* Description */}
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-2">Description</h2>
              <p className="text-gray-700 leading-relaxed">
                {product.description}
              </p>
            </div>
          </div>
        </div>

        {/* ---------- Customer Reviews ---------- */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">Customer Reviews</h2>
          {product.reviews?.length ? (
            product.reviews.map((review, idx) => (
              <div
                key={idx}
                className="border-b border-gray-200 py-4 last:border-b-0"
              >
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-gray-800">
                    {review.reviewerName || "Anonymous"}
                  </p>
                  <div className="flex">
                    {Array.from({ length: 5 }, (_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${i < review.rating
                            ? "text-yellow-400"
                            : "text-gray-300"
                          }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.488 6.91l6.561-.954L10 0l2.951 5.956 6.561.954-4.757 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 mt-1">{review.comment}</p>
                <p className="text-sm text-gray-500 mt-1">
                  {new Date(review.date).toLocaleDateString()}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No reviews yet.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
