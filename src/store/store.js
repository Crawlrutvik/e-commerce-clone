import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productSlice";
import categoryReducer from "./categorySlice";
import modalReducer from "./modalSlice";
const store = configureStore({
  reducer: {
    product: productReducer,
    category: categoryReducer,
    modal: modalReducer,
  },
});

export default store;
