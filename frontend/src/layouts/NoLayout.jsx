import { checkPropTypes } from "prop-types";

const NoLayout = ({ children }) => {
  return <div>{children}</div>;
};
NoLayout.propTypes = {
  children: checkPropTypes.node,
};
export default NoLayout;
