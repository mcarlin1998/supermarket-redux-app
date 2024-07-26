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
    //reducer method for adding products to redux state
    addProducts: (state, action: PayloadAction<ProductProps[]>) => {
      state.items = action.payload;
      state.total = action.payload.length;
    },
    //Reducer method for setting ProductDetail in state - I think its overkill so I have commented it out and used a local UseState hook instead.
    // showProductDetails: (state, action: PayloadAction<ProductProps>) => {
    //   state.productDetails = action.payload;
    // },
  },
});

export const { addProducts } = productSlice.actions;

export default productSlice.reducer;
