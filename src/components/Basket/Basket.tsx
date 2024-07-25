import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { calculateTotal, removeItem } from "../../redux/basketSlice";
// import { useNavigate } from "react-router-dom";
import BasketItem from "../Basket/components/BasketItem";
import { BasketProps } from "../../types";
import { State } from "../../redux/store";

interface Props {
  onClose: () => void;
}

export default function Basket({ onClose }: Props) {
  const dispatch = useDispatch();
  const basketItems = useSelector((state: State) => state.basket.items);
  const total = useSelector((state: State) => state.basket.total);
  //   const navigate = useNavigate();

  //   const handleCheckout = () => {
  //     navigate("/checkout");
  //   };
  const handleRemoveItem = (index: number) => {
    dispatch(removeItem(index));
    dispatch(calculateTotal());
  };
  return (
    <div className="basket">
      <button className="close-button" onClick={onClose}>
        &times;
      </button>
      <h2>Basket</h2>
      <ul>
        {basketItems.map((item: BasketProps, index: number) => (
          <BasketItem
            key={index}
            item={item}
            onRemove={() => handleRemoveItem(index)}
          />
        ))}
      </ul>
      <div className="total">
        <h3>Total: ${total.toFixed(2)}</h3>
      </div>
      <button
        className="checkout-button"
        //   onClick={handleCheckout}
      >
        Go to Checkout
      </button>
    </div>
  );
}
