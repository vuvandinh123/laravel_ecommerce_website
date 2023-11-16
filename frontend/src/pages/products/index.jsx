import { useEffect, useState } from "react";
import CategoriesSiderbar from "./CategoriesSiderbar";
import { useNavigate, useParams } from "react-router-dom";
import Filter from "./Filter";
import LayoutProduct from "../../components/common/LayoutProduct";
import { useApiCall } from "../../hooks";
import Featured from "./Featured";
import { getRequestSite } from "../../api/requestSite";
import { PRODUCTS } from "../../constants/constants";
const Products = () => {
  const [sortBy, setSortBy] = useState("featured");
  const searchParams = new URLSearchParams(window.location.search);

  const brand = searchParams.get("brand")?.split(",") || [];
  const [params, setParams] = useState({
    brand: brand,
    sortBy: "featured",
    price: { min: null, max: null },
  });
  const navigate = useNavigate();
  useEffect(() => {
    const queryParams = new URLSearchParams();
    if (params.brand.length > 0) {
      queryParams.append("brand", params.brand.join(","));
    }
    if (params.sortBy.length > 0) {
      queryParams.append("sortBy", params.sortBy);
    }
    navigate(`?${queryParams.toString()}`);
  }, [params, navigate]);
  const limi = searchParams.get("limit");
  const [limit, setLimit] = useState(Number(limi) || 10);
  const [price, setPrice] = useState({
    min: null,
    max: null,
  });

  const { slug } = useParams();
  const handleCheckboxChange = (value, isChecked, name) => {
    if (name == "brand") {
      setParams((item) => {
        if (isChecked) {
          if (!item.brand.includes(value)) {
            return {
              ...item,
              brand: [...item.brand, value],
            };
          }
        } else {
          return {
            ...item,
            brand: item.brand.filter((item) => item !== value),
          };
        }
        return item;
      });
    }
  };
  const { data, progress, loading } = useApiCall(async () => {
    return await getRequestSite(PRODUCTS, {
      min: price.min,
      max: price.max,
      page: 1,
      limit: limit,
      category: slug,
      sortBy: sortBy,
      brand: JSON.stringify(params.brand),
    });
  }, [slug, price.min, price.max, params.brand, limit, sortBy]);
  const listProduct = data?.data?.data || [];
  const totalProduct = data?.data?.total || 0;

  return (
    <div className="bg-[#F1F5F6]">
      <div className="bg-[url(https://demo-uminex.myshopify.com/cdn/shop/files/bg_breadcrumbs_1920x.png?v=1684232545)] h-36 text-white flex justify-center items-center flex-col gap-y-3">
        <h2 className="text-4xl font-semibold">Products</h2>
        <div>
          <ul className="flex items-center gap-x-2">
            <li>
              <a href="">Home</a>
            </li>
            <li>/</li>
            <li>
              <a href="">Products</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="py-3 max-w-[1410px] px-5 mx-auto">
        <div className="flex gap-x-5">
          <div className="basis-1/5 hidden lg:block min-h-[100vh] bg-white p-5">
            <div className="border-b pb-5">
              <CategoriesSiderbar />
            </div>
            <Filter
              handleCheckboxChange={handleCheckboxChange}
              filter={params}
              price={price}
              params={params}
              setPrice={setPrice}
              setFilter={setParams}
            />
            <div className="border-b pb-5 mt-5">
              <Featured />
            </div>
            <div className="border-b pb-5 mt-5 relative">
              <div>
                <div>
                  <img
                    className="w-full"
                    src="https://demo-uminex.myshopify.com/cdn/shop/files/img_1_8_180x.jpg?v=1676309988"
                    alt=""
                  />
                </div>
              </div>
              <div className="absolute top-1/4 left-5">
                <p className="uppercase text-red-500 mb-2 text-[12px]">
                  Top Camaras
                </p>
                <h6 className="text-2xl">LAP TOP</h6>
                <h6 className="uppercase text-red-500 text-2xl">macboox m1</h6>
                <p>
                  Just from <span>$129.00</span>
                </p>
                <button className="w-full py-2 mt-5 font-bold  text-black border-[3px]  rounded-full">
                  SHOW NOW
                </button>
              </div>
            </div>
          </div>
          <div className="lg:basis-4/5">
            <LayoutProduct
              setSortBy={setSortBy}
              sortBy={sortBy}
              setParams={setParams}
              params={params}
              progress={progress}
              loading={loading}
              data={listProduct}
            />
            <div
              onClick={() => {
                if (listProduct.length < totalProduct) {
                  setLimit(limit + 10);
                  const params = "?limit=" + (limit + 10);
                  navigate(params);
                }
              }}
              className="flex items-center justify-center mt-10"
            >
              {listProduct.length < totalProduct && (
                <button className="px-10 py-3 hover:shadow-md hover:bg-blue-500 transition-all duration-200 hover:text-white border-2  rounded-md bg-slate-200  ">
                  Load more ({totalProduct - listProduct.length}) products
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
