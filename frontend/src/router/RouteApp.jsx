import { Route, Routes } from "react-router-dom";
import Layout from "../layouts";
import LayoutAdmin from "../layouts/Admin";
import { publicRoute } from "./SiteRoute";
import { privateRoute } from "./AdminRoute";
import { NoPage } from "../pages";

const RouteApp = () => {
  return (
    <div>
      <Routes>
        {publicRoute.map((route, index) => {
          const {
            path,
            component: Component,
            layout: LayoutSite = Layout,
          } = route;
          if (LayoutSite == null)
            return <Route key={index} path={path} element={<Component />} />;
          return (
            <Route
              key={index}
              path={path}
              element={
                <LayoutSite>
                  <Component />
                </LayoutSite>
              }
            />
          );
        })}
        {privateRoute.map((route, index) => {
          const {
            path,
            component: Component,
            layout: Layout = LayoutAdmin,
          } = route;
          if (Layout == null)
            return <Route key={index} path={path} element={<Component />} />;
          return (
            <Route
              key={index}
              path={path}
              element={
                <Layout>
                  <Component />
                </Layout>
              }
            />
          );
        })}
        <Route path="*" element={<NoPage />}></Route>
      </Routes>
    </div>
  );
};

export default RouteApp;
