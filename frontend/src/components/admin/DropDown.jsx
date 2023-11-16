import { useRef } from "react";
import { useDropdown } from "../../hooks";
import { GoTrash } from "react-icons/go";
import { CiEdit } from "react-icons/ci";
import { BiShowAlt } from "react-icons/bi";
import { checkPropTypes } from "prop-types";
const DropDown = ({ handleDelete, id }) => {
  const dropDownRef = useRef(null);
  const iconRef = useRef(null);
  const handleClickDelete = () => {
    handleDelete(id);
  };
  const { dropdow, setDropdow } = useDropdown(false, dropDownRef, iconRef);
  return (
    <div>
      <div className="relative inline-block text-left">
        <button
          ref={iconRef}
          onClick={() => setDropdow(!dropdow)}
          className="px-1 py-1 text-gray-500 transition-colors duration-200 rounded-lg dark:text-gray-300 hover:bg-gray-100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
            />
          </svg>
        </button>
        <div
          id="dropdown-menu"
          ref={dropDownRef}
          className={`${
            dropdow ? "block" : "hidden"
          } origin-top-right absolute z-50 right-0 mt-2 w-30 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 `}
        >
          <div
            className="py-2 p-2"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="dropdown-button"
          >
            <span
              className="flex items-center gap-3 hover:text-blue-500 rounded-md px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer"
              role="menuitem"
            >
              <BiShowAlt className="text-base" />
              Xem
            </span>

            <span
              className="flex items-center gap-3 hover:text-blue-500 rounded-md px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer"
              role="menuitem"
            >
              <CiEdit className="text-base" />
              Sửa
            </span>
            <span
              onClick={handleClickDelete}
              className="flex gap-3 hover:text-red-500 items-center rounded-md px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer"
              role="menuitem"
            >
              <GoTrash />
              Xoá
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
DropDown.propTypes = {
  id: checkPropTypes.number,
  handleDelete: checkPropTypes.func,
};
export default DropDown;
