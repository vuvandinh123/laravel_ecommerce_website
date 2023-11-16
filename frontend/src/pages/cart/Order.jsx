import PropTypes from "prop-types";
import shiping from "../../../public/shiping.svg";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Order = ({totalPrice,amount,handleClickCheckout}) => {
  const discount = 5000;
  const discountAmount = 3;
  const [coupon, setCoupon] = useState("");
  const [mes, setMes] = useState("");
  const [dataCoupon, setDataCoupon] = useState(null);
  const [shipping, setShipping] = useState([]);
  const [priceShipping, setPriceShipping] = useState(null);
  const [total,setTotal] = useState(totalPrice);
  useEffect(()=>{
    let s = priceShipping ? totalPrice + Number(priceShipping) : totalPrice
    if(dataCoupon){
      s = s - (s * dataCoupon.discount / 100)
    }
    setTotal(s);
  },[priceShipping,dataCoupon,totalPrice])
  useEffect(() => {
    const fetch = async () => {
      // const respone = await shippingApi.getAll();
      // setShipping(respone.data);
    };
    fetch();
  }, []);
  const hanldeSubmitCoupon = (e) => {
    e.preventDefault();
    try {
      const fetch = async () => {
        // const res = await couponApi.get(coupon);
        // if (res.data) {
        //   setDataCoupon(res.data);
        //   toast.success("Add coupon success!");
        //   setMes("");
        // } else {
        //   setMes("Incorrect discount code");
        // }
      };
      if (coupon != "") {
        fetch();
      }
    } catch (e) {
      console.error("error:");
    }
  };

  
  return (
    <>
      <div className="py-5 mt-3 px-5  ">
        <div className=" relative">
          <div
            style={{
              width:
                (totalPrice / discount) * 100 >= 100
                  ? "100%"
                  : (totalPrice / discount) * 100 + "%",
            }}
            className={`ship h-[6px]  rounded-md bg-red-500`}
          ></div>
          <span className="absolute right-0 -top-[10px] flex items-center justify-center z-20  w-7 h-7 bg-red-500 rounded-full ">
            <img src={shiping} alt="" />
          </span>
        </div>
        <p className="mt-5 text-[12px]">
          {discount - totalPrice <= 0 ? (
            <>{`Congratulations! You've got`} </>
          ) : (
            <>Spend ${(discount - totalPrice).toFixed(2)} more and get</>
          )}
          <span className="text-red-600"> Free Shipping!</span>{" "}
        </p>
        <h4 className="uppercase font-bold mt-5  pb-2">Cart totals</h4>
        <div>
          <div className="flex justify-between border-y py-4">
            <p className="text-base ">Subtotal</p>
            <p className="font-bold  text-base">${totalPrice.toFixed(2)}</p>
          </div>
        </div>

        <div className="border-b py-5">
          <p className="uppercase text-sm font-bold">
            COUPON{" "}
            <span className="ms-1 text-gray-600 lowercase font-thin">
              (Options)
            </span>
          </p>
          <small>Coupon code will work on checkout page.</small>
          <div className="mt-5">
            <form onSubmit={hanldeSubmitCoupon} action="" method="post">
              <input
                type="text"
                onChange={(e) => {setCoupon(e.target.value) ; setMes("")}}
                className={`rounded-full ${
                  mes != "" ? "!border-red-500" : ""
                } focus:bg-white focus:border-blue-500 block w-full px-5 border outline-none mt-3 py-3 bg-[#F1F5F6]`}
                placeholder="Coupon code"
              />
              <span className="text-red-500 text-[12px] pl-3 inline-block mt-2">
                {mes != "" && mes}
              </span>
              <button className="bg-red-500 w-full px-3 py-2 rounded-full text-white">
                {" "}
                Save
              </button>
            </form>
          </div>
        </div>
        <div className="border-b py-5">
          <p className="uppercase font-bold">SHIPPING:</p>
          <div className="mt-5">
            {shipping.map((item) => (
              <div key={item.id} className="mb-2">
                <label
                  htmlFor={item.name}
                  className="border capitalize cursor-pointer rounded-md px-4 py-3 justify-between flex items-center gap-4"
                >
                  <div className="flex items-center gap-2">
                    <input
                      onChange={(e) => {
                        if (totalPrice < discount) {
                          setPriceShipping(e.target.value);
                        }
                      }}
                      type="radio"
                      value={item.price}
                      name="shipping"
                      id={item.name}
                    />
                    <span>{item.type}</span>
                  </div>
                  <span>${item.price}</span>
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className="border-b flex flex-col gap-3 py-5">
          {dataCoupon && (
            <p className="flex items-center gap-3">
              <svg
                width="12"
                aria-hidden="true"
                focusable="false"
                role="presentation"
                className="icon icon-discount color-foreground-"
                viewBox="0 0 12 12"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M7 0h3a2 2 0 012 2v3a1 1 0 01-.3.7l-6 6a1 1 0 01-1.4 0l-4-4a1 1 0 010-1.4l6-6A1 1 0 017 0zm2 2a1 1 0 102 0 1 1 0 00-2 0z"
                  fill="currentColor"
                ></path>
              </svg>
              {dataCoupon.description}
              <span className="text-red-400">(-{dataCoupon.discount})% </span>
            </p>
          )}
          {totalPrice >= discount && (
            <p className="flex items-center gap-3">
              <svg
                width="12"
                aria-hidden="true"
                focusable="false"
                role="presentation"
                className="icon icon-discount color-foreground-"
                viewBox="0 0 12 12"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M7 0h3a2 2 0 012 2v3a1 1 0 01-.3.7l-6 6a1 1 0 01-1.4 0l-4-4a1 1 0 010-1.4l6-6A1 1 0 017 0zm2 2a1 1 0 102 0 1 1 0 00-2 0z"
                  fill="currentColor"
                ></path>
              </svg>
              Free shipping discount (-11)
            </p>
          )}
          {amount >= discountAmount && (
            <p className="flex items-center gap-3">
              <svg
                width="12"
                aria-hidden="true"
                focusable="false"
                role="presentation"
                className="icon icon-discount color-foreground-"
                viewBox="0 0 12 12"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M7 0h3a2 2 0 012 2v3a1 1 0 01-.3.7l-6 6a1 1 0 01-1.4 0l-4-4a1 1 0 010-1.4l6-6A1 1 0 017 0zm2 2a1 1 0 102 0 1 1 0 00-2 0z"
                  fill="currentColor"
                ></path>
              </svg>
              Buy 3 products 5% discount (- 103,71 )
            </p>
          )}
        </div>
        <div className="border-b py-5">
          {priceShipping != null && (
            <div className="flex items-center my-2 justify-between">
              <p className=" capitalize">Shipping :</p>
              <h6 className="capitalize  text-[13px] ">
                {priceShipping == 0 ? "Free" : "$(-" + priceShipping + ")"}
              </h6>
            </div>
          )}
          {dataCoupon != null && (
            <div className="flex items-center my-2 justify-between">
              <p className=" capitalize">Coupon :</p>
              <h6 className="uppercase  text-[13px] text-red-400">
                -${dataCoupon.discount}%
              </h6>
            </div>
          )}
          <div className="flex items-center justify-between">
            <p className="uppercase font-bold">Order totals :</p>
            <h6 className="uppercase font-bold text-[20px] text-red-500">
              ${ total.toFixed(2)}
            </h6>
          </div>
        </div>
        <div className="py-5">
          <p className="text-gray-500 text-[12px] my-3">
            Taxes and shipping calculated at checkout
          </p>
          <div>
            <Link
              to={"/checkout"}
              onClick={(e)=>{handleClickCheckout(e)}}
              className="px-10 py-3 block text-center font-bold bg-blue-500 text-white uppercase rounded-full w-full"
            >
              CHECK OUT
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
Order.propTypes = {
    amount: PropTypes.number,
    totalPrice: PropTypes.number,
    handleClickCheckout: PropTypes.func
}
export default Order;
