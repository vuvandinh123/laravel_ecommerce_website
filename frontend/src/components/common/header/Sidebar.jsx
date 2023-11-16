import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useState } from "react";
import { useApiCall } from "../../../hooks";
import ItemSidbar from "./ItemSidbar";
import { getRequestSite } from "../../../api/requestSite";
import { CATEGORIES } from "../../../constants/constants";
function buildMenuTree(menuItems, parent_id = 0) {
  let menuTree = [];
  menuItems.forEach((item) => {
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
const Sidebar = ({ isOpenMenu, dropdowRef, handleClickDropdown, dropdow }) => {
  const [menu, setMenu] = useState([]);
   useApiCall(
    async () => {
      const res = await getRequestSite(CATEGORIES,{limit:50});
      const menuTree = buildMenuTree(res.data.data);
      setMenu(menuTree);
      return null;
    },
    [buildMenuTree],
    []
  );
  return (
    <>
      <div
        ref={dropdowRef}
        onClick={handleClickDropdown}
        className={`w-64 z-50 flex-none before:content-[''] before:bg-[#241adf]  before:block before:h-[3px] before:opacity-0 before:left-[50%] before:right-[50%] before:hover:opacity-100 before:absolute hover:before:left-0 hover:before:right-0 before:duration-300 before:top-0 relative  transition-all cursor-pointer  py-4 ${
          isOpenMenu && "hidden"
        }`}
      >
        <div className="flex items-center">
          <HiOutlineMenuAlt1 className="text-[25px] mr-3" />
          Browse All Categories
        </div>
        <div
          className={`scale-y-0  opacity-0 transition-all duration-500 z-10 ${
            dropdow && "!scale-100 opacity-100"
          }`}
        >
          <div className="absolute mt-5 bg-white p-3 bottom-auto left-0 right-0 shadow-md">
            <ul className="leading-8">
              {menu.map((item) => (
                <div key={item.id} className="relative group sidebar border-b">
                  <div className="flex justify-between hover:text-[#2b38d1] items-center">
                    <li key={item.id} className="py-2  px-2 ">
                      {item.name}
                    </li>
                    {item?.children?.length > 0 && (
                      <i className="fa-solid fa-chevron-right text-[9px]"></i>
                    )}
                  </div>
                  {item.children && item?.children.length > 0 && (
                    <ItemSidbar subMenu={item.children} />
                  )}
                </div>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
Sidebar.propTypes = {
  dropdow: PropTypes.bool,
  setDropdow: PropTypes.func,
  handleClickDropdown: PropTypes.func,
  isOpenMenu: PropTypes.bool,
  dropdowRef: PropTypes.object,
};
export default Sidebar;
