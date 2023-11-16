import { AppURL } from "../../../api/AppURL";
import { productApi } from "../../../api/admin/productApi";

import { useApiCall } from "../../../hooks";
import { Link, useParams } from "react-router-dom";
import formathDate from "../../../utils/formathDate";

const Show = () => {
  const { slug } = useParams();
  const { data } = useApiCall(
    async () => {
      return await productApi.get(slug);
    },
    [],
    []
  );

  const product = data?.data;
  return (
    <div className="m-5">
      {/* component */}
      <div className="bg-white p-8 rounded-md w-full">
        <div className=" flex items-center justify-between">
          <div>
            <h1 className="text-gray-600 font-semibold">Sản phẩm</h1>
            <span className="text-xs">Show products item</span>
          </div>
          <div className="flex items-center justify-between">
            <Link
              to={"/admin/products"}
              className="bg-blue-500 text-white px-3 py-2 rounded"
            >
              Quay lại
            </Link>
          </div>
        </div>
      </div>
      <div className="my-4">
        <div className="flex gap-2">
          <div className=" basis-1/3  ">
            <div className="bg-white  p-5 mb-3  h-full rounded-md ">
              <h3 className="text-base uppercase mb-3">Hình</h3>
              <div className="flex flex-wrap gap-4">
                {product?.images?.length > 0 &&
                  product?.images.map((image) => (
                    <img
                      className="w-40"
                      key={image.id}
                      src={AppURL.ImageUrl + image?.image_url}
                      alt=""
                    />
                  ))}
              </div>
            </div>
          </div>
          <div className=" basis-2/3 ">
            <div className="bg-white  p-5 mb-3  h-full rounded-md ">
              <h3 className="text-base uppercase">Chi tiết</h3>
              <table className="mt-2 min-w-full">
                <tbody className="table-auto ">
                  <tr className="border-b">
                    <th className="w-52 text-left px-6 py-4">ID</th>
                    <td className="px-6 py-4 ">{product?.id}</td>
                  </tr>
                  <tr className="border-b">
                    <th className="w-52 text-left uppercase px-6 py-4">
                      Tên sản phẩm
                    </th>
                    <td className="px-6 py-4 ">{product?.name}</td>
                  </tr>
                  <tr className="border-b">
                    <th className="w-52 text-left uppercase px-6 py-4">Slug</th>
                    <td className="px-6 py-4 ">{product?.slug}</td>
                  </tr>
                  <tr className="border-b">
                    <th className="w-52 text-left uppercase px-6 py-4">
                      Giá nhập
                    </th>
                    <td className="px-6 py-4">${product?.price}</td>
                  </tr>
                  <tr className="border-b">
                    <th className="w-52 text-left uppercase px-6 py-4">
                      Giá bán lẻ
                    </th>
                    <td className="px-6 py-4">{product?.retail_price}</td>
                  </tr>
                  <tr className="border-b">
                    <th className="w-52 text-left uppercase px-6 py-4">
                      Giá bán sỉ
                    </th>
                    <td className="px-6 py-4">{product?.wholesale_price}</td>
                  </tr>
                  <tr className="border-b">
                    <th className="w-52 text-left uppercase px-6 py-4">
                      Thương hiệu
                    </th>
                    <td className="px-6 py-4">{product?.brand?.name}</td>
                  </tr>
                  <tr className="border-b">
                    <th className="w-52 text-left uppercase px-6 py-4">
                      Danh mục
                    </th>
                    <td className="px-6 py-4">{product?.category?.name}</td>
                  </tr>
                  <tr className="border-b">
                    <th className="w-52 text-left uppercase px-6 py-4">
                      Trạng thái
                    </th>
                    <td className="px-6 py-4">
                      <span
                        className={`relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight`}
                      >
                        <span
                          className={`absolute ${
                            product?.status == 1 ? "bg-green-200" : "bg-red-400"
                          } inset-0  opacity-50 rounded-full`}
                        />
                        <span className="relative">
                          {product?.status == 1 ? "Hiện" : "Ẩn"}
                        </span>
                      </span>
                    </td>
                  </tr>
                  <tr className="border-b">
                    <th className="w-52 text-left uppercase px-6 py-4">
                      Miêu tả ngắn
                    </th>
                    <td className="px-6 py-4">{product?.description}</td>
                  </tr>
                  <tr className="border-b">
                    <th className="w-52 text-left uppercase px-6 py-4">
                      Chi tiết
                    </th>
                    <td className="px-6 py-4">
                      <div
                        dangerouslySetInnerHTML={{ __html: product?.detail }}
                      />
                    </td>
                  </tr>
                  <tr className="border-b">
                    <th className="w-52 text-left uppercase px-6 py-4">
                      Meta title
                    </th>
                    <td className="px-6 py-4">{product?.meta_title}</td>
                  </tr>
                  <tr className="border-b">
                    <th className="w-52 text-left uppercase px-6 py-4">
                      Meta description
                    </th>
                    <td className="px-6 py-4">{product?.metadesc}</td>
                  </tr>
                  <tr className="border-b">
                    <th className="w-52 text-left uppercase px-6 py-4">
                      Meta key
                    </th>
                    <td className="px-6 py-4">{product?.metakey}</td>
                  </tr>
                  <tr className="border-b">
                    <th className="w-52 text-left uppercase px-6 py-4">
                      Ngày tạo
                    </th>
                    <td className="px-6 py-4">
                      {formathDate(product?.created_at)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Show;
