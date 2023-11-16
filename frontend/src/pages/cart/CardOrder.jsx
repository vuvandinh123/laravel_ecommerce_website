import { Link } from "react-router-dom";
import { AppURL } from "../../api/AppURL";
import { useSelector } from "react-redux";
import plus from "../../../public/plus.svg";
import minus from "../../../public/minus.svg";
import { useCart } from "../../hooks";
import formatPrice from "../../utils/formathPrice";
const CardOrder = () => {
  const { cartAr } = useSelector((state) => state.cart);
  const { deleteCart, handleQuantityClickPlus, handleQuantityClickMinus } =
    useCart();
  return (
    <>
      {cartAr.length > 0 &&
        cartAr.map((item) => {
          return (
            <>
              <div className="py-5 border-b border-t flex justify-between items-center">
                <div className=" basis-2/5 flex gap-x-3">
                  <div className="w-[100px] overflow-hidden">
                    <Link to={`/products/${item.slug}`}>
                      <img
                        className="w-full hover:scale-110 transition-all duration-200"
                        src={AppURL.ImageUrl + item.image}
                        alt=""
                      />
                    </Link>
                    
                  </div>

                  <div>
                    <h5 className="text-base mt-3">
                      <Link to={`/products/${item.slug}`} className="hover:text-blue-500">
                        Wireless Controller Series Mac/Windows
                      </Link>{" "}
                    </h5>
                    <h6 className="font-bold text-[14px] tracking-wider text-red-500 mt-3 ">
                      {formatPrice(item.price)}
                    </h6>
                  </div>
                </div>
                <div className=" basis-1/5 justify-center font-bold flex items-center">
                  <button
                    onClick={() => handleQuantityClickMinus(item.id, item.qty)}
                    className="px-2 group py-1  "
                  >
                    <img src={minus} alt="" />
                  </button>
                  <input
                    value={item.qty}
                    className="outline-none  py-1 w-14   text-center"
                    type="text"
                  />
                  <button
                    onClick={() => handleQuantityClickPlus(item.id, item.qty)}
                    className=" px-2 py-1  group"
                  >
                    <img src={plus} alt="" />
                  </button>
                </div>
                <div className=" basis-1/5 font-bold text-center">
                  {formatPrice(item.total)}
                </div>
                <div className="  font-bold">
                  <span
                    onClick={() => deleteCart(item.id)}
                    className="cursor-pointer hover:text-red-500 transition-all"
                  >
                    <i className="fa-regular fa-trash-can"></i>
                  </span>
                </div>
              </div>
            </>
          );
        })}
    </>
  );
};

export default CardOrder;
