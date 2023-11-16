import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import Product2 from "./Product2";
import Product from "./Product";
import PlacehoderCard from "./PlacehoderCard";
import Loader from "./Loader";

const LayoutProduct = ({ data, loading,setSortBy,setParams,params }) => {
  var co = JSON.parse(localStorage.getItem("col")) || 0;
  const [col, setCol] = useState(co);
  useEffect(() => {
    if (col != 0) {
      localStorage.setItem("col", JSON.stringify(col));
    }
    const handleResize = () => {
      setCol(0);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [col]);
  const handleChangeSort = (e) => {
    setSortBy(e.target.value);
    setParams({ ...params, sortBy: e.target.value });
  }
  return (
    <>
      {loading && <Loader />}
      <div className="bg-white p-5 rounded-md">
        <div className="flex justify-between items-center">
          <div>
            <span className="font-bold">{data.length}</span>{" "}
            <span className="text-gray-500">Products</span>
          </div>
          <div>
            <ul className="flex items-center gap-5">
              <li
                className="hidden lg:block cursor-pointer"
                onClick={() => setCol(3)}
              >
                <svg
                  className=""
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill={col === 3 ? "black" : "#d7d7e0"}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M2 4C3.10457 4 4 3.10457 4 2C4 0.89543 3.10457 0 2 0C0.89543 0 0 0.89543 0 2C0 3.10457 0.89543 4 2 4Z"></path>
                  <path d="M2 10C3.10457 10 4 9.10457 4 8C4 6.89543 3.10457 6 2 6C0.89543 6 0 6.89543 0 8C0 9.10457 0.89543 10 2 10Z"></path>
                  <path d="M2 16C3.10457 16 4 15.1046 4 14C4 12.8954 3.10457 12 2 12C0.89543 12 0 12.8954 0 14C0 15.1046 0.89543 16 2 16Z"></path>
                  <path d="M8 4C9.10457 4 10 3.10457 10 2C10 0.89543 9.10457 0 8 0C6.89543 0 6 0.89543 6 2C6 3.10457 6.89543 4 8 4Z"></path>
                  <path d="M8 10C9.10457 10 10 9.10457 10 8C10 6.89543 9.10457 6 8 6C6.89543 6 6 6.89543 6 8C6 9.10457 6.89543 10 8 10Z"></path>
                  <path d="M8 16C9.10457 16 10 15.1046 10 14C10 12.8954 9.10457 12 8 12C6.89543 12 6 12.8954 6 14C6 15.1046 6.89543 16 8 16Z"></path>
                  <path d="M14 4C15.1046 4 16 3.10457 16 2C16 0.89543 15.1046 0 14 0C12.8954 0 12 0.89543 12 2C12 3.10457 12.8954 4 14 4Z"></path>
                  <path d="M14 10C15.1046 10 16 9.10457 16 8C16 6.89543 15.1046 6 14 6C12.8954 6 12 6.89543 12 8C12 9.10457 12.8954 10 14 10Z"></path>
                  <path d="M14 16C15.1046 16 16 15.1046 16 14C16 12.8954 15.1046 12 14 12C12.8954 12 12 12.8954 12 14C12 15.1046 12.8954 16 14 16Z"></path>
                </svg>
              </li>
              <li
                className="hidden lg:block cursor-pointer"
                onClick={() => setCol(4)}
              >
                <svg
                  width="22"
                  height="16"
                  viewBox="0 0 22 16"
                  fill={col === 4 ? "black" : "#d7d7e0"}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M2 4C3.10457 4 4 3.10457 4 2C4 0.89543 3.10457 0 2 0C0.89543 0 0 0.89543 0 2C0 3.10457 0.89543 4 2 4Z"></path>
                  <path d="M2 10C3.10457 10 4 9.10457 4 8C4 6.89543 3.10457 6 2 6C0.89543 6 0 6.89543 0 8C0 9.10457 0.89543 10 2 10Z"></path>
                  <path d="M2 16C3.10457 16 4 15.1046 4 14C4 12.8954 3.10457 12 2 12C0.89543 12 0 12.8954 0 14C0 15.1046 0.89543 16 2 16Z"></path>
                  <path d="M8 4C9.10457 4 10 3.10457 10 2C10 0.89543 9.10457 0 8 0C6.89543 0 6 0.89543 6 2C6 3.10457 6.89543 4 8 4Z"></path>
                  <path d="M8 10C9.10457 10 10 9.10457 10 8C10 6.89543 9.10457 6 8 6C6.89543 6 6 6.89543 6 8C6 9.10457 6.89543 10 8 10Z"></path>
                  <path d="M8 16C9.10457 16 10 15.1046 10 14C10 12.8954 9.10457 12 8 12C6.89543 12 6 12.8954 6 14C6 15.1046 6.89543 16 8 16Z"></path>
                  <path d="M14 4C15.1046 4 16 3.10457 16 2C16 0.89543 15.1046 0 14 0C12.8954 0 12 0.89543 12 2C12 3.10457 12.8954 4 14 4Z"></path>
                  <path d="M14 10C15.1046 10 16 9.10457 16 8C16 6.89543 15.1046 6 14 6C12.8954 6 12 6.89543 12 8C12 9.10457 12.8954 10 14 10Z"></path>
                  <path d="M14 16C15.1046 16 16 15.1046 16 14C16 12.8954 15.1046 12 14 12C12.8954 12 12 12.8954 12 14C12 15.1046 12.8954 16 14 16Z"></path>
                  <path d="M20 4C21.1046 4 22 3.10457 22 2C22 0.89543 21.1046 0 20 0C18.8954 0 18 0.89543 18 2C18 3.10457 18.8954 4 20 4Z"></path>
                  <path d="M20 10C21.1046 10 22 9.10457 22 8C22 6.89543 21.1046 6 20 6C18.8954 6 18 6.89543 18 8C18 9.10457 18.8954 10 20 10Z"></path>
                  <path d="M20 16C21.1046 16 22 15.1046 22 14C22 12.8954 21.1046 12 20 12C18.8954 12 18 12.8954 18 14C18 15.1046 18.8954 16 20 16Z"></path>
                </svg>
              </li>
              <li
                className="hidden lg:block cursor-pointer"
                onClick={() => setCol(5)}
              >
                <svg
                  width="28"
                  height="16"
                  viewBox="0 0 28 16"
                  fill={col === 5 ? "black" : "#d7d7e0"}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M2 4C3.10457 4 4 3.10457 4 2C4 0.89543 3.10457 0 2 0C0.89543 0 0 0.89543 0 2C0 3.10457 0.89543 4 2 4Z"></path>
                  <path d="M2 10C3.10457 10 4 9.10457 4 8C4 6.89543 3.10457 6 2 6C0.89543 6 0 6.89543 0 8C0 9.10457 0.89543 10 2 10Z"></path>
                  <path d="M2 16C3.10457 16 4 15.1046 4 14C4 12.8954 3.10457 12 2 12C0.89543 12 0 12.8954 0 14C0 15.1046 0.89543 16 2 16Z"></path>
                  <path d="M8 4C9.10457 4 10 3.10457 10 2C10 0.89543 9.10457 0 8 0C6.89543 0 6 0.89543 6 2C6 3.10457 6.89543 4 8 4Z"></path>
                  <path d="M8 10C9.10457 10 10 9.10457 10 8C10 6.89543 9.10457 6 8 6C6.89543 6 6 6.89543 6 8C6 9.10457 6.89543 10 8 10Z"></path>
                  <path d="M8 16C9.10457 16 10 15.1046 10 14C10 12.8954 9.10457 12 8 12C6.89543 12 6 12.8954 6 14C6 15.1046 6.89543 16 8 16Z"></path>
                  <path d="M14 4C15.1046 4 16 3.10457 16 2C16 0.89543 15.1046 0 14 0C12.8954 0 12 0.89543 12 2C12 3.10457 12.8954 4 14 4Z"></path>
                  <path d="M14 10C15.1046 10 16 9.10457 16 8C16 6.89543 15.1046 6 14 6C12.8954 6 12 6.89543 12 8C12 9.10457 12.8954 10 14 10Z"></path>
                  <path d="M14 16C15.1046 16 16 15.1046 16 14C16 12.8954 15.1046 12 14 12C12.8954 12 12 12.8954 12 14C12 15.1046 12.8954 16 14 16Z"></path>
                  <path d="M20 4C21.1046 4 22 3.10457 22 2C22 0.89543 21.1046 0 20 0C18.8954 0 18 0.89543 18 2C18 3.10457 18.8954 4 20 4Z"></path>
                  <path d="M20 10C21.1046 10 22 9.10457 22 8C22 6.89543 21.1046 6 20 6C18.8954 6 18 6.89543 18 8C18 9.10457 18.8954 10 20 10Z"></path>
                  <path d="M20 16C21.1046 16 22 15.1046 22 14C22 12.8954 21.1046 12 20 12C18.8954 12 18 12.8954 18 14C18 15.1046 18.8954 16 20 16Z"></path>
                  <path d="M26 4C27.1046 4 28 3.10457 28 2C28 0.89543 27.1046 0 26 0C24.8954 0 24 0.89543 24 2C24 3.10457 24.8954 4 26 4Z"></path>
                  <path d="M26 10C27.1046 10 28 9.10457 28 8C28 6.89543 27.1046 6 26 6C24.8954 6 24 6.89543 24 8C24 9.10457 24.8954 10 26 10Z"></path>
                  <path d="M26 16C27.1046 16 28 15.1046 28 14C28 12.8954 27.1046 12 26 12C24.8954 12 24 12.8954 24 14C24 15.1046 24.8954 16 26 16Z"></path>
                </svg>
              </li>
              <li
                className="hidden lg:block cursor-pointer"
                onClick={() => setCol(1)}
              >
                <svg
                  width="20"
                  height="16"
                  viewBox="0 0 20 16"
                  fill={col === 1 ? "black" : "#d7d7e0"}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M2 4C3.10457 4 4 3.10457 4 2C4 0.89543 3.10457 0 2 0C0.89543 0 0 0.89543 0 2C0 3.10457 0.89543 4 2 4Z"></path>
                  <path d="M2 10C3.10457 10 4 9.10457 4 8C4 6.89543 3.10457 6 2 6C0.89543 6 0 6.89543 0 8C0 9.10457 0.89543 10 2 10Z"></path>
                  <path d="M2 16C3.10457 16 4 15.1046 4 14C4 12.8954 3.10457 12 2 12C0.89543 12 0 12.8954 0 14C0 15.1046 0.89543 16 2 16Z"></path>
                  <path d="M20 2C20 2.552 19.553 3 19 3H7C6.448 3 6 2.552 6 2C6 1.448 6.448 1 7 1H19C19.553 1 20 1.447 20 2Z"></path>
                  <path d="M20 8C20 8.552 19.553 9 19 9H7C6.448 9 6 8.552 6 8C6 7.448 6.448 7 7 7H19C19.553 7 20 7.447 20 8Z"></path>
                  <path d="M20 14C20 14.552 19.553 15 19 15H7C6.448 15 6 14.552 6 14C6 13.447 6.448 13 7 13H19C19.553 13 20 13.447 20 14Z"></path>
                </svg>
              </li>
            </ul>
          </div>
          <div>
            <span className="text-gray-500 me-3">Sort by:</span>
            <select
              name=""
              id=""
              onChange={handleChangeSort}
              className="outline-none p-2 border rounded-md"
            >
              <option value="Featured">Featured</option>
              <option value="BestSelling">Best selling</option>
              <option value="AlphabeticallyA-Z"> Alphabetically, A-Z</option>
              <option value="AlphabeticallyZ-A">Alphabetically, Z-A</option>
              <option value="Price-low-to-high">Price, low to high</option>
              <option value="Price-low-to-low">Price, high to low</option>
              <option value="Date-old-to-new">Date, old to new</option>
              <option value="Date-new-to-old">Date, new to old</option>
            </select>
          </div>
        </div>
      </div>
      <div
        style={{
          gridTemplateColumns: col !== 0 ? `repeat(${col}, 1fr)` : "",
        }}
        className={` ${col != 1 && "grid"} ${
          col == 0 &&
          "min-[500px]:grid-cols-2 min-[600px]:grid-cols-3 min-[900px]:grid-cols-4 min-[1000px]:grid-cols-3 min-[1280px]:grid-cols-4 min-[1400px]:grid-cols-5"
        }  gap-y-2 mt-3 grid-cols-${col}`}
      >
        {!loading
          ? data.map((item, index) => (
              <div key={index} className="mb-1">
                {col == 1 ? (
                  <Product2 data={item} key={index} />
                ) : (
                  <Product data={item} key={index} />
                )}
              </div>
            ))
          : Array(data?.length || 10)
              .fill(null)
              .map((item, index) => <PlacehoderCard key={index} />)}
      </div>
      {!loading && data.length === 0 && (
        <p className="text-center my-10 text-xl text-gray-400">PRODUCTS NOT FOUND</p>
      )}
    </>
  );
};
LayoutProduct.propTypes = {
  data: PropTypes.array.isRequired,
  loading: PropTypes.bool,
  progress: PropTypes.number,
  setSortBy: PropTypes.func,
  setParams: PropTypes.func,
  params: PropTypes.object,
};

export default LayoutProduct;
