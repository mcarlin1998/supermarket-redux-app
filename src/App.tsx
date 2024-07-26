import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import { ProductProps, BasketProps } from "./types";
import ProductList from "./components/ProductList/ProductList";
import { addProducts } from "./redux/productSlice";
import { State } from "./redux/store";
import { useDispatch, useSelector } from "react-redux";

export default function App() {
  // const [products, setProducts] = useState<Array<ProductProps>>([]);
  const [error, setError] = useState<string | null>(null);

  const dispatch = useDispatch();

  //Store product data from redux to local variable
  const products: ProductProps[] = useSelector(
    (state: State) => state.products.items
  );
  //Store basketProduct data from redux to local variable
  const basketProducts: BasketProps[] = useSelector(
    (state: State) => state.basket.items
  );

  //Initial fetch api method to  retrieve product data
  async function getSuperMarketProducts() {
    try {
      const res = await fetch(
        "https://s3.eu-west-2.amazonaws.com/techassessment.cognitoedu.org/products.json"
      );
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const products: ProductProps[] = await res.json();
      //dispatches to redux state via ProductSlice
      dispatch(addProducts(products));
    } catch (error) {
      console.error("Error fetching the products:", error);
      setError("Failed to fetch products. Please try again later.");
    }
  }

  //UseEffect hook to call function on initial render
  useEffect(() => {
    getSuperMarketProducts();
  }, [dispatch]);

  return (
    <div className="App">
      <Header />
      <main>
        {products.length > 0 ? <ProductList /> : <p>No products available</p>}
      </main>
    </div>
  );
}
