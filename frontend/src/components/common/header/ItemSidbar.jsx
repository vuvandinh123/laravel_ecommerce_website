import PropTypes from "prop-types";
import "./index.css";
const ItemSidbar = ({ subMenu }) => {
  return (
    <div className="absolute min-w-[200px] rounded-sm  sidebar-item  duration-300 transition-all  left-[105%] translate-x-5   opacity-0 invisible top-0 bg-white shadow-lg">
      <div className=" p-6">
        <div>
          <ul className="">
            {subMenu?.map((child) => {
              return (
                <li key={child.id} className="py-1 relative sidebar">
                  <div
                    className={`block before:content-[""] before:block before:bg-transparent before:w-[50px] before:h-20 before:left-[90%] before:z-20 before:absolute group/2 hover:ps-1 transition-all relative`}
                  >
                    <div className="flex justify-between hover:text-[#2b38d1] items-center">
                      <p className="">{child?.name}</p>
                      {child?.children && child.children?.length > 0 && (
                        <i className="fa-solid fa-chevron-right text-[9px]"></i>
                      )}
                    </div>
                  </div>
                  {child?.children && child?.children?.length > 0 && (
                    <ItemSidbar subMenu={child?.children} />
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};
ItemSidbar.propTypes = {
  subMenu: PropTypes.object,
};
export default ItemSidbar;
