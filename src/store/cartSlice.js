import { createSlice } from "@reduxjs/toolkit";

const fetchFromLocalStorage = () => {
  let cart = localStorage.getItem("cart");
  if (cart) {
    return JSON.parse(localStorage.getItem("cart"));
  } else {
    return [];
  }
};

const storeInLocalStorege = (data) => {
  localStorage.setItem("cart", JSON.stringify(data));
};

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    data: fetchFromLocalStorage(),
    totalItems: 0,
    totalAmount: 0,
    deliveryCharge: 1000,
  },

  reducers: {
    addToCard(state, action) {
      const tempItem = state.data.find((item) => item.id === action.payload.id);
      console.log("tempItem: ", tempItem);
      if (tempItem) {
        const tempCart = state.data.map((item) => {
          console.log("item: ", item);
          if (item.id === action.payload.id) {
            let newQty = item.quantity + action.payload.quantity;
            let newTotalPrice = newQty * item.price;
            return {
              ...item,
              quantity: newQty,
              totalPrice: newTotalPrice,
            };
          } else {
            return item;
          }
        });
        state.data = tempCart;
        storeInLocalStorege(state.datadata);
      } else {
        state.data.push(action.payload);
        storeInLocalStorege(state.data);
      }
    },
    removeFromCart(state, action) {
      const tempCart = state.data.filter((item) => item.id !== action.payload);
    },
  },
});
