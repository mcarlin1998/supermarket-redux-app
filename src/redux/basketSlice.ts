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
      //   const index = action.payload; // removed item index
      //   const item = state.items[index]; // find the index from state
      //   if (item.quantity > 1) {
      //     // if item quantity is more than 1
      //     item.quantity -= 1; // decrease quantity by 1
      //     item.totalPrice -= item.price; //decrease price by one item price
      //     state.total -= item.price; //decrease total price by 1 item price
      //   } else {
      //     state.total -= item.price; // decrease removed item price from state
      //     state.items.splice(index, 1); //Remove the item from the items array in the state using splice
      //   }
    },
    calculateTotal: (state) => {
      //   state.total = state.items.reduce((acc, item) => acc + item.price, 0); //sum up the price of all items in the state.items list
    },
  },
});
export const { addItem, removeItem, calculateTotal } = basketSlice.actions;
export default basketSlice.reducer;
