import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { calculateTotal, removeItem } from "../../redux/basketSlice";
// import { useNavigate } from "react-router-dom";
import BasketItem from "../Basket/components/BasketItem";
import { BasketProps } from "../../types";
import { State } from "../../redux/store";
import styled from "styled-components";

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
  // Main basket container
  const Basket = styled.div`
    position: fixed;
    right: 20px;
    top: 70px;
    width: 320px;
    background-color: #f8f8f8; /* Light grey background color */
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); /* More prominent box shadow */
    border-radius: 8px;
    padding: 16px;
    z-index: 1000;
    overflow: hidden;
    font-family: Arial, sans-serif;
  `;

  // Close button
  const CloseButton = styled.button`
    background-color: transparent;
    color: #000;
    border: none;
    font-size: 1.5em;
    cursor: pointer;
    position: absolute;
    right: 12px;
    top: 12px;

    &:hover {
      color: #e3120b;
    }
  `;

  // Header
  const Header = styled.h2`
    margin-top: 0;
    font-size: 1.5em;
    border-bottom: 1px solid #e0e0e0;
    padding-bottom: 8px;
    color: #333;
  `;

  // List container
  const List = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
    max-height: 400px;
    overflow-y: auto;
  `;

  // List item
  const ListItem = styled.li`
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
    border-bottom: 1px solid #e0e0e0;
    align-items: center;

    &:last-child {
      border-bottom: none;
    }
  `;

  // Item details
  const ItemDetails = styled.div`
    flex: 1;
    padding-right: 8px;
  `;

  // Item quantity
  const ItemQuantity = styled.div`
    font-size: 0.9em;
    color: #888;
  `;

  // Remove button
  const RemoveButton = styled.button`
    background-color: #e3120b;
    color: white;
    border: none;
    padding: 6px 10px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.9em;

    &:hover {
      background-color: #c10e0a;
    }
  `;

  // Total section
  const Total = styled.div`
    font-size: 1.2em;
    text-align: right;
    padding-top: 16px;
    color: #333;
    font-weight: bold;
  `;

  // Checkout button
  const CheckoutButton = styled.button`
    background-color: #1a96f3;
    color: white;
    border: none;
    padding: 10px 16px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1em;
    width: 100%;
    margin-top: 16px;

    &:hover {
      background-color: #0383e4;
    }
  `;
  return (
    <Basket>
      <CloseButton onClick={onClose}>&times;</CloseButton>
      <Header>Basket</Header>
      <List>
        {basketItems.map((item, index) => (
          <ListItem key={index}>
            <ItemDetails>
              <p>{item.name}</p>
              <p className="item-quantity">Qty: {item.quantity}</p>
            </ItemDetails>
            <div>
              <p>£{item.price}</p>
              <RemoveButton onClick={() => handleRemoveItem(index)}>
                Remove
              </RemoveButton>
            </div>
          </ListItem>
        ))}
      </List>
      <Total>
        <h3>Total: £{total.toFixed(2)}</h3>
      </Total>
      <CheckoutButton>Go to Checkout</CheckoutButton>
    </Basket>
  );
}
