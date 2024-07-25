import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./productSlice"; // Adjust the path if necessary
import basketSlice from "./basketSlice"; // Adjust the path if necessary

const store = configureStore({
  reducer: {
    products: productSlice,
    basket: basketSlice,
  },
});

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
