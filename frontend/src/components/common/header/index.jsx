import imageHeart from "../../../../public/heart.svg";
import imageCart from "../../../../public/cart.svg";
import { useRef } from "react";
import { HiOutlineTag } from "react-icons/hi";
import Cart from "../Cart";
import { useOffcanvas } from "../../../hooks";
import Favourite from "../Favourite";
import { useSelector } from "react-redux";
import Topbar from "./Topbar";
import Search from "./Search";
import User from "./User";
import Navigate from "./Navigate";
import { Link } from "react-router-dom";
const Header = () => {
  const cartRef = useRef(null);
  const favouriteRef = useRef(null);
  const favouriteIconRef = useRef(null);
  const cartIconRef = useRef(null);
  const barsRef = useRef(null);
  const menuRef = useRef(null);

  const { isOpen: isOpenMenu, setIsOpen: setIsOpenMenu } = useOffcanvas(
    false,
    menuRef,
    barsRef
  );
  const { cartAr } = useSelector((state) => state.cart);
  let totalCart = 0;
  let qtyCart = 0;
  cartAr.forEach((item) => {
    totalCart += item.total;
    qtyCart += item.qty;
  });

  const { isOpen: isOpenCart, setIsOpen: setIsOpenCart1 } = useOffcanvas(
    false,
    cartRef,
    cartIconRef
  );
  const { isOpen: isOpenFav, setIsOpen: setIsOpenFav } = useOffcanvas(
    false,
    favouriteRef,
    favouriteIconRef
  );
  const handleClickShowMenu = () => {
    setIsOpenMenu(!isOpenMenu);
  };
  const handleClickShowCart = () => {
    setIsOpenCart1(!isOpenCart);
  };
  const handleClickShowFav = () => {
    setIsOpenFav(!isOpenFav);
  };
  return (
    <>
      <header className="">
        <Topbar />
        <hr />
        <div className="flex max-w-[1410px] px-5 py-5 mx-auto justify-between items-center">
          <div
            ref={barsRef}
            onClick={handleClickShowMenu}
            className="lg:hidden"
          >
            <i className="fa-solid fa-bars text-[25px]"></i>
          </div>
          <div className="w-[150px] shrink-0 text-3xl  gap-1">
            {/* <img
              src="https://demo-uminex.myshopify.com/cdn/shop/files/Logo_fb7c7c58-1b8f-455e-8b97-56d607743b37_145x@2x.png?v=1679893103"
              alt=""
            /> */} 
            <Link to={"/"}>
              <span className="font-bold ">VVD</span>{" "}
              <span className="text-[#4369ff] font-bold  border-b-blue-600 border-b-2 ">
                Shop
              </span>
            </Link>
          </div>
          <Search />
          <div className="flex">
            <User />
            <div
              onClick={handleClickShowFav}
              ref={favouriteIconRef}
              className="hidden lg:block lg:mr-7 shrink-0 "
            >
              <a href="#" className="relative z-0 top-[6px]  ">
                <img src={imageHeart} alt="" />
                <span className="block -top-2 -right-3 w-5 leading-5 text-center text-white text-[10px] absolute h-5 rounded-full font-bold bg-red-600">
                  1
                </span>
              </a>
            </div>
            <div
              onClick={handleClickShowCart}
              ref={cartIconRef}
              className="text-center lg:mr-10"
            >
              <a href="#" className="flex items-center ">
                <div className="relative shrink-0 z-0 ">
                  <img src={imageCart} alt="" />
                  <span className="block -top-2 -right-3 w-5 leading-5 text-center text-white text-[10px] absolute h-5 rounded-full font-bold bg-red-600">
                    {qtyCart}
                  </span>
                </div>
                <div className="hidden lg:block">
                  <p className="text-[#3c3d3e] w-[100px] tracking-widest text-[10px]">
                    Your Cart <HiOutlineTag className="inline" />
                  </p>
                  <p className="text-[#212529] font-bold text-[14px]">
                    ${totalCart.toFixed(2)}
                  </p>
                </div>
              </a>
            </div>
          </div>
        </div>
        {/*  */}
        <hr />
        <Navigate
          menuRef={menuRef}
          setIsOpenMenu={setIsOpenMenu}
          isOpenMenu={isOpenMenu}
        />
        <hr />
        <Cart cart={isOpenCart} setCart={setIsOpenCart1} cartRef={cartRef} />
        <Favourite
          isOpen={isOpenFav}
          setIsOpen={setIsOpenFav}
          favRef={favouriteRef}
        />
      </header>
    </>
  );
};

export default Header;
