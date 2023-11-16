import { useRef } from "react";
import { Accordion } from "../../components/common";
import PropTypes from "prop-types";
import { AiOutlineClose } from "react-icons/ai";
import { BiTrash } from "react-icons/bi";
import { useApiCall } from "../../hooks";
import { useParams } from "react-router-dom";
import { getRequestSite } from "../../api/requestSite";
import { BRANDS } from "../../constants/constants";

const Filter = (props) => {
  const { filter, setFilter, price, setPrice } = props;
  const minPriceRef = useRef(null);
  const maxPriceRef = useRef(null);
  const { slug } = useParams();
  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    const isChecked = event.target.checked;
    props.handleCheckboxChange(value, isChecked, name);
  };
  const handleClickFilterPrice = () => {
    setPrice({
      min: minPriceRef.current.value,
      max: maxPriceRef.current.value,
    });
  };
  const { data: brandList } = useApiCall(async () => {
    return await getRequestSite(BRANDS, { limit: 50 });
  }, [slug]);

  const brands = brandList?.data?.data || [];
  return (
    <>
      <div className="border-b pb-5 mt-5">
        <div className="flex items-center justify-between">
          <h3 className="font-bold uppercase ">Filter</h3>

          <button className="" title="Remove all">
            <BiTrash
              onClick={() => {
                setFilter({
                  brand: [],
                  sortBy: "featured",
                });
                setPrice({
                  min: null,
                  max: null,
                });
                document.querySelectorAll(".brand").forEach((it) => {
                  it.checked = false;
                });
                minPriceRef.current.value = "";
                maxPriceRef.current.value = "";
              }}
              className="text-[15px]"
            />
          </button>
        </div>
        <div className="flex items-center gap-1 mt-2 flex-wrap">
          {filter.brand.length > 0 &&
            filter.brand.map((item, index) => {
              const mach = brands.find((item2) => item2.id == item);
              return (
                <div key={index}>
                  <span className="px-2 text-[13px] py-1 pr-0 my-1 bg-slate-100 inline-block ms-1  rounded-sm">
                    Brand: {mach?.name}
                    <span
                      onClick={() => {
                        document.querySelectorAll(".brand").forEach((it) => {
                          if (it.value == mach.id) {
                            it.checked = false;
                          }
                        });
                        setFilter((prevSelectedValues) => {
                          return {
                            ...prevSelectedValues,
                            brand: prevSelectedValues.color.filter(
                              (item3) => item3 !== mach.id
                            ),
                          };
                        });
                      }}
                      className="px-2  hover:text-[#ff3030] cursor-pointer"
                    >
                      <AiOutlineClose className="inline text-[13px]" />
                    </span>
                  </span>
                </div>
              );
            })}
          {price.min && (
            <div className="flex items-center ">
              <span className="px-4 text-[13px] py-1 my-1 bg-slate-100 inline-block ms-1  rounded-sm">
                Min: {price.min}
                <span
                  onClick={() => {
                    minPriceRef.current.value = "";
                    setPrice({ ...price, min: null });
                  }}
                  className="pl-3 hover:text-[#ff3030] cursor-pointer"
                >
                  <AiOutlineClose className="inline" />
                </span>
              </span>
            </div>
          )}
          {price.max && (
            <div className="flex items-center ">
              <span className="px-3 text-[13px] py-1 my-1 bg-slate-100 inline-block ms-1  rounded-sm">
                Max: {price.max}
                <span
                  onClick={() => {
                    maxPriceRef.current.value = "";
                    setPrice({ ...price, max: null });
                  }}
                  className="pl-3 hover:text-[#ff3030] cursor-pointer"
                >
                  <AiOutlineClose className="inline" />
                </span>
              </span>
            </div>
          )}
         
        </div>
      </div>
      <div className="border-b pb-5 mt-5">
        <Accordion title="PRICE">
          <div>
            <p className="text-gray-500 mt-3">
              The highest price is{"  "}
              <span className="text-black">$928.00</span>
            </p>
            <div className="">
              <div className="flex items-center gap-3 mt-3 justify-around">
                <span className="text-xl text-gray-500">$</span>
                <input
                  ref={minPriceRef}
                  placeholder="Min"
                  className="border px-3 py-2 w-20 text-center outline-none focus:border focus:border-[#3030ff] rounded-md"
                  type="number"
                />
                <input
                  ref={maxPriceRef}
                  placeholder="Max"
                  className="border px-1 py-2 w-20 text-center outline-none focus:border focus:border-[#3030ff] rounded-md"
                  type="number"
                />
              </div>

              <button
                onClick={handleClickFilterPrice}
                className="w-full py-2 border bg-[#3030ff] text-white rounded-md mt-3"
              >
                Apply
              </button>
            </div>
          </div>
        </Accordion>
      </div>
      {brands.length > 0 && (
        <div className="border-b pb-5 mt-5">
          <Accordion title="brand">
            <div className="mt-5">
              {brands.map((item) => (
                <label
                  key={item.id}
                  htmlFor={item.name}
                  className="flex justify-between mb-2 cursor-pointer"
                >
                  <div className="flex gap-3 items-center">
                    <input
                      type="checkbox"
                      checked={filter.brand.includes("" + item.id)}
                      value={item.id}
                      onChange={handleCheckboxChange}
                      name="brand"
                      className="brand"
                      id={item.name}
                    />
                    <span className="text-gray-500 pt-[2px]">
                      {item.name} ({item.product_count})
                    </span>
                  </div>
                </label>
              ))}
            </div>
          </Accordion>
        </div>
      )}
      <div className="border-b pb-5 mt-5">
        <Accordion title="AVAILABILITY">
          <div className="mt-5">
            <form action="" method="post">
              <label
                htmlFor=""
                className="flex justify-between mb-2 cursor-pointer"
              >
                <div className="flex gap-3 items-center">
                  <input type="checkbox" className="" id="" />
                  <span className="text-gray-500 pt-[2px]">Invalid (1)</span>
                </div>
              </label>
            </form>
          </div>
        </Accordion>
      </div>
    </>
  );
};

Filter.propTypes = {
  handleCheckboxChange: PropTypes.func,
  filter: PropTypes.object,
  setFilter: PropTypes.func,
  setPrice: PropTypes.func,
  price: PropTypes.object,
};
export default Filter;
