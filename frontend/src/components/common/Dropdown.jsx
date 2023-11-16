import PropTypes from "prop-types";
import { useDropdown } from "../../hooks";
import { useRef } from "react";

const Dropdown = ({ title, children }) => {
  const dropRef = useRef(null);
  const iconRef = useRef(null);
  const { dropdow, setDropdow } = useDropdown(false, dropRef, iconRef);
  return (
    <div
      className="flex items-center relative gap-1"
    >
      <div  onClick={() => setDropdow(!dropdow)} ref={iconRef}>
        <span className="cursor-pointer"> {title}</span>
        <i className="fa-solid fa-chevron-down text-[9px] text-slate-500"></i>
      </div>

      <div
        ref={dropRef}
        className={`scale-y-50 transition-all duration-500 z-10 ${
          dropdow && "!scale-100"
        }`}
      >
        {dropdow && children}
      </div>
    </div>
  );
};
Dropdown.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
};
export default Dropdown;
