import { createSlice, PayloadAction } from "@reduxjs/toolkit"; // creating a slice of reduce store which keep state, reducers, and actions all in one place
import { BasketProps } from "../types";

interface basketState {
  items: BasketProps[];
  total: number;
}

//setup initial state
const initialState: basketState = {
  items: [],
  total: 0,
};

const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<BasketProps>) => {
      const item = { ...action.payload }; // copy of item
      item.price = item.price || 0; // assign to default if there is no price

      const existingItemIndex = state.items.findIndex(
        (i: BasketProps) => i.id === item.id // existing item key
      );

      let newItems;
      if (existingItemIndex !== -1) {
        // if item is already on the list
        const updatedItem: BasketProps = {
          ...state.items[existingItemIndex],
          quantity: (state.items[existingItemIndex].quantity || 0) + 1,
          totalPrice:
            (state.items[existingItemIndex].totalPrice || 0) + item.price,
        };

        // Create a new array with the updated item
        newItems = [
          ...state.items.slice(0, existingItemIndex),
          updatedItem,
          ...state.items.slice(existingItemIndex + 1),
        ];
      } else {
        // if item is not on the list
        const newItem: BasketProps = {
          ...item,
          quantity: 1,
          totalPrice: item.price,
        };

        // Create a new array with the new item
        newItems = [...state.items, newItem];
      }

      // Return the new state with the updated items array and total price
      return {
        ...state,
        items: newItems,
        total: (state.total || 0) + item.price,
      };
    },
    removeItem: (state, action) => {
      const index = action.payload; // removed item index
      const item: BasketProps = state.items[index]; // find the index from state

      if (item && item.quantity !== undefined && item.price !== undefined) {
        if (item.quantity > 1) {
          // If item quantity is more than 1
          item.quantity -= 1; // Decrease quantity by 1
          item.totalPrice = (item.totalPrice || 0) - item.price; // Decrease total price of the item by its unit price
          state.total -= item.price; // Decrease total price in the state by the item's unit price
        } else {
          // If item quantity is 1 or less
          state.total -= item.price; // Decrease total price in the state by the item's price
          state.items.splice(index, 1); // Remove the item from the items array
        }
      }
    },
    calculateTotal: (state) => {
      state.total = state.items.reduce(
        (acc, item) => acc + item.price * (item.quantity ? item.quantity : 1),
        0
      ); //sum up the price of all items in the state.items list
    },
  },
});
export const { addItem, removeItem, calculateTotal } = basketSlice.actions;
export default basketSlice.reducer;
