import { useEffect, useRef, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Link, useNavigate } from "react-router-dom";
import { useDropdown } from "../../../hooks";
import lodash from "lodash";
import ImageLoader from "../ImageLoader";
import { AppURL } from "../../../api/AppURL";
import { getRequestSite, postRequestSite } from "../../../api/requestSite";
import { CATEGORIES, PRODUCT_SEARCH } from "../../../constants/constants";

const Search = () => {
  const [loading, setLoading] = useState(true);
  const [noData, setNoData] = useState(false);
  const [idCategory, setIdCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [categorySearch, setCategorySearch] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const searchRef = useRef(null);
  const dropdowRef = useRef(null);
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const {
    dropdow: activeSearch,
    setDropdow: setActiveSearch,
  } = useDropdown(false, dropdowRef,containerRef);
  useEffect(() => {
    const fetchApi = async () => {
      setLoading(true);
      const data = {
        search: search,
      };
      const res1 = await postRequestSite(PRODUCT_SEARCH + idCategory, data);
      const res2 = await getRequestSite(CATEGORIES,{limit:50});
      setCategorySearch(res2.data.data);
      setTimeout(() => {
        setSearchData(res1.data);
        setLoading(false);
        setNoData(res1.data.length === 0);
      }, 1000);
    };
    fetchApi();
    return () => {};
  }, [search, idCategory]);
  const handleSubmitSearch = (e) => {
    e.preventDefault();
    setActiveSearch(false);
    if (searchRef.current) {
      searchRef.current.blur();
    }
    if (idCategory == "all") {
      navigate("/search?q=" + search);
    } else {
      let cat = categorySearch.find((item) => item.slug === idCategory);
      navigate("/search?cat=" + cat.slug + "&q=" + search);
    }
  };
  const handleFocusSearch = () => {
    setActiveSearch(true);
  };
  const hanldeChangeSearch = lodash.debounce((e) => {
    setSearch(e.target.value);
  }, 300);

  return (
    <>
      <div className="hidden lg:block w-full bg-white relative">
        <form action="" onSubmit={handleSubmitSearch} method="get">
          <div ref={containerRef} className="flex items-center w-full  justify-center">
            <div className="border rounded-s-md border-[#e5e8ec] w-[60%] h-12 flex">
              <select
                className="px-3 text-[#212529] hidden md:block bg-transparent  outline-0 w-[150px]"
                name="category"
                id=""
                onChange={(e) => setIdCategory(e.target.value)}
              >
                <option className="text-[#212529]" value="all">
                  All categories
                </option>
                {categorySearch.map((item) => (
                  <option
                    key={item.id}
                    className="text-[#212529]"
                    value={item.slug}
                  >
                    {item.name}
                  </option>
                ))}
              </select>
              <input
                type="text"
                onChange={hanldeChangeSearch}
                onFocus={handleFocusSearch}
                // onBlur={()=>{
                //   setTimeout(() => {
                //     setActiveSearch(false);
                //   },300)
                // }}
                ref={searchRef}
                defaultValue={search}
                placeholder="Search for products..."
                className="px-3 text-[14px] py-2 rounded-xl w-full  outline-0"
              />
            </div>
            <button className="bg-[#2b38d1] text-white hover:bg-[#2b39d1bd] px-10 py-[13px] rounded-e-md">
              Search
            </button>
          </div>
        </form>

        {search.length > 0 && activeSearch && (
          <>
            <div
              ref={dropdowRef}
              className="absolute border overflow-scroll max-h-[450px]  z-50 rounded-md  right-32 left-32  p-3 bg-white"
            >
              {searchData?.length > 0 &&
                !noData &&
                !loading &&
                searchData?.map((item, index) => (
                  <div key={index} className="flex border-b p-3 gap-2">
                    <div className="relative">
                      <Link to={`/products/${item.slug}`}>
                        <ImageLoader
                          className={"w-[60px] h-[60px]"}
                          src={`${AppURL.ImageUrl}${
                            item.images ? item?.images[0]?.image_url : ""
                          }`}
                        />
                      </Link>
                    </div>
                    <div className="mt-2">
                      <h4 className="text-[15px]">
                        <Link
                          to={`/products/${item.slug}`}
                          className="hover:text-[#2b38d1] transition-all"
                        >
                          {item.name}
                        </Link>
                      </h4>
                      <h5 className="text-red-500 mt-2 font-bold">
                        ${item.price}
                      </h5>
                    </div>
                  </div>
                ))}
              {loading &&
                Array(5)
                  .fill(1)
                  .map((item, index) => (
                    <div key={index} className="flex border-b p-3 gap-2">
                      <div className="relative">
                        <Skeleton width={60} height={60} />
                      </div>
                      <div className="mt-2">
                        <h4 className="text-[15px]">
                          <Skeleton width={250} height={20} />
                        </h4>
                        <h5 className="text-red-500 mt-2 font-bold">
                          <Skeleton width={100} height={20} />
                        </h5>
                      </div>
                    </div>
                  ))}
              {noData && (
                <p className="text-gray-400 text-center text-[17px]">
                  No data found
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Search;
