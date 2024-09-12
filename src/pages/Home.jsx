import Cart from "../components/layout/Cart";

const Home = ({ data, setCartItems, handleAddToCart }) => {
  return (
    <div className="my-14 grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {data.map((product) => (
        <Cart
          key={product.id}
          product={product}
          setCartItems={setCartItems}
          handleAddToCart={handleAddToCart}
        />
      ))}
    </div>
  );
};

export default Home;
