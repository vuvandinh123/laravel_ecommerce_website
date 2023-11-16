import { configureStore,combineReducers } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import orderSlice from "./orderSlice";


const reducer = combineReducers({
    cart: cartSlice,
    checkout:orderSlice
})
const store = configureStore({
    reducer,
}) 
export default store