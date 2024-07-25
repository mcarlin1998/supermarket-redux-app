import { useSelector } from "react-redux";
import { State } from "../../redux/store";
import { ProductProps } from "../../types";

export default function ProductDetail() {
  const productDetail: ProductProps | null = useSelector(
    (state: State) => state.products.productDetails
  );
  return (
    <div>
      <figure>
        <figcaption>
          <h3>{productDetail?.name}</h3>
          <p>{productDetail?.description}</p>
          <p>£{productDetail?.price.toFixed(2)}</p>
        </figcaption>
      </figure>
    </div>
  );
}
