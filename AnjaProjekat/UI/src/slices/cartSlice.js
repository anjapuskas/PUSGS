import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import { AddProduct, GetAllProducts } from "services/ProductService";
import { Home, Login, Profile, ProfileImage, Register } from "services/UserService";

const initialState = {
  products : localStorage.getItem("products") ? JSON.parse(localStorage.getItem("products")) : [],
  amount : localStorage.getItem("amount") ? JSON.parse(localStorage.getItem("amount")) : 0,
  price : localStorage.getItem("price") ? JSON.parse(localStorage.getItem("price")) : 0
};

  const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = state.products.find((item) => item.id == action.payload.id)
            if(item) {
                item.amount++;
                state.amount++;
                state.price+=item.price;
            } else {
                const newItem = {
                    id: action.payload.id,
                    name: action.payload.name,
                    price: action.payload.price,
                    description: action.payload.description,
                    amount: 1
                };
                state.products.push(newItem);
                state.amount++;
                state.price+=newItem.price;
            }
            localStorage.setItem("products", JSON.stringify(state.products));
            localStorage.setItem("amount", state.amount.toString())
            localStorage.setItem("price", state.price.toString())
          },
          amountChange: (state, action) => {
            const item = state.products.find((item) => item.id == action.payload.id)
            if(item) {
                item.amount = item.amount + action.payload.increment;
                state.price=state.price + item.price*action.payload.increment;
                state.amount = state.amount + action.payload.increment;
                if(state.amount == 0) {
                  state.products = state.products.filter(i => i.id !== action.payload.id);
                }
            } 
            localStorage.setItem("products", JSON.stringify(state.products));
            localStorage.setItem("amount", state.amount.toString())
            localStorage.setItem("price", state.price.toString())
          },
          removeFromCart: (state, action) => {
            state.products = [];
            state.price = 0;
            state.amount = 0;
          
            localStorage.removeItem("products");
            localStorage.removeItem("amount");
            localStorage.removeItem("price")
          }
    }
    
});

export const { addToCart, amountChange, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;