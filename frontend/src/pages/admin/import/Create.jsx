import { Link, useNavigate } from "react-router-dom";
import { Input, Textarea } from "../../../components/admin/form";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import AddProduct from "./AddProduct";
import { useState } from "react";
import { invoicesApi } from "../../../api/admin/invoices";
import { toast } from "react-toastify";

const Create = () => {
  const navigate = useNavigate();
  const [listProduct, setListProduct] = useState([{}]);
  const handleSubmitSave = async (values) => {
    let product = []
    for (let i = 0; i < listProduct.length; i++) {
      product.push({product_id:listProduct[i].id,supplier_id:listProduct[i].supplierId,price:listProduct[i].price,quantity:listProduct[i].quantity})
    }
    const data = {
      content: values.content,
      note: values.note,
      details:product
    }
    try {
      const res = await invoicesApi.create(data);
      if (res.status === 200) {
        toast.success("Thêm sản phẩm thành công");
        navigate("/admin/import-product");
      }
    } catch (error) {
      toast.error("Thêm sản phẩm thất bại");
    }
  };
  return (
    <div className="m-5">
      <Formik
        initialValues={{
          content:"",
          note:""
        }}
        validationSchema={Yup.object({
          content: Yup.string().required("content is required"),
          note: Yup.string().required("note is required"),
        })}
        onSubmit={(values) => handleSubmitSave(values)}
      >
        <Form>
          <div className="bg-white p-8 rounded-md w-full">
            <div className=" flex items-center justify-between">
              <div>
                <h1 className="text-gray-600 text-base font-semibold">
                  Nhập hàng
                </h1>
                <span className="text-xs"></span>
              </div>
              <div className="flex items-center justify-between">
                <div className="lg:ml-40 ml-10 space-x-8">
                  <Link
                    to={"/admin/import-product"}
                    className="bg-indigo-600 px-4 py-3 rounded-md text-white font-semibold tracking-wide cursor-pointer"
                  >
                    Quay lại
                  </Link>
                  <button
                    type="submit"
                    className="bg-blue-600 px-4 py-3 rounded-md text-white font-semibold tracking-wide cursor-pointer"
                  >
                    Lưu
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="my-4">
            <div className="">
              <div className=" ">
                <div className="bg-white p-5 ">
                  <h3 className="text-base uppercase">Thông tin hoá đơn</h3>
                  <div className="">
                    <Input
                      type="text"
                      label="Ghi chú"
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-3 text-[14px] font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                      name="note"
                    />
                    <Textarea
                      label="Nội dung"
                      cols="30"
                      rows="2"
                      name="content"
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-3 text-[14px] font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    />
                  </div>
                </div>
                <AddProduct listProduct={listProduct} setListProduct={setListProduct}/>
              </div>
            </div>
          </div>
        </Form>
      </Formik>
      
    </div>
  );
};

export default Create;
