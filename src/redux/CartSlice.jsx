import { createSlice } from "@reduxjs/toolkit";


const initialState =JSON.parse(localStorage.getItem('cart')) ??  [];
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
   addtocart (state, action) {
      state.push(action.payload);
    },
    deletefromcart(state, action) {
      return state.filter((item) => item.id !== action.payload.id);
    },
  },
});

export const { addtocart, deletefromcart } = cartSlice.actions;
export default cartSlice.reducer;
