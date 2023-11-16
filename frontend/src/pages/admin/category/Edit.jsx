import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";
import {  Input, Select } from "../../../components/admin/form";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useApiCall } from "../../../hooks";
import { categoriesApi } from "../../../api/admin/categoriesApi";

const Edit = () => {
  const navigate = useNavigate();
  const [images, setImage] = useState(null);
  const [src, setSrc] = useState();
  const { id } = useParams();
  const { data: categories } = useApiCall(
    async () => {
      return await categoriesApi.getAll();
    },
    [],
    []
  );
  const { data } = useApiCall(
    async () => {
      return await categoriesApi.get(id);
    },
    [],
    []
  );
  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
        const imageUrl = URL.createObjectURL(selectedFile);
        setSrc(imageUrl);
        setImage(selectedFile)
      }
  };
  const handleSubmitSave = async (values) => {
    const formData = new FormData();
    formData.append("image", images);
    const fields = ["name", "parent_id", "metakey", "metadesc", "status"];
    fields.forEach((field) => {
      formData.append(field, values[field]);
    });
    try {
      const res = await categoriesApi.update(id,formData);
      console.log(res);
      if (res.status === 200) {
        toast.success("Cập nhật danh mục thành công");
        navigate("/admin/categories");
      }
    } catch (error) {
      toast.error("Cập nhật danh mục thất bại");
    }
  };
  if (!data.data) {
    return <p className="text-2xl mx-5 my-5">Loading...</p>;
  }
  console.log(data);
  const dataCategory = data?.data?.data;
  console.log(dataCategory);
  const listCategory = categories?.data?.data?.data;
  return (
    <div className="m-5">
      <Formik
        initialValues={{
          name: dataCategory.name,
          parent_id: dataCategory.parent_id,
          metakey: dataCategory.metakey,
          metadesc: dataCategory.metadesc,
          status: dataCategory.status,
        }}
        validationSchema={Yup.object({
          name: Yup.string().required("Name is required"),
          parent_id: Yup.string().required("Category is required"),
          metakey: Yup.string().required("Metakey is required"),
          metadesc: Yup.string().required("Metadesc is required"),
        })}
        onSubmit={(values) => handleSubmitSave(values)}
      >
        <Form>
          <div className="bg-white p-8 rounded-md w-full">
            <div className=" flex items-center justify-between">
              <div>
                <h1 className="text-gray-600 text-base font-semibold">
                  categories
                </h1>
                <span className="text-xs">Create categories item</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="lg:ml-40 ml-10 space-x-8">
                  <Link
                    to={"/admin/categories"}
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
              <div className=" w-full">
                <div className="bg-white p-5 ">
                  <h3 className="text-base uppercase">Thông tin</h3>
                  <div className="">
                    <Input
                      type="text"
                      label="Tên danh mục"
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-3 text-[14px] font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                      name="name"
                    />
                    <Select
                      label="Cấp cha"
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-3 text-[14px] font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                      name="parent_id"
                    >
                      <option value="0">Không có</option>
                      {listCategory?.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </Select>
                    <Select
                      label="Trạng thái"
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-3 text-[14px] font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                      name="status"
                    >
                      <option value="1">Hiện</option>
                      <option value="0">Ẩn</option>
                    </Select>
                  </div>
                </div>
                <div className="bg-white p-5 my-4">
                  <h3 className="text-base uppercase font-bold mb-4">Hình</h3>
                  <div>
                    <input
                      type="file"
                      className="w-full px-3 py-2 rounded-full border"
                      onChange={handleImageChange}
                    />
                   <div>
                    {
                        src && (
                            <img src={src} alt="" />
                        )
                    }
                   </div>
                  </div>
                </div>
                <div className="bg-white p-5 my-4">
                  <h3 className="text-base uppercase font-bold">SEO</h3>
                  <div>
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
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default Edit;
