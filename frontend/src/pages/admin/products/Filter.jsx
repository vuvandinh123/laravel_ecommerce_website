import PropTypes from "prop-types";
import { useApiCall } from "../../../hooks";
import { getRequestAdmin } from "../../../api/requestAdmin";
import { BRANDS, CATEGORIES } from "../../../constants/constants";

const Filter = ({ setFilter, filter }) => {
  const { data: categories } = useApiCall(
    async () => {
      return await getRequestAdmin(CATEGORIES, {limit: 100});
    },
    [],
    []
  );
  const { data: brands } = useApiCall(
    async () => {
      return await getRequestAdmin(BRANDS, {limit: 100});
    },
    [],
    []
  );

  const listCategory = categories?.data?.data;
  const listBrand = brands?.data?.data;
  return (
    <>
      <div className="flex justify-between items-center">
        <h5 className="uppercase font-semibold">Lọc</h5>
        <div className="flex gap-5">
          <div>
            <label className="text-gray-500 text-[12px]" htmlFor="">
              Sắp xếp:{" "}
            </label>
            <select
              className="border  rounded-md px-3 py-1 outline-none"
              name=""
              onChange={(e) => setFilter({ ...filter, sortBy: e.target.value })}
              id=""
            >
              <option value="Date-new-to-old">Mới đến cũ</option>
              <option value="Date-old-to-new">Cũ đến mới</option>
              <option value="AlphabeticallyA-Z">Theo chữ cái, A-Z</option>
              <option value="AlphabeticallyZ-A">Theo chữ cái, Z-A</option>
              <option value="Price-low-to-high">Giá thấp đến cao</option>
              <option value="Price-low-to-low">Giá cao đến thấp</option>
            </select>
          </div>
          <div>
            <label className="text-gray-500 text-[12px]" htmlFor="">
              Thương hiệu:{" "}
            </label>
            <select
              className="border w-32 rounded-md px-3 py-1 outline-none"
              name=""
              onChange={(e) =>
                setFilter({
                  ...filter,
                  brand: JSON.stringify([Number(e.target.value)]),
                })
              }
              id=""
            >
              <option value="all">Tất cả</option>
              {listBrand?.map((brand) => {
                return (
                  <option key={brand.id} value={brand.id}>
                    {brand.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            <label className="text-gray-500 text-[12px]" htmlFor="">
              Danh mục:{" "}
            </label>
            <select
              className="border w-32 rounded-md px-3 py-1 outline-none"
              name=""
              onChange={(e) =>
                setFilter({ ...filter, category: e.target.value })
              }
              id=""
            >
              <option value="">Tất cả</option>
              {listCategory?.map((category) => {
                return (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            <label className="text-gray-500  text-[12px]" htmlFor="">
              Hiển thị:{" "}
            </label>
            <select
              className="border rounded-md w-20 px-3 py-1 outline-none"
              name=""
              onChange={(e) =>
                setFilter({
                  ...filter,
                  limit: Number(e.target.value),
                })
              }
              id=""
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
};
Filter.propTypes = {
  setFilter: PropTypes.func.isRequired,
  filter: PropTypes.object.isRequired,
};
export default Filter;
