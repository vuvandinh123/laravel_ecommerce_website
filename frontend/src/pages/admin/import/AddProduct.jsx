import { useState } from "react";
import Modal from "./Modal";
import { AppURL } from "../../../api/AppURL";
import PropTypes from "prop-types";
import { useApiCall } from "../../../hooks";
import { supplierApi } from "../../../api/admin/supplierApi";

const AddProduct = ({ listProduct, setListProduct }) => {
  const [index, setIndex] = useState(-1);
  const [show, setShow] = useState(false);
  const { data } = useApiCall(
    async () => {
      return await supplierApi.getAll();
    },
    [],
    []
  );
  const listSupplier = data?.data?.data?.data || [];
  const handleProductClick = (value) => {
    if (index != -1) {
      let newListProduct = [...listProduct];
      newListProduct[index] = { ...newListProduct[index], ...value };
      setListProduct(newListProduct);
    } else {
      setListProduct([...listProduct, value]);
    }
    setShow(false);
  };
  return (
    <>
      <div className="bg-white p-5 my-4">
        <h3 className="text-base uppercase ">Chọn sản phẩm muốn nhập</h3>
        <table className="w-full my-5">
          <thead>
            <tr>
              <th>Sản phẩm</th>
              <th>Nhà cung cấp</th>
              <th>Giá nhập</th>
              <th>Số lượng</th>
              <th>Tổng cộng</th>
            </tr>
          </thead>
          <tbody>
            {listProduct.map((item, index) => (
              <tr key={index}>
                <td className="text-center">
                  <div
                    onClick={() => {
                      setShow(true);
                      setIndex(index);
                    }}
                    className=" px-2 py-1 border rounded-md cursor-pointer"
                  >
                    <p className={`${item?.id && "hidden"} py-2`}>
                      chọn sản phẩm muốn nhập
                    </p>
                    <p>id :{item?.id}</p>
                    <div className="flex gap-3 items-center">
                      <img
                        width={"50px"}
                        src={AppURL.ImageUrl + item?.image}
                        alt=""
                      />
                      <h4>{item?.name}</h4>
                    </div>
                  </div>
                </td>
                <td className="text-center">
                  <select
                    id=""
                    name="supplier"
                    onChange={(e) => {
                      setListProduct(
                        listProduct.map((item, i) => {
                          if (i === index) {
                            return {
                              ...item,
                              supplierId: e.target.value,
                            };
                          }
                          return item;
                        })
                      );
                    }}
                    defaultValue={item?.supplierId}
                    className="py-2 px-3 w-44 border outline-none rounded-md"
                  >
                    <option value="">chon</option>
                    {
                      listSupplier?.map((item, i) => (
                        <option key={i} value={item?.id}>{item?.name}</option>
                      ))
                    }
                  </select>
                </td>
                <td className="text-center">
                  <input
                    onChange={(e) => {
                      setListProduct(
                        listProduct.map((item, i) => {
                          if (i === index) {
                            return {
                              ...item,
                              price: e.target.value,
                            };
                          }
                          return item;
                        })
                      );
                    }}
                    defaultValue={item?.price}
                    type="number"
                    className="text-center rounded-md border border-[#e0e0e0] bg-white py-2 px-3 text-[14px] font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                </td>

                <td className="text-center">
                  <input
                    onChange={(e) => {
                      setListProduct(
                        listProduct.map((item, i) => {
                          if (i === index) {
                            return {
                              ...item,
                              quantity: e.target.value,
                            };
                          }
                          return item;
                        })
                      );
                    }}
                    defaultValue={item?.quantity}
                    type="number"
                    className=" text-center rounded-md border border-[#e0e0e0] bg-white py-2 px-3 text-[14px] font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                </td>
                <td className="text-center">
                  <input
                    type="number"
                    value={item?.quantity * (item?.price || 1)}
                    readOnly
                    className=" text-center rounded-md border border-[#e0e0e0] bg-white py-2 px-3 text-[14px] font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                </td>
                <td>
                  <button
                    onClick={() =>
                      setListProduct(
                        listProduct.filter((item, i) => i !== index)
                      )
                    }
                    className="text-red-600 px-4 py-2"
                  >
                    x
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-end">
          <span
            className="bg-blue-600 px-4 py-3 rounded-md text-white font-semibold tracking-wide cursor-pointer"
            onClick={() => setListProduct([...listProduct, {}])}
          >
            Thêm
          </span>
        </div>
      </div>
      {show && (
        <Modal
          show={show}
          handleProductClick={handleProductClick}
          setShow={setShow}
        ></Modal>
      )}
    </>
  );
};
AddProduct.propTypes = {
  listProduct: PropTypes.object.isRequired,
  setListProduct: PropTypes.func,
};
export default AddProduct;
