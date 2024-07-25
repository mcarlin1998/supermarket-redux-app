import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { ProductProps } from "./types";
import { addProducts } from "./redux/productSlice";
import { State } from "./redux/store";
import { useDispatch, useSelector } from "react-redux";
function App() {
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();

  const products: ProductProps[] = useSelector(
    (state: State) => state.products.items
  );

  async function getSuperMarketProducts() {
    try {
      const res = await fetch(
        "https://s3.eu-west-2.amazonaws.com/techassessment.cognitoedu.org/products.json"
      );
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const products: ProductProps[] = await res.json();
      dispatch(addProducts(products));
      // setProducts(products);
    } catch (error) {
      console.error("Error fetching the products:", error);
      setError("Failed to fetch products. Please try again later.");
    }
  }

  useEffect(() => {
    getSuperMarketProducts();
  }, [dispatch]);

  return (
    <div className="App">
      <main>
        {products.length > 0 ? (
          products.map((product, index) => {
            return (
              <figure key={index}>
                <figcaption>
                  <h3>{product.name}</h3>
                  {/* <p>{product.description}</p> */}
                  <p>£{product.price.toFixed(2)}</p>
                </figcaption>
                <button>Add To Basket</button>
              </figure>
            );
          })
        ) : (
          <p>No products available</p>
        )}
      </main>
    </div>
  );
}

export default App;
