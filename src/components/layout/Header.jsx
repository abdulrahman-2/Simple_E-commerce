import { Link } from "react-router-dom";
import { LuShoppingCart } from "react-icons/lu";
import { useState } from "react";

const Header = () => {
  const [cartItems] = useState(JSON.parse(localStorage.getItem("cart")) || []);

  return (
    <div className="h-[90px] w-full bg-slate-500 text-white flex items-center justify-between px-5">
      <div className="text-[40px] leading-none flex items-center gap-12">
        <Link to="/">Store</Link>
        <ul>
          <li className="text-[18px] font-semibold">
            <Link to="/">Home</Link>
          </li>
        </ul>
      </div>

      <div className="relative">
        <Link to="/cart">
          <LuShoppingCart size={30} />
        </Link>
        <span className="absolute -top-[8px] -right-[10px] w-5 h-5 rounded-full bg-black text-white grid place-items-center text-[10px] z-10">
          {cartItems.length}
        </span>
      </div>
    </div>
  );
};

export default Header;
