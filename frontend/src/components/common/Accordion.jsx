import PropTypes from "prop-types";
import { useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
const Accordion = ({ children, title }) => {
  const [active, setActive] = useState(true);
  return (
    <div className="flex flex-col">
      <div onClick={() => setActive(!active)} className="flex justify-between">
        <h4 className="uppercase font-bold">{title}</h4>
        {active ? <AiOutlineMinus /> : <AiOutlinePlus />}
      </div>
      {active && <>{children}</>}
    </div>
  );
};
Accordion.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
};
export default Accordion;
