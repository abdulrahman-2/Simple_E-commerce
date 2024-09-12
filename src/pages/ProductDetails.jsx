import { useParams } from "react-router-dom";
import { GoHeart } from "react-icons/go";
import { FiPlus, FiMinus } from "react-icons/fi";
import { useState } from "react";

function ProductDetails({ data, handleAddToCart }) {
  const { id } = useParams();
  const product = data.find((item) => item.id === id);
  const [isHeartClicked, setIsHeartClicked] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const handleIncrease = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const handleHeartClick = () => {
    setIsHeartClicked(!isHeartClicked);
  };

  return (
    <div className="my-14">
      {product ? (
        <div className="flex flex-col lg:flex-row items-center gap-20">
          <div className="flex-1 lg:w-[700px] h-[500px] lg:h-[600px] bg-gray-300 p-40 rounded-md">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full"
            />
          </div>
          <div className="flex-1">
            <h1 className="text-[35px] font-semibold mb-6">{product.name}</h1>
            <div className="flex items-center gap-20 mb-6">
              <p className="text-[20px] font-semibold">{`$${product.price}`}</p>
              <p className="text-[20px] font-semibold">{product.discount}</p>
            </div>
            <div className="flex items-center justify-between gap-4 mb-6">
              <div className="rounded-md overflow-hidden border border-black flex items-center justify-between flex-1 h-[40px]">
                <FiMinus
                  className="w-10 p-2 h-full cursor-pointer bg-white text-black"
                  onClick={handleDecrease}
                />
                <span className="text-2xl font-semibold">{quantity}</span>
                <FiPlus
                  className="w-10 p-2 h-full cursor-pointer bg-white text-black"
                  onClick={handleIncrease}
                />
              </div>
              <button
                className="rounded-md flex-1 h-[40px] bg-red-600 text-white"
                onClick={() => handleAddToCart(product)}
              >
                Add To Cart
              </button>
              <GoHeart
                size={25}
                className={`w-10 h-10 grid place-items-center p-2 rounded-md border border-black ${
                  isHeartClicked
                    ? "text-white bg-red-600 border-none"
                    : "text-black bg-white"
                }`}
                onClick={handleHeartClick}
              />
            </div>
          </div>
        </div>
      ) : (
        <p>Product not found</p>
      )}
    </div>
  );
}

export default ProductDetails;
