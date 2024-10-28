import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../features/userSlice";
import productsSlice from "../features/productsSlice";
import categorySlice from "../features/categorySlice";
import cartSlice from "../features/cartSlice";
import regionSlice from "../features/regionSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    products: productsSlice,
    category: categorySlice,
    cart: cartSlice,
    region: regionSlice,
  },
});

export default store;
