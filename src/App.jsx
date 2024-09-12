import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import CartPage from "./pages/CartPage";
import ProductDetails from "./pages/ProductDetails";
import { data } from "./data/data";
import { useEffect, useState } from "react";
import Notification from "./components/layout/Notification";
import { toast } from "react-toastify";

function App() {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const handleAddToCart = (product) => {
    setCartItems((prevItems) => {
      const itemIndex = prevItems.findIndex((item) => item.id === product.id);

      let updatedItems;
      if (itemIndex >= 0) {
        updatedItems = prevItems.map((item, index) =>
          index === itemIndex ? { ...item, quantity: item.quantity + 1 } : item
        );
        toast.info(`${product.name} quantity increased`);
      } else {
        updatedItems = [...prevItems, { ...product, quantity: 1 }];
        toast.success(`${product.name} added to cart`);
      }

      return updatedItems;
    });
  };

  return (
    <Router>
      <Header />
      <div className="container mx-auto px-2">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                data={data}
                setCartItems={setCartItems}
                handleAddToCart={handleAddToCart}
              />
            }
          />
          <Route path="/cart" element={<CartPage cartItems={cartItems} />} />
          <Route
            path="/product/:id"
            element={
              <ProductDetails data={data} handleAddToCart={handleAddToCart} />
            }
          />
        </Routes>
        <Notification />
      </div>
      <Footer />
    </Router>
  );
}

export default App;
