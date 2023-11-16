import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DeleteCart, qtyCart, setCartList } from "../redux/cartSlice";

export default function useCart() {
    const { cartAr } = useSelector((state) => state.cart);
    const [totalPrice, setToatalPrice] = useState(0);
    const [amount, setAmount] = useState(0);
    const dispatch = useDispatch();
    useEffect(() => {
        if (cartAr.length > 0) {
            localStorage.setItem("cart", JSON.stringify(cartAr));
            let newTotal = 0;
            let newAmount = 0;
            cartAr.forEach((item) => {
                newTotal += item.total;
                newAmount += item.qty;
            });
            setToatalPrice(newTotal);
            setAmount(newAmount);
        }
    }, [cartAr]);
    useEffect(() => {
        if (localStorage.getItem("cart")) {
            const cartList = localStorage.getItem("cart");
            dispatch(setCartList(JSON.parse(cartList)));
        }

    }, [dispatch]);

    const deleteCart = (id) => {
        dispatch(DeleteCart(id));
    };
    const handleQuantityClickPlus = (id, qtyValue) => {
        dispatch(qtyCart({ id, qty: qtyValue + 1 }));
    };
    const handleQuantityClickMinus = (id, qtyValue) => {
        dispatch(qtyCart({ id, qty: qtyValue - 1 }));
    };
    const deleteCartAll = () => {
        dispatch(setCartList([]));
        localStorage.removeItem("cart");
    }
    return {
        deleteCart,
        deleteCartAll,
        handleQuantityClickPlus,
        handleQuantityClickMinus,
        totalPrice,
        amount
    }
}