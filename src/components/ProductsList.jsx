import { useEffect, useState, useContext } from "react";
import Productcard from "./productCard";

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [loadItems, setLoadItems] = useState(10);

  useEffect(() => {
    fetch(`https://dummyjson.com/products?limit=${loadItems}`)
      .then((response) => {
        return response.json();
      })
      .then((productsData) => {
        setProducts(productsData.products);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, [loadItems]);
  if (!products) {
    return <h2>Loading...</h2>;
  }
  return (
    <>
      <h2 className="text-lg font-bold ">Products </h2>
      <div className="container grid grid-cols-4 gap-5">
        {products.map((product) => (
          <Productcard product={product} key={product.id} />
        ))}
      </div>
      {products ? (
        <button
          value={loadItems}
          onClick={() => setLoadItems((prevLoadItems) => prevLoadItems + 10)}
          className="mt-20 rounded-full bg-pink-400 hover:bg-pink-500 px-6 py-2 text-white font-bold"
        >
          Load More
        </button>
      ) : (
        " "
      )}
    </>
  );
};

export default ProductsList;
