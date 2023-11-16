import PropTypes from "prop-types";
import { useApiCall } from "../../../hooks";
import { productApi } from "../../../api/admin/productApi";
import { useState } from "react";
import { AppURL } from "../../../api/AppURL";
import NotImage from "../../../assets/image/icon-image-not-found-free-vector.jpg";

const Modal = ({ setShow, children, handleProductClick }) => {
  const [productId, setProductId] = useState(null);
  const [filter, setFilter] = useState({
    page: 1,
    limit: 10,
    category: "",
    brand: "",
    search: "",
    sortBy: "",
  });
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setFilter({ ...filter, search: e.target.value });
  };
  const { data } = useApiCall(
    async () => {
      return await productApi.getAll({ ...filter });
    },
    [filter],
    []
  );
  const listProduct = data?.data?.data?.data || [];
  return (
    <div>
      <div
        className="relative z-10"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="relative transform overflow-hidden rounded-lg bg-white  text-left shadow-xl transition-all sm:my-8 sm:w-[1000px] ">
              <div
                id="print-element"
                className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4"
              >
                <div>
                  <div className="">
                    <form action="" onSubmit={handleSearchSubmit} method="post">
                      <input
                        type="text"
                        onChange={(e) =>
                          setFilter({ ...filter, search: e.target.value })
                        }
                        placeholder="Tìm kiếm"
                        className="px-3 w-full py-2 rounded-sm border outline-none"
                      />
                      <button className="hidden"></button>
                    </form>
                  </div>
                  <div className="mt-10">
                    {listProduct?.map((item, index) => (
                      <div key={index} className="border px-5">
                        <label
                          htmlFor={item.name}
                          className="flex gap-4 my-3 items-center justify-between"
                        >
                          <div className=" flex items-center gap-3">
                            <input
                              onChange={(e) => setProductId({id: e.target.value,name: item.name,image: item.images[0]?.image_url})}
                              id={item.name}
                              name="product"
                              value={item.id}
                              type="radio"
                            />
                            <div>{item.id}</div>
                            <img
                              className="w-[50px] h-[50px]"
                              src={
                                item?.images[0]?.image_url
                                  ? AppURL.ImageUrl + item.images[0]?.image_url
                                  : NotImage
                              }
                              alt=""
                            />
                            {item.name}
                          </div>
                          <div className="">{item.quantity}</div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  onClick={() => handleProductClick(productId)}
                  className="inline-flex px-7 w-full justify-center rounded-md bg-red-600 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                >
                  Chọn
                </button>
                <button
                  type="button"
                  onClick={() => setShow(false)}
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
Modal.propTypes = {
  data: PropTypes.object,
  children: PropTypes.node,
  setShow: PropTypes.func,
};
export default Modal;
