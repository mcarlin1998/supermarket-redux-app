import React from "react";
import { ProductProps } from "../../types";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../../redux/store";
import { showProductDetails } from "../../redux/productSlice";
import ProductDetail from "../ProductDetail/ProductDetail";

export default function ProductList() {
  const dispatch = useDispatch();

  const productItems: ProductProps[] = useSelector(
    (state: State) => state.products.items
  );

  const productDetail: ProductProps | null = useSelector(
    (state: State) => state.products.productDetails
  );

  function showProductItemDetail(product: ProductProps) {
    dispatch(showProductDetails(product));
  }

  return (
    <div>
      {productItems.length > 0 ? (
        productItems.map((product: ProductProps, index: number) => (
          <figure key={index} onClick={() => showProductItemDetail(product)}>
            <figcaption>
              <h3>{product.name}</h3>
              {/* <p>{product.description}</p> */}
              <p>£{product.price.toFixed(2)}</p>
            </figcaption>
            <button>Add To Basket</button>
          </figure>
        ))
      ) : (
        <p>No products available</p>
      )}
      {productDetail && <ProductDetail />}
    </div>
  );
}
