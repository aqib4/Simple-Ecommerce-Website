import { useContext, useEffect, useState } from "react";
import { CartContext } from "../CartContext";

const Cart = () => {
  const { cartqty, setCartQty } = useContext(CartContext);
  const [cartProducts, setCartProducts] = useState([]);
  const [priceFetched, setPriceFetched] = useState(false); // Prevent fetching again

  // 1. Fetch product details only on initial page load.
  useEffect(() => {
    if (
      !cartqty ||
      !cartqty.items ||
      Object.keys(cartqty.items).length === 0 ||
      priceFetched
    ) {
      return; // Exit if no cart items or if data already fetched
    }

    const productIds = Object.keys(cartqty.items);

    // Fetch product details
    Promise.all(
      productIds.map((id) =>
        fetch(`https://dummyjson.com/products/${id}`).then((res) => res.json())
      )
    )
      .then((products) => {
        setCartProducts(products);
        setPriceFetched(true); // Prevent fetching again
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, [cartqty, priceFetched]);

  // 2. Get quantity of individual item
  const getQty = (productId) => {
    return cartqty.items[productId] || 0;
  };

  // 3. Increment item quantity without re-fetching
  const qtyIncrementer = (id) => {
    const existingQty = getQty(id);
    const updatedCart = { ...cartqty };
    updatedCart.items[id] = existingQty + 1;
    updatedCart.totalItems += 1;
    setCartQty(updatedCart);
  };

  // 4. Decrement item quantity without re-fetching
  const decrementQty = (id) => {
    const existingQty = getQty(id);
    if (existingQty <= 1) return; // Prevent going below 1

    const updatedCart = { ...cartqty };
    updatedCart.items[id] = existingQty - 1;
    updatedCart.totalItems -= 1;
    setCartQty(updatedCart);
  };

  // 5. Calculate sum of individual items
  const getSum = (id, price) => {
    const sum = getQty(id) * price;
    return sum.toFixed(2);
  };

  // 6. Calculate the grand total
  const calculateGrandTotal = () => {
    return cartProducts
      .reduce((total, product) => {
        return total + getQty(product.id) * product.price;
      }, 0)
      .toFixed(2);
  };

  // 7. Delete item from cart without re-fetching
  const deleteCartProduct = (id) => {
    const _cartqty = { ...cartqty };
    const productQty = _cartqty.items[id];
    _cartqty.totalItems -= productQty;

    // Delete the item from the cartqty.items object
    delete _cartqty.items[id];

    // Update the cartProducts by filtering out the deleted product
    setCartProducts(cartProducts.filter((product) => product.id !== id));

    // Update the cartQty state to reflect the changes
    setCartQty(_cartqty);
  };

  const CheckoutOrder = () => {
    window.alert("Order Placed Successfully!");
    setCartProducts([]);
    setCartQty([]);
  };
  return (
    <>
      <div className="container lg:w-3/4 w-full mx-auto">
        <h2>Cart Items</h2>

        {/* Conditional Rendering: Show message if cart is empty */}
        {!cartProducts || cartProducts.length === 0 ? (
          <p>Your Cart is Empty!</p>
        ) : (
          <ul>
            {cartProducts.map((cartProduct) => (
              <li key={cartProduct.id}>
                <div className="flex items-center justify-around mt-12">
                  <img
                    className="flex-none mr-10"
                    style={{ height: 45 }}
                    src={cartProduct.images[0]}
                    alt={cartProduct.title}
                  />
                  <h2 className="flex-1 font-bold">{cartProduct.title}</h2>
                  <div className="Cart-cal flex-1">
                    <button
                      onClick={() => decrementQty(cartProduct.id)}
                      className="flex-none text-Xlg font-bold px-4 py-0 bg-pink-400 rounded-full m-2 hover:bg-black hover:text-white"
                    >
                      -
                    </button>
                    <button>{getQty(cartProduct.id)}</button>
                    <button
                      onClick={() => qtyIncrementer(cartProduct.id)}
                      className="flex-none text-Xlg font-bold px-4 py-0 bg-pink-400 rounded-full m-2 hover:bg-black hover:text-white"
                    >
                      +
                    </button>
                  </div>
                  <span className="flex-1 font-bold">
                    {getSum(cartProduct.id, cartProduct.price)}
                  </span>
                  <button
                    onClick={() => deleteCartProduct(cartProduct.id)}
                    className="flex-none font-bold px-6 py-2 bg-pink-400 rounded-full m-2 hover:bg-black hover:text-white"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        <hr className="mt-10 mb-10" />

        {/* Grand Total */}
        <div className="flex flex-col">
          <span className="font-bold text-lg">
            Grand Total: Pkr {calculateGrandTotal()}
          </span>
          <button
            onClick={() => {
              CheckoutOrder();
            }}
            className="font-bold px-6 py-2 bg-pink-400 rounded-full m-2 hover:bg-black hover:text-white"
          >
            Order Now
          </button>
        </div>
      </div>
    </>
  );
};

export default Cart;
