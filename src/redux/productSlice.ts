import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductProps } from "../types";

// Setup initial state
interface ProductState {
  items: ProductProps[];
  total: number;
  productDetails: ProductProps | null;
}

const initialState: ProductState = {
  items: [],
  total: 0,
  productDetails: null,
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
    showProductDetails: (state, action: PayloadAction<ProductProps>) => {
      state.productDetails = action.payload;
    },
  },
});

export const { addProducts, showProductDetails } = productSlice.actions;

export default productSlice.reducer;
