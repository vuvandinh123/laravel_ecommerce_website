import { AppURL } from "../../../api/AppURL";
import { brandApi } from "../../../api/admin/brandApi";

import { useApiCall } from "../../../hooks";
import { Link, useParams } from "react-router-dom";

const Show = () => {
  const { id } = useParams();
  const { data } = useApiCall(
    async () => {
      return await brandApi.get(id);
    },
    [],
    []
  );
  const brand = data?.data?.data;
  return (
    <div className="m-5">
      {/* component */}
      <div className="bg-white p-8 rounded-md w-full">
        <div className=" flex items-center justify-between">
          <div>
            <h1 className="text-gray-600 font-semibold">Categories</h1>
            <span className="text-xs">Show brand item</span>
          </div>
          <div className="flex items-center justify-between">
            <Link
              to={"/admin/brands"}
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
                {brand?.image && (
                  <img
                    className="w-40"
                    src={AppURL.ImageUrl + brand?.image}
                    alt=""
                  />
                )}
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
                    <td className="px-6 py-4 ">{brand?.id}</td>
                  </tr>
                  <tr className="border-b">
                    <th className="w-52 text-left uppercase px-6 py-4">
                      Tên sản phẩm
                    </th>
                    <td className="px-6 py-4 ">{brand?.name}</td>
                  </tr>
                  <tr className="border-b">
                    <th className="w-52 text-left uppercase px-6 py-4">Slug</th>
                    <td className="px-6 py-4 ">{brand?.slug}</td>
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
                            brand?.status == 1 ? "bg-green-200" : "bg-red-400"
                          } inset-0  opacity-50 rounded-full`}
                        />
                        <span className="relative">
                          {brand?.status == 1 ? "Hiện" : "Ẩn"}
                        </span>
                      </span>
                    </td>
                  </tr>
                
                  <tr className="border-b">
                    <th className="w-52 text-left uppercase px-6 py-4">
                      Meta description
                    </th>
                    <td className="px-6 py-4">{brand?.metadesc}</td>
                  </tr>
                  <tr className="border-b">
                    <th className="w-52 text-left uppercase px-6 py-4">
                      Meta key
                    </th>
                    <td className="px-6 py-4">{brand?.metakey}</td>
                  </tr>
                  <tr className="border-b">
                    <th className="w-52 text-left uppercase px-6 py-4">
                      Ngày tạo
                    </th>
                    <td className="px-6 py-4">{brand?.created_at}</td>
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
