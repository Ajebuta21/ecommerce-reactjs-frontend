import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast"; // Import toast from React Hot Toast

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: JSON.parse(sessionStorage.getItem("cartItems")) || [],
    totalQuantity: JSON.parse(sessionStorage.getItem("totalQuantity")) || 0,
  },
  reducers: {
    addItemToCart: (state, action) => {
      const item = action.payload;

      if (item.quantity === 0) {
        toast.error("Product is out of stock");
        return;
      }

      const existingItem = state.items.find((i) => i.id === item.id);

      if (existingItem) {
        const newQuantity =
          existingItem.cartQuantity + (item.cartQuantity || 1);

        if (newQuantity > item.quantity) {
          toast.error("Cannot add more than available stock");
        } else {
          existingItem.cartQuantity = newQuantity;
        }
      } else {
        if (item.cartQuantity > item.quantity) {
          toast.error("Cannot add more than available stock");
        } else {
          state.items.push({
            ...item,
            cartQuantity: item.cartQuantity || 1,
          });
        }
      }

      state.totalQuantity = state.items.reduce(
        (total, item) => total + (item.cartQuantity || 0),
        0
      );

      sessionStorage.setItem("cartItems", JSON.stringify(state.items));
      sessionStorage.setItem(
        "totalQuantity",
        JSON.stringify(state.totalQuantity)
      );
    },
    removeItemFromCart: (state, action) => {
      const itemIdToRemove = action.payload;
      state.items = state.items.filter((item) => item.id !== itemIdToRemove);

      state.totalQuantity = state.items.reduce(
        (total, item) => total + (item.cartQuantity || 0),
        0
      );

      sessionStorage.setItem("cartItems", JSON.stringify(state.items));
      sessionStorage.setItem(
        "totalQuantity",
        JSON.stringify(state.totalQuantity)
      );
    },
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;

      sessionStorage.removeItem("cartItems");
      sessionStorage.removeItem("totalQuantity");
    },
    increaseItemQuantity: (state, action) => {
      const itemId = action.payload;
      const itemToIncrease = state.items.find((item) => item.id === itemId);

      if (itemToIncrease) {
        if (itemToIncrease.cartQuantity < itemToIncrease.quantity) {
          itemToIncrease.cartQuantity += 1;
          state.totalQuantity += 1;
        } else {
          toast.error("Cannot add more than available stock");
        }
      }

      sessionStorage.setItem("cartItems", JSON.stringify(state.items));
      sessionStorage.setItem(
        "totalQuantity",
        JSON.stringify(state.totalQuantity)
      );
    },
    decreaseItemQuantity: (state, action) => {
      const itemId = action.payload;
      const itemToDecrease = state.items.find((item) => item.id === itemId);

      if (itemToDecrease && itemToDecrease.cartQuantity > 1) {
        itemToDecrease.cartQuantity -= 1;
        state.totalQuantity -= 1;
      }

      sessionStorage.setItem("cartItems", JSON.stringify(state.items));
      sessionStorage.setItem(
        "totalQuantity",
        JSON.stringify(state.totalQuantity)
      );
    },
  },
});

export const {
  addItemToCart,
  removeItemFromCart,
  clearCart,
  increaseItemQuantity,
  decreaseItemQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;
