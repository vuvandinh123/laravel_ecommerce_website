import { useState } from "react";
import Accordion from "../../../components/baskets/Accordion";
import { useApiCall } from "../../../hooks";
import { checkPropTypes } from "prop-types";
import { getRequestAdmin, postRequestAdmin } from "../../../api/requestAdmin";
import { MENUS } from "../../../constants/constants";
import { toast } from "react-toastify";

const Siderbar = ({ setIsReset, menus }) => {
  const url = "menus/category";
  const url2 = "brands";
  const url3 = "pages";
  const [params, setParams] = useState({
    brand: [],
    categories: [],
  });
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [pages, setPages] = useState([]);
  useApiCall(
    async () => {
      await fetchApi();
      setParams({
        brand: [],
        categories: [],
      });
    },
    [menus],
    []
  );
  async function fetchApi() {
    const res = await getRequestAdmin(url, { limit: 20 });
    const res2 = await getRequestAdmin(url2, { limit: 20 });
    const res3 = await getRequestAdmin(url3, { limit: 20 });
    if (res.status === 200) {
      setCategories(res.data);
    }
    if (res2.status === 200) {
      setBrands(res2.data.data);
    }
    if (res3.status === 200) {
      setPages(res3.data.data);
    }
    return null;
  }
  const handleCheckboxChange = (value, isChecked, name) => {
    if (name == "categories") {
      setParams((item) => {
        if (isChecked) {
          if (!item.categories.includes(value)) {
            return {
              ...item,
              categories: [...item.categories, value],
            };
          }
        } else {
          return {
            ...item,
            categories: item.categories.filter((item) => item !== value),
          };
        }
        return item;
      });
    } else if (name == "brands") {
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
  const handleSubmitCategory = (e) => {
    e.preventDefault();
    async function fetchApiMenus() {
      const res = await postRequestAdmin(MENUS, {
        category: params.categories,
        type: "categories",
      });
      if (res) {
        setIsReset(true);
        fetchApi();
        toast.success("Thêm menu thành công");
      }
    }
    if(params.categories.length > 0){
      fetchApiMenus();
    }
    else{
      toast.warning("Vui lòng chọn ít nhất 1 danh mục");
    }
  };
  const handleSubmitBrand = (e) => {
    e.preventDefault();
    async function fetchApiMenus() {
      const res = await postRequestAdmin("menus", {
        brand: params.brand,
        type: "brands",
      });
      console.log(res);
      setIsReset(true);
      fetchApi();
    }
    fetchApiMenus();
  };
  return (
    <>
      <div className="grid divide-y divide-neutral-200 max-w-xl mx-auto">
        <Accordion title={"Danh mục"}>
          <div>
            <form onSubmit={handleSubmitCategory} action="">
              <ul className="leading-6">
                {categories?.map((item) => (
                  <li key={item.id}>
                    <label
                      className="hover:text-blue-500 hover:bg-gray-100 transition-all py-1 px-2 flex cursor-pointer items-center gap-3"
                      htmlFor={item.name}
                    >
                      <input
                        type="checkbox"
                        onChange={(e) =>
                          handleCheckboxChange(
                            item.id,
                            e.target.checked,
                            "categories"
                          )
                        }
                        id={item.name}
                        name="categories"
                        value={item.id}
                      />
                      <span>{item.name}</span>
                    </label>
                  </li>
                ))}
              </ul>
              <button className="w-full hover:bg-blue-700 transition-all px-3 py-2 bg-blue-500 rounded-lg text-white mt-2">
                Thêm
              </button>
            </form>
          </div>
        </Accordion>
        <Accordion title={"Thương hiệu"}>
          <div>
            <form action="" onSubmit={handleSubmitBrand}>
              <ul className="leading-6">
                {brands?.map((item) => (
                  <li key={item.id}>
                    <label
                      className="hover:text-blue-500 hover:bg-gray-100 transition-all py-1 px-2 flex cursor-pointer items-center gap-3"
                      htmlFor={item.name}
                    >
                      <input
                        onChange={(e) =>
                          handleCheckboxChange(
                            item.id,
                            e.target.checked,
                            "brands"
                          )
                        }
                        type="checkbox"
                        id={item.name}
                        name="brands"
                        value={item.id}
                      />
                      <span>{item.name}</span>
                    </label>
                  </li>
                ))}
              </ul>
              <button className="w-full hover:bg-blue-700 transition-all px-3 py-2 bg-blue-500 rounded-lg text-white mt-2">
                Thêm
              </button>
            </form>
          </div>
        </Accordion>
        <Accordion title={"Trang đơn"}>
          <div>
            <form action="">
              <ul className="leading-6">
                {pages?.map((item) => (
                  <li key={item.id}>
                    <label
                      className="hover:text-blue-500 hover:bg-gray-100 transition-all py-1 px-2 flex cursor-pointer items-center gap-3"
                      htmlFor={item.title}
                    >
                      <input
                        type="checkbox"
                        id={item.title}
                        name="categories"
                        value={item.id}
                      />
                      <span>{item.title}</span>
                    </label>
                  </li>
                ))}
              </ul>
              <button className="w-full hover:bg-blue-700 transition-all px-3 py-2 bg-blue-500 rounded-lg text-white mt-2">
                Thêm
              </button>
            </form>
          </div>
        </Accordion>
        <Accordion title={"Tự tạo"}>
          <div>
            <form action="">
              <input
                type="text"
                className="px-3 py-2 rounded-md outline-none border focus:border-blue-500 w-full"
                placeholder="Tên hiển thị"
              />
              <input
                type="text"
                className="px-3 mt-3 py-2 rounded-md outline-none border focus:border-blue-500 w-full"
                placeholder="http://example/"
              />
              <button className="w-full hover:bg-blue-700 transition-all px-3 py-2 bg-blue-500 rounded-lg text-white mt-2">
                Thêm
              </button>
            </form>
          </div>
        </Accordion>
      </div>
    </>
  );
};
Siderbar.propTypes = {
  setIsReset: checkPropTypes.func,
  menus: checkPropTypes.array,
};
export default Siderbar;
