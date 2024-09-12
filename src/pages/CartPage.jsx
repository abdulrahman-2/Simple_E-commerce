import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { emptyCart } from "../assets";

const CartPage = () => {
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const handleIncrease = (id) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems.map((item) =>
        item.id === id && item.quantity < 10
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      const updatedItem = updatedItems.find((item) => item.id === id);
      if (updatedItem) {
        toast.info(`${updatedItem.name} quantity increased`);
      }
      return updatedItems;
    });
  };

  const handleDecrease = (id) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
      const updatedItem = updatedItems.find((item) => item.id === id);
      if (updatedItem) {
        toast.info(`${updatedItem.name} quantity decreased`);
      }
      return updatedItems;
    });
  };

  const handleRemove = (id) => {
    setCartItems((prevItems) => {
      const removedItem = prevItems.find((item) => item.id === id);
      const updatedItems = prevItems.filter((item) => item.id !== id);
      if (removedItem) {
        toast.info(`${removedItem.name} removed from cart`);
      }
      return updatedItems;
    });
  };

  const getSubTotal = (price, quantity) => {
    return price * quantity;
  };

  const getTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <div>
      {cartItems.length > 0 ? (
        <div className="w-[1200px] mx-auto mt-40">
          <div className="bg-white table-responsive overflow-x-auto w-full mb-6 border-2 border-gray-200 shadow-lg rounded-lg">
            <table className="table-auto w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="p-4 text-left">Product Image</th>
                  <th className="p-4 text-left">Product Name</th>
                  <th className="p-4 text-center">Quantity</th>
                  <th className="p-4 text-center">Price</th>
                  <th className="p-4 text-center">Total</th>
                  <th className="p-4 text-center">Delete</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((cartItem) => (
                  <tr key={cartItem.id} className="border-b">
                    <td className="p-4 text-left">
                      <img
                        className="w-16 h-16"
                        src={cartItem.image}
                        alt={cartItem.name}
                      />
                    </td>
                    <td className="p-4 text-left">{cartItem.name}</td>
                    <td className="p-4 text-center">
                      <div className="flex justify-center items-center">
                        <button
                          className="border w-8 h-8 grid place-items-center"
                          onClick={() => handleDecrease(cartItem.id)}
                        >
                          -
                        </button>
                        <input
                          type="text"
                          value={cartItem.quantity}
                          readOnly
                          className="w-12 text-center border mx-2"
                        />
                        <button
                          className="border w-8 h-8 grid place-items-center"
                          onClick={() => handleIncrease(cartItem.id)}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="p-4 text-center">${cartItem.price}</td>
                    <td className="p-4 text-center">
                      ${getSubTotal(cartItem.price, cartItem.quantity)}
                    </td>
                    <td>
                      <div
                        className="flex items-center justify-center cursor-pointer m-auto bg-[#DB4444] w-8 h-8 rounded-md"
                        onClick={() => handleRemove(cartItem.id)}
                      >
                        <span className="text-white font-bold flex items-center justify-center">
                          X
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="text-[30px] font-bold text-right">
            Total Cart:{" "}
            <span className="text-[#4d4de9]">${getTotal().toFixed(2)}</span>
          </h2>
        </div>
      ) : (
        <div className="grid place-items-center">
          <img src={emptyCart} alt="Empty Cart" />
        </div>
      )}
    </div>
  );
};

export default CartPage;
