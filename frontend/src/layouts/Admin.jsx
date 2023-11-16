import HeaderAdmin from "../components/admin/Header";
import FooterAdmin from "../components/admin/Footer";
import Siderbar from "../components/admin/Siderbar";
import { useState } from "react";
import { Login } from "../pages/admin";
import { useAuth, useToken } from "../hooks";
import { checkPropTypes } from "prop-types";

const LayoutAdmin = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { token, setToken } = useToken();
  const { user } = useAuth(token);
  if (!token) {
    return <Login setToken={setToken} user={user} />;
  }

  return (
    <div>
      <HeaderAdmin
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <div className="flex">
        <Siderbar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          setToken={setToken}
        />
        <div
          id="content"
          className=" bg-gray-100 w-full transition-all duration-200 ease-in-out"
        >
          {children}
        </div>
      </div>
      <FooterAdmin />
    </div>
  );
};
LayoutAdmin.propTypes = {
  children: checkPropTypes.node,
};
export default LayoutAdmin;
