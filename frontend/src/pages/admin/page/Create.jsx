import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useRef, useState } from "react";
import { Editorjs, File, Input, Select } from "../../../components/admin/form";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useApiCall } from "../../../hooks";
import { categoriesApi } from "../../../api/admin/categoriesApi";
import { pageApi } from "../../../api/admin/pageApi";
const Create = () => {
  const navigate = useNavigate();
  const detailRef = useRef(null);
  const descriptionRef = useRef(null);
  const [images, setImage] = useState([]);
  const [src, setSrc] = useState();
  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const imageUrl = URL.createObjectURL(selectedFile);
      setSrc(imageUrl);
      setImage(selectedFile);
    }
  };
  const handleSubmitSave = async (values) => {
    const formData = new FormData();
    formData.append("image", images);
    const fields = ["title", "type","status"];
    fields.forEach((field) => {
      formData.append(field, values[field]);
    });
    formData.append("compact", descriptionRef.current.getContent());
    formData.append("content", detailRef.current.getContent());
    try {
      const res = await pageApi.create(formData);
      if (res.status === 200) {
        toast.success("Thêm sản phẩm thành công");
        navigate("/admin/pages");
      }
    } catch (error) {
      toast.error("Thêm sản phẩm thất bại");
    }
  };

  return (
    <div className="m-5">
      <Formik
        initialValues={{
          title: "",
          topic_id: 1,
          created_by: 1,
          type: "page",
          status: 1,
        }}
        validationSchema={Yup.object({
          title: Yup.string().required("Name is required"),
        })}
        onSubmit={(values) => handleSubmitSave(values)}
      >
        <Form>
          <div className="bg-white p-8 rounded-md w-full">
            <div className=" flex items-center justify-between">
              <div>
                <h1 className="text-gray-600 text-base font-semibold">
                  Trang đơn
                </h1>
                <span className="text-xs">Create page item</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="lg:ml-40 ml-10 space-x-8">
                  <Link
                    to={"/admin/page"}
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
                      label="Tiêu đề"
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-3 text-[14px] font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                      name="title"
                    />

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
                    <div>{src && <img src={src} alt="" />}</div>
                  </div>
                </div>
                <div className="bg-white p-5 my-4">
                  <h3 className="text-base uppercase font-bold mb-4">
                    Nội dung
                  </h3>
                  <div>
                    <Editorjs
                      editorRef={descriptionRef}
                      label={"Mô tả ngắn"}
                      init={{ height: 300, menubar: false }}
                    />
                    <Editorjs
                      editorRef={detailRef}
                      label={"Chi tiếp bài viết"}
                      init={{ height: 500, menubar: true }}
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

export default Create;
