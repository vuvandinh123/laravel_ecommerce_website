import { BsShield } from "react-icons/bs";
import { LiaRulerHorizontalSolid } from "react-icons/lia";
import { IoColorPaletteOutline } from "react-icons/io5";
import { HiOutlineMail } from "react-icons/hi";
import { useEffect, useRef } from "react";
import { GiTakeMyMoney } from "react-icons/gi";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FiHeart, FiLayers } from "react-icons/fi";
import { AiOutlineShareAlt } from "react-icons/ai";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { AppURL } from "../../api/AppURL";
import { Link, useNavigate, useParams } from "react-router-dom";
import Detail from "./Detail";
import Recomended from "./Recomended";
import Recently from "./Recently";
import formatPrice from "../../utils/formathPrice";
import { useDispatch } from "react-redux";
import { byToCart } from "../../redux/cartSlice";
import Skeleton from "react-loading-skeleton";
import { useGetSlugProduct } from "../../hooks";
const ProductDetail = () => {
  const { slug } = useParams();
  const imageRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, src, setSrc } = useGetSlugProduct(slug);
  useEffect(() => {
    window.scrollTo(0, 200);
  }, [slug]);
  const handleClickToCart = () => {
    const newCart = {
      name: data.name,
      price: data.price,
      id: data.id,
      image: data?.images[0].image_url,
      slug: data.slug,
    };
    dispatch(byToCart(newCart));
    navigate("/cart");
  };
  const handleClickImage = (e) => {
    const src = e.target.src;
    setSrc(src);
  };

  return (
    <section className="bg-[#F1F5F6]">
      <div className="max-w-[1410px] relative px-5 py-5 mx-auto ">
        <div>
          <ul className="flex items-center gap-3">
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li>/</li>
            <li>
              <span>{data?.name}</span>
            </li>
          </ul>
        </div>
        <div className="bg-white p-5 mt-5">
          <div className="flex">
            <div className="basis-1/2 relative">
              <div className="flex gap-4 sticky top-10  p-5">
                <div className="relative w-full overflow-hidden">
                  {data.images ? (
                    <Zoom>
                      <img
                        className="w-full origin-center object-cover h-full"
                        ref={imageRef}
                        src={src}
                        alt=""
                      />
                    </Zoom>
                  ) : (
                    <Skeleton width={"95%"} height={"500px"} />
                  )}
                </div>
                <div className="mt-16">
                  <ul className="flex flex-col gap-2">
                    {data.images ? (
                      data?.images?.map((item) => (
                        <li
                          key={item.id}
                          className={`border rounded-md p-[1px] overflow-hidden border-gray-200 cursor-pointer ${
                            AppURL.ImageUrl + item.image_url === src
                              ? "!border-blue-500"
                              : ""
                          }`}
                        >
                          <img
                            onClick={handleClickImage}
                            className="w-[70px]"
                            src={AppURL.ImageUrl + item.image_url}
                            alt=""
                          />
                        </li>
                      ))
                    ) : (
                      <Skeleton width={"70px"} height={"70px"} />
                    )}
                  </ul>
                </div>
              </div>
            </div>
            <div className="basis-1/2">
              <div className="mt-16">
                <h1 className="text-2xl my-2">{
                data?.name ? data?.name : <Skeleton width={"70%"} height={"25px"} />
                
                }</h1>
                <div className="flex border-b items-center gap-3 py-3 pb-6">
                  <div className="flex items-center gapx-3 text-yellow-500">
                    {Array(5)
                      .fill(0)
                      .map((item, index) => (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          key={index}
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                  </div>
                  <span>/</span>
                  <span>1 Reviews</span>
                  <span>/</span>
                  <span> Write a review</span>
                </div>
                <h3 className="text-red-500 text-3xl mt-5 font-semibold">
                  {data?.price && formatPrice(data?.price)}
                </h3>
                <ul className="list-disc text-[13px] p-3 leading-7 text-gray-500">
                  <li>Screen Size 10.9 inch</li>
                  <li>Operating System iOS 14.0</li>
                  <li>Product Length 9.74 inch</li>
                </ul>
                <div className="border mt-3  bg-[#F9F2F2] flex justify-between items-center border-red-400 rounded-md p-3">
                  <div className="text-red-500 font-bold">
                    Hurry up! Sale ends in:
                  </div>
                  <div className="flex items-center gap-1 text-white  ">
                    <span className="bg-[#DD3327] px-4 py-1 text-[10px]">
                      <span className="text-lg font-bold">12</span> Days
                    </span>
                    <span className="bg-[#DD3327] px-4 py-1 text-[10px]">
                      <span className="text-lg font-bold">05</span> Hrs
                    </span>
                    <span className="bg-[#DD3327] px-4 py-1 text-[10px]">
                      <span className="text-lg font-bold">31</span> Mins
                    </span>
                    <span className="bg-[#DD3327] px-4 py-1 text-[10px]">
                      <span className="text-lg font-bold">11</span> Secs
                    </span>
                  </div>
                </div>
                <div className="flex items-center  border-b py-3">
                  <div className="flex cursor-pointer gap-2 p-3 items-center">
                    <LiaRulerHorizontalSolid className="text-xl" />
                    Size chart
                  </div>
                  <div className="flex cursor-pointer gap-2 p-3 items-center">
                    <BsShield className="text-xl" />
                    Shipping and Returns
                  </div>
                  <div className="flex cursor-pointer gap-2 p-3 items-center">
                    <IoColorPaletteOutline className="text-xl" />
                    Shipping and Returns
                  </div>
                  <div className="flex cursor-pointer gap-2 p-3 items-center">
                    <HiOutlineMail className="text-xl" />
                    Contact us
                  </div>
                </div>
                {/* <div className="text-gray-500 mt-5">
                  <div>
                    Size :{" "}
                    <span className="font-bold text-black uppercase">
                      {size}
                    </span>
                  </div>
                  <div className="mt-2 flex gap-2">
                    {data.sizes &&
                      data?.sizes.map((item) => (
                        <label
                          key={item.id}
                          htmlFor={item.name}
                          className={`${
                            size == item.name && "border-blue-500"
                          } cursor-pointer p-2 border rounded-md inline-block`}
                        >
                          <input
                            defaultValue={item.name}
                            onChange={handleChangeSize}
                            type="radio"
                            name="size"
                            className="hidden"
                            id={item.name}
                          />
                          {item.name}
                        </label>
                      ))}
                    <label
                      htmlFor="128gb"
                      className={`${
                        size == "128gb" && "border-blue-500"
                      } cursor-pointer p-2 border rounded-md inline-block`}
                    >
                      <input
                        defaultValue={"128gb"}
                        onChange={handleChangeSize}
                        type="radio"
                        name="size"
                        className="hidden"
                        id="128gb"
                      />
                      128GB
                    </label>
                    <label
                      htmlFor="256gb"
                      className={`${
                        size == "256gb" && "border-blue-500"
                      } cursor-pointer p-2 border rounded-md inline-block`}
                    >
                      <input
                        defaultValue={"256gb"}
                        onChange={handleChangeSize}
                        type="radio"
                        name="size"
                        className="hidden"
                        id="256gb"
                      />
                      256GB
                    </label>
                    <label
                      htmlFor="512gb"
                      className={`${
                        size == "512gb" && "border-blue-500"
                      } cursor-pointer p-2 border rounded-md inline-block`}
                    >
                      <input
                        defaultValue={"512gb"}
                        onChange={handleChangeSize}
                        type="radio"
                        name="size"
                        className="hidden"
                        id="512gb"
                      />
                      512GB
                    </label>
                  </div>
                </div> */}
                {/* <div className="text-gray-500 my-5">
                  <div>
                    Color :
                    <span className="font-bold text-black capitalize">
                      {color}
                    </span>
                  </div>
                  <div className="mt-2 flex gap-2">
                    {data.colors &&
                      data?.colors.map((item) => (
                        <label
                          style={{ backgroundColor: item.color_code }}
                          key={item.id}
                          htmlFor={item.name}
                          className={`${
                            color == item.name && "border-blue-500"
                          } cursor-pointer p-2 border rounded-full w-8 h-8 inline-block`}
                        >
                          <input
                            defaultValue={item.name}
                            onChange={handleChangeColor}
                            type="radio"
                            name="color"
                            className="hidden"
                            id={item.name}
                          />
                        </label>
                      ))}
                    <label
                      htmlFor="white"
                      className={`${
                        color == "white" && "border-blue-500"
                      } cursor-pointer p-2 border rounded-full w-8 h-8 inline-block bg-white`}
                    >
                      <input
                        defaultValue={"white"}
                        onChange={handleChangeColor}
                        type="radio"
                        name="color"
                        className="hidden"
                        id="white"
                      />
                    </label>
                    <label
                      htmlFor="black"
                      className={`${
                        color == "black" && "border-blue-500"
                      } cursor-pointer p-2 border rounded-full w-8 h-8 bg-black inline-block`}
                    >
                      <input
                        defaultValue={"black"}
                        onChange={handleChangeColor}
                        type="radio"
                        name="color"
                        className="hidden"
                        id="black"
                      />
                    </label>
                    <label
                      htmlFor="purple"
                      className={`${
                        color == "purple" && "border-blue-500"
                      } cursor-pointer p-2 border rounded-full w-8 h-8 bg-purple-600 inline-block`}
                    >
                      <input
                        defaultValue={"purple"}
                        onChange={handleChangeColor}
                        type="radio"
                        name="color"
                        className="hidden"
                        id="purple"
                      />
                    </label>
                  </div>
                </div> */}
                <hr />
                <div className="mt-5">
                  <p>Hurry Up! Only 5 Left in Stock!</p>
                  <div className="h-1 mt-2 relative before:content-[''] before:absolute before:w-[15%] before:top-0 before:left-0 before:bottom-0 before:bg-red-400 overflow-hidden bg-gray-200 rounded-full"></div>
                </div>
                <div className="my-5">
                  <div
                    aria-label="counter"
                    className="inline-flex overflow-hidden border rounded-full border-slate-200"
                  >
                    <button className="flex items-center justify-center w-10 h-10 cursor-pointer hover:bg-slate-100">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M20 12H4"
                        />
                      </svg>
                    </button>
                    <input
                      type="text"
                      defaultValue={"1"}
                      className=" w-20 h-10 text-center outline-none text-xl"
                    />
                    <button className="flex items-center justify-center w-10 h-10 cursor-pointer hover:bg-slate-100">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                <div>
                  <button
                    onClick={handleClickToCart}
                    className="w-full overflow-hidden py-3 flex gap-2 group justify-center items-center rounded-full font-bold text-white bg-blue-500 uppercase"
                  >
                    <MdOutlineShoppingCart className="text-2xl -translate-y-11 group-hover:translate-y-[0] transition-all duration-300 bg-blue-500 " />{" "}
                    Add to Cart{" "}
                  </button>
                  <button className="w-full group overflow-hidden flex items-center justify-center gap-2 mt-3 rounded-full font-bold text-white py-3 bg-red-500 uppercase">
                    <GiTakeMyMoney className="text-2xl -translate-y-11 group-hover:translate-y-[0] transition-all duration-300 " />{" "}
                    BUY IT NOW
                  </button>
                </div>
                <div className="flex border-b pb-5 justify-between items-center my-5 text-[12px]">
                  <div className="flex gap-5 items-center">
                    <div className="flex items-center gap-2">
                      <FiHeart />
                      <span className="uppercase">Add WISHLIST</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FiLayers />
                      <span className="uppercase">Add compare</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <AiOutlineShareAlt className="text-xl" />
                    <span className="capitalize">Share</span>
                  </div>
                </div>
                <div className="border-b py-4">
                  <p className="flex items-center gap-2 text-gray-500">
                    <div>
                      <svg
                        width={20}
                        height={20}
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M17.0178 10.3086C17.7428 10.6002 18.1928 11.4586 18.0261 12.2169L17.6844 13.7669C17.0928 16.4336 15.0011 18.3336 11.9844 18.3336H8.01775C5.00108 18.3336 2.90942 16.4336 2.31775 13.7669L1.97608 12.2169C1.80942 11.4586 2.25941 10.6002 2.98441 10.3086L4.16776 9.83355L8.75943 7.99189C9.55943 7.67523 10.4427 7.67523 11.2427 7.99189L15.8344 9.83355L17.0178 10.3086Z"
                          stroke="#515D66"
                          strokeWidth="1.3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M10 18.3335V8.3335"
                          stroke="#515D66"
                          strokeWidth="1.3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M15.8346 6.6665V9.83316L11.243 7.9915C10.443 7.67483 9.55964 7.67483 8.75964 7.9915L4.16797 9.83316V6.6665C4.16797 5.2915 5.29297 4.1665 6.66797 4.1665H13.3346C14.7096 4.1665 15.8346 5.2915 15.8346 6.6665Z"
                          stroke="#515D66"
                          strokeWidth="1.3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12.0846 4.1665H7.91797V2.49984C7.91797 2.0415 8.29297 1.6665 8.7513 1.6665H11.2513C11.7096 1.6665 12.0846 2.0415 12.0846 2.49984V4.1665Z"
                          stroke="#515D66"
                          strokeWidth="1.3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Estimated Delivery: Sep 07 - Sep 11
                      <p />
                      <p className="flex items-center gap-2 my-3 text-gray-500">
                        <svg
                          width={20}
                          height={20}
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M14.1328 5.1416C15.7995 6.29993 16.9495 8.1416 17.1828 10.2666"
                            stroke="#515D66"
                            strokeWidth="1.3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M2.91016 10.3081C3.12682 8.19144 4.26016 6.34977 5.91016 5.18311"
                            stroke="#515D66"
                            strokeWidth="1.3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M6.82422 17.4502C7.79089 17.9419 8.89089 18.2169 10.0492 18.2169C11.1659 18.2169 12.2159 17.9669 13.1576 17.5085"
                            stroke="#515D66"
                            strokeWidth="1.3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M10.051 6.41654C11.3305 6.41654 12.3677 5.37933 12.3677 4.09987C12.3677 2.82041 11.3305 1.7832 10.051 1.7832C8.77158 1.7832 7.73438 2.82041 7.73438 4.09987C7.73438 5.37933 8.77158 6.41654 10.051 6.41654Z"
                            stroke="#515D66"
                            strokeWidth="1.3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M4.0237 16.6001C5.30316 16.6001 6.34036 15.5629 6.34036 14.2835C6.34036 13.004 5.30316 11.9668 4.0237 11.9668C2.74424 11.9668 1.70703 13.004 1.70703 14.2835C1.70703 15.5629 2.74424 16.6001 4.0237 16.6001Z"
                            stroke="#515D66"
                            strokeWidth="1.3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M15.9768 16.6001C17.2563 16.6001 18.2935 15.5629 18.2935 14.2835C18.2935 13.004 17.2563 11.9668 15.9768 11.9668C14.6974 11.9668 13.6602 13.004 13.6602 14.2835C13.6602 15.5629 14.6974 16.6001 15.9768 16.6001Z"
                            stroke="#515D66"
                            strokeWidth="1.3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </p>
                    </div>
                    Return within 30 days of purchase. Taxes are non-refundable.
                  </p>
                </div>
                <div>
                  <div className="flex my-3 items-center">
                    <label htmlFor="" className="min-w-[120px] text-gray-500">
                      Availability:
                    </label>
                    <span className="text-[#008a00]">In Stock</span>
                  </div>
                  <div className="flex my-3 items-center">
                    <label htmlFor="" className="min-w-[120px] text-gray-500">
                      Vendor:
                    </label>
                    <span className="text-gray-500">Samsung</span>
                  </div>
                  <div className="flex my-3 items-center">
                    <label htmlFor="" className="min-w-[120px] text-gray-500">
                      Categories:
                    </label>
                    <span className="text-gray-500">Accessories</span>
                  </div>
                  <div className="flex my-3 items-center">
                    <label htmlFor="" className="min-w-[120px] text-gray-500">
                      Tags:
                    </label>
                    <span className="text-gray-500">Digital</span>
                  </div>
                </div>
                <div className="bg-[#F9F2F2] mt-5 rounded-md flex items-center justify-center p-5">
                  <div>
                    <p className="text-center mb-2">
                      Guarantee safe & Secure checkout
                    </p>
                    <img
                      src="https://demo-uminex.myshopify.com/cdn/shop/files/payment2.png?v=1676051512&width=330"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Detail />
        </div>
        <Recomended productId={data.category_id} />
        <Recently product={data} />
      </div>
    </section>
  );
};

export default ProductDetail;
