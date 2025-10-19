
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <Link to={`/product/${product.id}`}>
      <div className="min-w-[200px] bg-white rounded-xl p-4 shadow hover:shadow-md transition cursor-pointer relative">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="h-40 w-full object-contain mb-3"
        />
        <p className="text-sm font-medium">{product.title}</p>
        <p className="text-lg font-bold">₹{product.price}</p>

      </div>
    </Link>
  );
};

export default ProductCard;
