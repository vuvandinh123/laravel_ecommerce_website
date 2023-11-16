import { useEffect, useState } from "react";
import imageSale from "../../../../public/sale.svg";
import { useApiCall, useDropdown } from "../../../hooks";
import { Link } from "react-router-dom";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import PropTypes from "prop-types";
import MenuItem from "./MenuItem";
import Sidebar from "./Sidebar";
import { getRequestSite } from "../../../api/requestSite";
import { MENUS } from "../../../constants/constants";
function buildMenuTree(menuItems, parent_id = 0) {
  let menuTree = [];
  menuItems.forEach(item => {
    if (item.parent_id === parent_id) {
      const children = buildMenuTree(menuItems, item.id);
      if (children.length) {
        item.children = children;
      }
      menuTree.push(item);
    }
  });
  return menuTree;
}

const Navigate = ({ isOpenMenu, setIsOpenMenu, menuRef }) => {
  const [scroll, setScroll] = useState(false);
  const { dropdow, setDropdow, dropdowRef } = useDropdown(false);
  const [menu,setMenu] = useState([])
  useEffect(() => {
    const scroll = window.addEventListener("scroll", () => {
      if (window.scrollY > 200) {
        setScroll(true);
      } else {
        setScroll(false);
        setDropdow(false);
      }
    });
    return () => {
      removeEventListener("scroll", scroll);
    };
  }, []);
  useApiCall(
    async () => {
      const res = await getRequestSite(MENUS);
      const menuTree = buildMenuTree(res.data);
      setMenu(menuTree)
      return null
    },
    [buildMenuTree],
    []
  );

  const handleClickDropdown = () => {
    if (window.scrollY > 200 || !(window.location.pathname === "/")) {
      setDropdow(!dropdow);
    }
  };
  const handleClickHiddenMenu = () => {
    setIsOpenMenu(false);
  };
  return (
    <>
      <div
        className={`border-b   max-w-[100%] m-auto px-4 hidden bg-[#fff] ${
          isOpenMenu && "!block"
        } lg:block ${
          scroll && "fixed !top-0 z-50 left-0"
        } z-50 transition-all duration-500 -top-20  shadow-yellow-500 right-0`}
      >
        <div
          className={`flex max-w-[1410px] z-50${
            isOpenMenu &&
            "fixed z-50 bg-[#505050cb] top-0 left-0  bottom-0 right-0"
          }  max-w-[100%] lg:px-5 mx-auto items-center`}
        >
         <Sidebar isOpenMenu={isOpenMenu} dropdowRef={dropdowRef} handleClickDropdown={handleClickDropdown} dropdow={dropdow}/>
          <div
            ref={menuRef}
            className={`${
              isOpenMenu && "w-[70%]"
            } lg:border-l lg:border-[#ccc] transition-all duration-300  lg:w-auto lg:bg-transparent bg-white h-full`}
          >
            <ul
              className={`flex items-center ${
                isOpenMenu && "flex-col h-[100vh] w-full overflow-scroll "
              } relative gap-x-8 justify-start px-6`}
            >
              <button
                onClick={handleClickHiddenMenu}
                className="mt-5 lg:hidden items-center w-full text-center gap-2 text-[1.0rem] text-red-500 uppercase"
              >
                Close<i className="ml-2 fa-solid fa-xmark"></i>
              </button>
              <li className="lg:hidden">
                <h3 className="text-center my-5 font-semibold text-[11px]">
                  WHAT ARE YOU LOOKING FOR?
                </h3>
                <div className="relative">
                  <input
                    type="text"
                    defaultValue={""}
                    className="rounded-full border-0 outline-none px-3 py-2 w-full shadow-md"
                    placeholder="Search"
                  />
                  <button className="absolute right-8 top-3">
                    {" "}
                    <i className="fa-solid fa-magnifying-glass absolute"></i>
                  </button>
                </div>
              </li>
              {menu.map((item, index) => {
                return <MenuItem key={index} item={item} />;
              })}
              {/* <li className=" lg:py-0 py-5 border-b lg:border-b-0">
                <Link
                  to={"/"}
                  className=" text-[#212529] hover:text-[#2b38d1]"
                  href=""
                >
                  Home{" "}
                </Link>
              </li>
              <li className=" lg:py-0 relative py-5 relative border-b lg:border-b-0">
                <div>
                  <div className="flex justify-between items-center">
                    <Link
                      to={"/categories/all"}
                      className="block w-4/5 text-[#212529] hover:text-[#2b38d1]"
                      href=""
                    >
                      Shop{" "}
                    </Link>
                    <i
                      onClick={handleClickDropdownSubmenu}
                      className="fa-solid w-[20%] fa-chevron-down text-end mr-2 text-[12px]"
                    ></i>
                  </div>
                </div>
                <div className="absolute top-full rounded-md -left-3 z-30  bg-white min-w-[150px] shadow-md p-3">
                  <ul className="leading-8">
                    <li className=""><a className="block hover:ml-1 duration-150 transition-all hover:text-blue-600" href="">item1</a></li>
                    <li className="py-2"><a className="block hover:ml-1 duration-150 transition-all hover:text-blue-600" href="">item1</a></li>
                    <li className="py-2"><a className="block hover:ml-1 duration-150 transition-all hover:text-blue-600" href="">item1</a></li>
                    <li className="py-2"><a className="block hover:ml-1 duration-150 transition-all hover:text-blue-600" href="">item1</a></li>
                    <li className="py-2"><a className="block hover:ml-1 duration-150 transition-all hover:text-blue-600" href="">item1</a></li>
                  </ul>
                </div>
                <div
                  className={`max-h-0 lg:hidden overflow-hidden transition-all mt-2 ${
                    dropdowSub && "!max-h-96 duration-300"
                  }`}
                >
                  <ul className="relative left-5">
                    <li className="py-2">
                      <a className="text-[#212529] " href="">
                        Laptop
                      </a>
                    </li>
                    <li className="py-2">
                      <a className="text-[#212529]" href="">
                        Iphone
                      </a>
                    </li>
                    <li className="py-2">
                      <a className="text-[#212529]" href="">
                        Sam sung
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
              <li className=" lg:py-0 py-5 border-b lg:border-b-0">
                <a className=" text-[#212529] hover:text-[#2b38d1]" href="">
                  Page
                </a>
              </li>
              <li className=" lg:py-0 py-5 border-b lg:border-b-0">
                <a className=" text-[#212529] hover:text-[#2b38d1]" href="">
                  Contact Us
                </a>
              </li>
              <li className=" lg:py-0 py-5 border-b lg:border-b-0">
                <a className=" text-[#212529] hover:text-[#2b38d1]" href="">
                  Blog
                </a>
              </li> */}
              <li className=" lg:py-0 py-5 border-b lg:border-b-0">
                <a className=" hover:text-[#2b38d1] text-red-600" href="">
                  By Uminex!
                </a>
              </li>
            </ul>
          </div>
          <div className={`flex-auto ${isOpenMenu && "hidden"}`}>
            <a
              className=" flex gap-2 justify-end text-[#ffbd2e] font-bold text-base hover:text-[#2b38d1]"
              href=""
            >
              <img src={imageSale} alt="" />
              Sale $20 Off Your First Order.
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
Navigate.propTypes = {
  isOpenMenu: PropTypes.bool,
  setIsOpenMenu: PropTypes.func,
  menuRef: PropTypes.object,
};
export default Navigate;
