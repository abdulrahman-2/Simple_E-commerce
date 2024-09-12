import { useNavigate } from "react-router-dom";

const Cart = ({ product, handleAddToCart }) => {
  const navigate = useNavigate();

  const handleSelectedItem = (product) => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div className="bg-white overflow-hidden rounded-md flex flex-col shadow-lg h-[360px]">
      <div className="bg-gray-300 w-full h-[60%] grid place-content-center p-10">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="p-3">
        <h3 className="text-[22px] font-semibold">{product.name}</h3>
        <span className="text-[20px] font-medium mb-6 block">{`$${product.price}`}</span>
        <div className="flex items-center justify-between">
          <button
            className="px-3 py-1 bg-slate-500 text-white rounded-md border-none"
            onClick={() => handleAddToCart(product)}
          >
            Add To Cart
          </button>
          <button
            className="px-3 py-1 bg-slate-500 text-white rounded-md border-none"
            onClick={() => handleSelectedItem(product)}
          >
            Show Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
