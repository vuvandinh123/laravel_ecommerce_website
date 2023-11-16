import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AppURL } from "../../api/AppURL";
import { getRequestSite } from "../../api/requestSite";
import { CATEGORIES } from "../../constants/constants";

const CategoryPage = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchApi = async () => {
      const res = await getRequestSite(CATEGORIES,{limit:50});
      setData(res.data.data);
    };
    fetchApi();
  }, []);
  return (
    <div className="bg-[#F1F5F6]">
      <div className="bg-[url(https://demo-uminex.myshopify.com/cdn/shop/files/bg_breadcrumbs_1920x.png?v=1684232545)] h-36 text-white flex justify-center items-center flex-col gap-y-3">
        <h2 className="text-4xl font-semibold">Shop</h2>
        <div>
          <ul className="flex items-center gap-x-2">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>/</li>
            <li>
              <a href="">Shop</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="py-3 max-w-[1410px] px-5 mx-auto">
        <div className="flex items-center flex-wrap">
          {data.length > 0 &&
            data.map((item, index) => (
              <div key={index} className="lg:w-1/4  md:w-1/3 sm:w-1/2 w-full ">
                <div className="bg-white relative m-1 p-5 rounded-md ">
                  <div className="h-[290px]  z-30 group relative ">
                    <Link to={`/categories/${item.slug}`}>
                      <img
                      width={"290px"}
                        className="group-hover:scale-105 z-10 relative h-full  transition-all duration-500 w-full"
                        src={AppURL.ImageUrl + item.image}
                        alt=""
                      />
                    </Link>
                  </div>
                  <div>
                    <h2 className="text-center my-2 uppercase">
                      <Link to={`categories/${item.slug}`}>{item.name}</Link>
                    </h2>
                    <p className="text-gray-500 text-center text-[12px]">
                      <span>14</span> Products
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
