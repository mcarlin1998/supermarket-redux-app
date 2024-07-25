import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductProps } from "../types";

// Setup initial state
interface ProductState {
  items: ProductProps[];
  total: number;
}

const initialState: ProductState = {
  items: [],
  total: 0,
};

// Set up the slice
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProducts: (state, action: PayloadAction<ProductProps[]>) => {
      state.items = action.payload;
      state.total = action.payload.length;
    },
  },
});

export const { addProducts } = productSlice.actions;

export default productSlice.reducer;
