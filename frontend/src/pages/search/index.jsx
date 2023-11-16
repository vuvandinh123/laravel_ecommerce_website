import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LayoutProduct from "../../components/common/LayoutProduct";
import { getRequestSite, postRequestSite } from "../../api/requestSite";
import { PRODUCT_SEARCH } from "../../constants/constants";

const Search = () => {
  const [data, setData] = useState([]);
  const [totalProduct, setTotalProduct] = useState(0);
  const searchQuery = new URLSearchParams(location.search);
  const navigate = useNavigate();
  const cat = searchQuery.get("cat") || "all";
  const q = searchQuery.get("q");
  const [filter, setFilter] = useState({ limit: 5, page: 1 });
  const limit = searchQuery.get("limit") || 5;
  useEffect(() => {
    const params = {
      search: q,
      limit: filter.limit || 5,
    };
    const fetchApi = async () => {
      const res = await postRequestSite(PRODUCT_SEARCH + cat, params);
      setData(res.data);
      setTotalProduct(res.data.total);
    };
    fetchApi();
  }, [cat, q, filter.limit]);
  return (
    <div className="bg-[#F1F5F6] pb-10">
      <div className="bg-[url(https://demo-uminex.myshopify.com/cdn/shop/files/bg_breadcrumbs_1920x.png?v=1684232545)] h-36 text-white flex justify-center items-center flex-col gap-y-3">
        <h2 className="text-2xl font-semibold">
          {data.length} RESULTS FOR "{q}"
        </h2>
        <div>
          <ul className="flex items-center gap-x-2">
            <li>
              <Link to={"/"} href="">
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <a href="">Search</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="py-3 max-w-[1410px] px-5 mx-auto">
        <LayoutProduct data={data} />
      </div>
    </div>
  );
};

export default Search;
