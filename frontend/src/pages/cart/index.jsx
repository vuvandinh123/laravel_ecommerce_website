import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Order from "./Order";
import CardOrder from "./CardOrder";
import { useCart, useScrollTop } from "../../hooks";
import { toast } from "react-toastify";
const CartPage = () => {
  const { cartAr } = useSelector((state) => state.cart);
  useScrollTop();
  const [checkout, setCheckout] = useState({
    coupon: 0,
    shipping: 1,
    note: "",
    total: 0,
  });
  const { totalPrice, amount, deleteCartAll } = useCart();
  useEffect(() => {
    if (cartAr.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cartAr));
    }
  }, [cartAr]);
  const navigate = useNavigate();

  const handleClickCheckout = (e) => {
    e.preventDefault();

    // dispatch(
    //   setOrder({
    //     ...checkout,
    //     coupon: dataCoupon ? dataCoupon.id : 0,
    //     shipping: priceShipping,
    //     total: totalCart2,
    //   })
    // );
    const token = JSON.parse(sessionStorage.getItem("token"));
    if (!token) {
      sessionStorage.setItem("url", '/checkout');
      toast.warning("Bạn cần đăng nhập để tiếp tục");
      navigate("/login");

    } else {
      navigate("/checkout");
    }
  };
  return (
    <div className="">
      <div className=" h-36 text-black flex justify-center items-center flex-col gap-y-3">
        <h2 className="text-4xl font-semibold">Your Cart</h2>
        <div>
          <ul className="flex items-center gap-x-2">
            <li>
              <Link to={"/"} className="text-gray-500 hover:underline" href="">
                Home
              </Link>
            </li>
            <li>/</li>
            <li>Cart</li>
          </ul>
        </div>
      </div>
      <div className="py-3 max-w-[1410px] px-5 mx-auto">
        <div className="flex gap-10">
          <div className="basis-3/4">
            <div className="py-5 border-b border-t flex justify-between items-center">
              <div className="uppercase basis-2/5 font-bold">Product</div>
              <div className="uppercase basis-1/5 font-bold text-center">
                QUANTITY
              </div>
              <div className="uppercase basis-1/5 font-bold text-center">
                SUBTOTAL
              </div>
              <div className="uppercase  font-bold"></div>
            </div>
            <CardOrder />
            <div className="py-5 border-b border-t flex justify-between items-center">
              <Link
                to={"/categories/all"}
                className="px-10 py-3 bg-blue-500 text-white uppercase rounded-full"
              >
                Continue shopping
              </Link>
              <button
                onClick={deleteCartAll}
                className="px-10 py-3 bg-blue-500 text-white uppercase rounded-full"
              >
                DELETE ALL
              </button>
            </div>
            <div className="mt-20">
              <div className="flex flex-col gap-3">
                <label htmlFor="" className="uppercase font-bold text-base">
                  ADD ORDER NOTE
                </label>
                <textarea
                  placeholder="How can we help you ?"
                  name=""
                  onChange={(e) =>
                    setCheckout({ ...checkout, note: e.target.value })
                  }
                  className="rounded-lg outline-none border p-5 focus:border-blue-500"
                  id=""
                  cols="30"
                  rows="5"
                ></textarea>
              </div>
            </div>
          </div>
          <div className="basis-1/4 rounded-xl border-2 border-blue-500 p-2">
            <Order
              totalPrice={totalPrice}
              amount={amount}
              handleClickCheckout={handleClickCheckout}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
