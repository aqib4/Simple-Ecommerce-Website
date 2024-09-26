import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../CartContext";

const Navigation = () => {
  const cartStyle = {
    borderRadius: "50px",
    padding: "4px 14px",
    display: "flex",
  };

  // Use destructuring to get cartqty from CartContext
  const { cartqty } = useContext(CartContext);

  return (
    <>
      <nav className="container mx-auto flex items-center justify-between">
        <Link to="/">
          <img style={{ height: 105 }} src="/img/logo.png" alt="Logo" />
        </Link>
        <ul className="nav-menu flex items-center gap-10">
          <li>
            <Link className={"mr-2 text-600"} to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className={"mr-2 text-600"} to="/products">
              Products
            </Link>
          </li>
          <li>
            <Link to="/cart">
              <div style={cartStyle} className="cart bg-pink-400">
                <span className={"mr-2 text-600 border-2 rounded-full px-2"}>
                  {/* Check if totalItems exists in cartqty and display it */}
                  {cartqty?.totalItems || 0}
                </span>
                <img src="/img/cart.png" alt="Cart" />
              </div>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navigation;
