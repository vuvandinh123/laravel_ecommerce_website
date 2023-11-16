import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useRef, useState } from "react";
import { Editorjs, File, Input, Select } from "../../../components/admin/form";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useApiCall } from "../../../hooks";
import { productApi } from "../../../api/admin/productApi";
import { getRequestAdmin, postRequestAdmin } from "../../../api/requestAdmin";
import { BRANDS, CATEGORIES, PRODUCTS } from "../../../constants/constants";

const Create = () => {
  const navigate = useNavigate();
  const [images, setImage] = useState([]);
  const editorRef = useRef(null);
  const detailRef = useRef(null);

  const { data: categories } = useApiCall(
    async () => {
      return await getRequestAdmin(CATEGORIES, { limit: 100 });
    },
    [],
    []
  );
  const { data: brands } = useApiCall(
    async () => {
      return await getRequestAdmin(BRANDS, { limit: 100 });
    },
    [],
    []
  );
  const handleSubmitSave = async (values) => {
    const formData = new FormData();
    for (let i = 0; i < images.length; i++) {
      formData.append("images[]", images[i]);
    }
    const fields = [
      "name",
      "price",
      "description",
      "brand",
      "category",
      "wholesale_price",
      "retail_price",
      "detail",
      "metakey",
      "metadesc",
      "metatitle",
      "status",
    ];
    fields.forEach((field) => {
      formData.append(field, values[field]);
    });
    formData.append("detail", detailRef.current.getContent());
    formData.append("description", editorRef.current.getContent());
    try {
      const res = await postRequestAdmin(PRODUCTS, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if(res){
        toast.success("Thêm sản phẩm thành công");
        navigate("/admin/products");
      }
    } catch (error) {
      toast.error("Thêm sản phẩm thất bại");
    }
  };

  const listCategory = categories?.data?.data;
  const listBrand = brands?.data?.data;
  return (
    <div className="m-5">
      <Formik
        initialValues={{
          name: "",
          price: "",
          brand: "",
          category: "",
          wholesale_price: "",
          retail_price: "",
          metakey: "",
          metadesc: "",
          metatitle: "",
          status: 1,
        }}
        validationSchema={Yup.object({
          name: Yup.string().required("Name is required"),
          price: Yup.string().required("Price is required"),
          brand: Yup.string().required("Brand is required"),
          category: Yup.string().required("Category is required"),
          wholesale_price: Yup.string().required("Wholesale price is required"),
          retail_price: Yup.string().required("Retail price is required"),
          metakey: Yup.string().required("Metakey is required"),
          metadesc: Yup.string().required("Metadesc is required"),
          metatitle: Yup.string().required("Metatitle is required"),
        })}
        onSubmit={(values) => handleSubmitSave(values)}
      >
        <Form>
          <div className="bg-white p-8 rounded-md w-full">
            <div className=" flex items-center justify-between">
              <div>
                <h1 className="text-gray-600 text-base font-semibold">
                  Products
                </h1>
                <span className="text-xs">Create products item</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="lg:ml-40 ml-10 space-x-8">
                  <Link
                    to={"/admin/products"}
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
            <div className="flex gap-2">
              <div className=" basis-2/3  ">
                <div className="bg-white p-5 ">
                  <h3 className="text-base uppercase">Thông tin sản phẩm</h3>
                  <div className="">
                    <Input
                      type="text"
                      label="Tên sản phẩm"
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-3 text-[14px] font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                      placeholder="Iphone 15 PRO MAX"
                      name="name"
                    />
                    <div className="mb-5 grid grid-cols-3 gap-9">
                      <Input
                        type="number"
                        label="Giá nhập"
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-3 text-[14px] font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        placeholder="1234"
                        name="price"
                      />
                      <Input
                        type="number"
                        label="Giá bán sỉ"
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-3 text-[14px] font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        placeholder="1234"
                        name="wholesale_price"
                      />
                      <Input
                        type="number"
                        label="Giá bán lẻ"
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-3 text-[14px] font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        placeholder="1234"
                        name="retail_price"
                      />
                    </div>
                    <Editorjs
                      editorRef={editorRef}
                      label={"Mô tả sản phẩm"}
                      init={{ height: 300, menubar: false }}
                    />
                    <Editorjs
                      editorRef={detailRef}
                      label={"Chi tiếp sản phẩm"}
                      init={{ height: 500, menubar: true }}
                    />
                  </div>
                </div>
                <div className="bg-white p-5 my-4">
                  <h3 className="text-base uppercase font-bold mb-4">Hình</h3>
                  <div>
                    <File
                      setImage={setImage}
                      type="file"
                      className="hidden"
                      name="image"
                      id="image"
                    />
                  </div>
                </div>
                <div className="bg-white p-5 my-4">
                  <h3 className="text-base uppercase font-bold">SEO</h3>
                  <div>
                    <Input
                      type="text"
                      label="Meta Title"
                      name="metatitle"
                      placeholder="Iphone 15 PRO MAX"
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-3 text-[14px] font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    />
                    <Input
                      type="text"
                      label="Meta description"
                      name="metadesc"
                      placeholder="Iphone 15 PRO MAX"
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-3 text-[14px] font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    />
                    <Input
                      type="text"
                      label="Meta keyword"
                      name="metakey"
                      placeholder=""
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-3 text-[14px] font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    />
                  </div>
                </div>
              </div>
              <div className=" basis-1/3 ">
                <div className="bg-white  p-5 mb-3  h-full rounded-md ">
                  <h3 className="text-base uppercase">Chi tiết</h3>
                  <div className="">
                    <Select
                      label={"Danh mục"}
                      name="category"
                      placeholder="Iphone 15 PRO MAX"
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-3 text-[13px] font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    >
                      <option value="" selected>
                        Danh mục
                      </option>
                      {listCategory?.length > 0 &&
                        listCategory?.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                    </Select>
                    <Select
                      label={"Thương hiệu"}
                      name="brand"
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-3 text-[13px] font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    >
                      <option value="" selected>
                        Thương hiệu
                      </option>
                      {listBrand?.length > 0 &&
                        listBrand?.map((brand) => (
                          <option key={brand.id} value={brand.id}>
                            {brand.name}
                          </option>
                        ))}
                    </Select>
                    <Select
                      label={"Trạng thái"}
                      name="status"
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-3 text-[13px] font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    >
                      <option value="1">Hiện</option>
                      <option value="2">Ẩn</option>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default Create;
