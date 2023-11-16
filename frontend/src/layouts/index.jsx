import ToastOrder from "../components/baskets/ToastOrder";
import { Footer, Header, NavBottom } from "../components/common";
import { checkPropTypes } from "prop-types";
const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
      <Footer />
      <NavBottom />
      <ToastOrder />
    </div>
  );
};
Layout.propTypes = {
  children: checkPropTypes.node,
};
export default Layout;
