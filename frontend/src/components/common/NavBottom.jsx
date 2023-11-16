import homeSvg from "../../../public/svg/home.svg";
import shopSvg from "../../../public/svg/shop.svg";
import bagSvg from "../../../public/svg/bag.svg";
const NavBottom = () => {
  return (
    <div className="fixed lg:hidden bottom-0 shadow-nav left-0 right-0 h-20 bg-white z-40 px-7">
      <ul className="flex justify-between items-center">
        <li>
          <a href="">
            <img src={homeSvg} alt="" />
          </a>
        </li>
        <li>
          <a href="">
            <img src={shopSvg} alt="" />
          </a>
        </li>
        <li className="rounded-full shadow-cart border-[5px] border-white flex justify-center items-center text-white -translate-y-10 bg-[#2b38d1] w-20 h-20">
          <a href=""><img src={bagSvg} alt="" /></a>
        </li>
        <li>
          <a href="">
            <i className="fa-solid text-[1.3rem] fa-magnifying-glass"></i>
          </a>
        </li>
        <li>
          <a href="">
            <i className="fa-regular text-[1.3rem] fa-heart"></i>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default NavBottom;
