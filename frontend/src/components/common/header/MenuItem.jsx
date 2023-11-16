import { Link } from "react-router-dom";
import PropTypes from "prop-types";
const MenuItem = ({ item }) => {
  return (
    <li className=" lg:py-0 group relative py-5 border-b lg:border-b-0">
      <div>
        <div className="flex justify-between items-center">
          <Link
            to={item.link}
            className="block w-full text-[#212529] hover:text-[#2b38d1]"
            href=""
          >
            {item.name}
          </Link>
          {item.children && item.children.length > 0 && (
            <i
              // onClick={handleClickDropdownSubmenu}
              className="fa-solid  fa-chevron-down text-end ml-2 mr-2 text-[12px]"
            ></i>
          )}
        </div>
      </div>
      {item.children && item.children.length > 0 && (
        <div className="absolute group-hover:block hidden top-full rounded-md -left-3 z-30  bg-white min-w-[150px] shadow-md p-3">
          <ul className="leading-8">
            {item.children?.map((child) => (
              <MenuItem key={child.id} item={child} />
            ))}
          </ul>
        </div>
      )}
    </li>
  );
};

MenuItem.propTypes = {
  item: PropTypes.object,
};
export default MenuItem;
