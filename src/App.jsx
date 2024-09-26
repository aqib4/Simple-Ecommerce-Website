import { Routes, Route, json } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Navigation from "./components/Navigation";
import SingleProduct from "./pages/SingleProduct";
import { CartContext } from "./CartContext";
import { useEffect, useState } from "react";

function App() {
  const [cartqty, setCartQty] = useState(() => {
    // Initialize the cart from localStorage on first render
    const cart = JSON.parse(window.localStorage.getItem("cart")) || {
      items: {},
      totalItems: 0,
    };
    return cart;
  });

  // Save cart to localStorage whenever cartqty state changes
  useEffect(() => {
    if (cartqty) {
      window.localStorage.setItem("cart", JSON.stringify(cartqty));
    }
  }, [cartqty]);

  return (
    <>
      <CartContext.Provider
        value={{ cartqty: cartqty, setCartQty: setCartQty }}
      >
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/SingleProduct/:id" element={<SingleProduct />} />
        </Routes>
      </CartContext.Provider>
    </>
  );
}

export default App;
