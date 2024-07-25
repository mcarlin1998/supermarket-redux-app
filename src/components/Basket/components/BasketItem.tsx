import React from "react";
import { BasketProps } from "../../../types";

interface BasketItemProps {
  item: BasketProps;
  onRemove: () => void;
}

export default function BasketItem({ item, onRemove }: BasketItemProps) {
  const totalPrice = item.totalPrice !== undefined ? item.totalPrice : 0;
  return (
    <li>
      <div className="item-details">
        <h3>{item.name}</h3>
        <p>
          <strong>{item.name}</strong>
        </p>
        <p>{item.description}</p>
        <p>Price: ${item.price.toFixed(2)}</p>
        <p className="item-quantity">Quantity: {item.quantity}</p>
        <p>Total Price: ${totalPrice.toFixed(2)}</p>
      </div>
      <button className="remove-button" onClick={onRemove}>
        Remove
      </button>
    </li>
  );
}
