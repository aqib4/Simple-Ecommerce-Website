import { Link } from "react-router-dom";
import { CartContext } from "../CartContext";
import { useContext, useState } from "react";

const Productcard = ({ product }) => {
  const { cartqty, setCartQty } = useContext(CartContext);
  const [isAdded, setIsAdded] = useState(false);

  // Destructure product as an object
  const { images, title, brand, price, id } = product;
  const limitedTitle =
    title.split(" ").slice(0, 3).join(" ") +
    (title.split(" ").length > 3 ? " ..." : "");

  //setting up image css using object
  const imageStyle = {
    maxWidth: "250px",
    objectFit: "contain",
    aspectRatio: "6/6",
  };

  //setting up the cart qty
  const addToCart = (e, product) => {
    e.preventDefault();
    const _cartqty = { ...cartqty };
    if (!_cartqty.items) {
      _cartqty.items = {};
    }
    if (_cartqty.items[product.id]) {
      _cartqty.items[product.id] += 1;
    } else {
      _cartqty.items[product.id] = 1;
    }

    if (!_cartqty.totalItems) {
      _cartqty.totalItems = 1;
    } else {
      _cartqty.totalItems += 1;
    }

    setCartQty(_cartqty);

    //setting background button to green after item added to cart
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  return (
    <>
      <Link to={`/SingleProduct/${id}`}>
        <div className="product__Card shadow-[0_35px_60px_-5px_rgba(0,0,0,0.1)] rounded px-4 py-4">
          <img
            className="items-center justify-center"
            style={imageStyle}
            src={images[0]}
            alt={title}
          />
          <h2 className="text-lg font-bold mt-4 mb-4">{limitedTitle}</h2>

          <span className="rounded-full bg-pink-100 px-3 py-1 ">{brand}</span>
          <div className="product__Card__bottom flex justify-between items-center mt-4">
            <span className="text-lg font-bold text-pink-500">Rs.{price}</span>
            <button
              onClick={(e) => addToCart(e, product)}
              className={`${
                isAdded ? "bg-black " : "bg-pink-400"
              }  px-4 py-1 rounded-full text-white font-bold  bg-pink-400 hover:bg-black`}
            >
              {isAdded ? "Added" : "Add"}
            </button>
          </div>
        </div>
      </Link>
    </>
  );
};

export default Productcard;
