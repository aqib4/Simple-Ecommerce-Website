import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CartContext } from "../CartContext";

const SingleProduct = () => {
  const [product, setProduct] = useState({});
  const [productFetched, setProductFetched] = useState(false);

  const params = useParams();
  const navigate = useNavigate();

  const { cartqty, setCartQty } = useContext(CartContext);

  useEffect(() => {
    if (productFetched) {
      return;
    }
    fetch(`https://dummyjson.com/products/${params.id}`)
      .then((response) => {
        return response.json();
      })
      .then((Data) => {
        setProduct(Data);
        setProductFetched(true);
      });
  }, [productFetched]);
  const imageStyle = {
    maxWidth: "600px",
    objectFit: "contain",
    aspectRatio: "6/6",
    backgroundColor: "pink",
  };

  //add to cart functionality
  const addToCart = (id) => {
    const _cartQty = { ...cartqty };
    if (_cartQty.items == {}) {
      _cartQty.items = {};
    }
    if (_cartQty.items[id]) {
      _cartQty.items[id] += 1;
    } else {
      _cartQty.items[id] = 1;
    }
    if (!_cartQty.totalItems) {
      _cartQty.totalItems = 1;
    } else {
      _cartQty.totalItems += 1;
    }

    setCartQty(_cartQty);
  };
  //price increment functionality
  const priceIncrementer = (price, id) => {
    const _cartQty = { ...cartqty };
    const existingQty = _cartQty.items[id];
    const totalPrice = price * existingQty;

    return totalPrice.toFixed(2);
  };

  // show Current quantity of the item
  const getQuantity = (id) => {
    const existingQty = cartqty.items[id];
    return existingQty;
  };

  //quantity decrement functionality
  const decrementQuantity = (id) => {
    const existingQty = getQuantity(id);
    if (existingQty <= 1) {
      return;
    } else {
      const newQuantity = existingQty - 1;
      const _cartQty = { ...cartqty };
      _cartQty.items[id] = newQuantity;
      setCartQty(_cartQty);
    }
  };

  //increment product quantity
  const incrementQuantity = (id) => {
    const _cartQty = { ...cartqty };
    _cartQty.items[id] += 1;
    setCartQty(_cartQty);
  };
  return (
    <>
      <button
        onClick={() => {
          navigate(-1);
        }}
        className=" px-6 py-2 rounded-full text-white font-bold mt-4 bg-pink-400 hover:bg-pink-500"
      >
        Back
      </button>

      <div className="product-Details flex mt-20 w-4/2">
        <div className="gallery">
          <img
            className="rounded-full"
            style={imageStyle}
            src={product.images}
            alt=""
          />
        </div>

        <div className="product-content">
          <h2 className="text-8xl  font-bold mt-4 mb-4">{product.title}</h2>
          <span className="rounded-full bg-pink-100 px-3 py-1 ">
            {product.brand}
          </span>
          <div className="product__Card__bottom flex flex-col gap-10 justify-between items-center mt-4">
            <span className="text-4xl font-bold text-pink-500">
              Rs.{priceIncrementer(product.price, product.id)}
            </span>
            <div className="flex items-center gap-10">
              <div className="quantity-control flex items-center gap-2">
                <button
                  onClick={() => {
                    decrementQuantity(product.id);
                  }}
                  className="qty-decrement bg-pink-500 py-2 px-5  color-white text-2xl rounded-full"
                >
                  -
                </button>
                <span className="qty-value">{getQuantity(product.id)}</span>
                <button
                  onClick={() => {
                    incrementQuantity(product.id);
                  }}
                  className="qty-increment bg-pink-500 py-2 px-5  color-white text-2xl rounded-full"
                >
                  +
                </button>
              </div>

              <div className="cart-actions">
                <button
                  onClick={() => {
                    addToCart(product.id);
                  }}
                  className="add-to-cart bg-pink-500 py-4 px-10  color-white text-2xl rounded-full"
                >
                  Add to Cart
                </button>
              </div>
            </div>

            <div className="  text-2xl flex">
              <h2 className=" mr-5">Tags: </h2>
              <div className="tags flex items-center gap-4">
                <span className="rounded-full bg-pink-100 px-3 py-1 ">
                  Makeup
                </span>
                <span className="rounded-full bg-pink-100 px-3 py-1 ">
                  Beauty
                </span>
                <span className="rounded-full bg-pink-100 px-3 py-1 ">
                  Womens
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleProduct;
