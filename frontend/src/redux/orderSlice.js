import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        orderAr: {
            note:"",
            coupon:0,
            shipping:1,
            total:0,
        },
    },
    reducers: {
        setOrder: (state, payload) => {
            return {
                ...state,
                orderAr:payload.payload,
            }
        },
    }
});

export const { setOrder } = cartSlice.actions;
export default cartSlice.reducer;
