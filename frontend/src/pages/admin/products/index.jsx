import { AppURL } from "../../../api/AppURL";
import { useApiCall } from "../../../hooks";
import NotImage from "../../../assets/image/icon-image-not-found-free-vector.jpg";
import { Link } from "react-router-dom";
import { useState } from "react";
import Pagination from "../../../components/admin/Pagination";
import Filter from "./Filter";
import SkeletonProduct from "./SkeletonProduct";
import { productApi } from "../../../api/admin/productApi";
import { toast } from "react-toastify";
import { RiDeleteBin2Line } from "react-icons/ri";
import { BiEdit } from "react-icons/bi";
import { deleteRequestAdmin, getRequestAdmin } from "../../../api/requestAdmin";
import { PRODUCTS } from "../../../constants/constants";
const ProductAdmin = () => {
  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState("");
  const [status, setStatus] = useState(0);
  const [filter, setFilter] = useState({
    page: 1,
    limit: 5,
    category: "",
    brand: "",
    search: "",
    sortBy: "",
  });

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setFilter({ ...filter, search: search });
  };
  const handleDeleteClick = async (id) => {
    await deleteRequestAdmin(PRODUCTS + "/" + id);
    setDeleteId(id);
    toast.success("Xoá sản phẩm thành công");
  };
  const handleStatusClick = async (id) => {
    await productApi.status(id);
    setStatus(Math.random());
    toast.success("Thay đổi trạng thái thành công");
  };
  const { data, loading } = useApiCall(
    async () => {
      return await getRequestAdmin(PRODUCTS, {
        ...filter,
      });
    },
    [filter, deleteId, status],
    []
  );
  const totalProduct = data?.data?.total;
  const listProduct = data?.data?.data || [];
  return (
    <div className="m-5">
      {/* component */}
      <div className="bg-white p-8 rounded-md w-full">
        <div className=" flex items-center justify-between pb-6">
          <div>
            <h1 className="text-gray-600 font-semibold">Products</h1>
            <span className="text-xs">All products item</span>
          </div>
          <div className="flex items-center justify-between">
            <form action="" onSubmit={handleSearchSubmit}>
              <div className="flex bg-gray-50 items-center p-2 rounded-md">
                <button>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <input
                  className="bg-gray-50 outline-none ml-1 block "
                  type="text"
                  onChange={(e) => setSearch(e.target.value)}
                  name=""
                  id=""
                  placeholder="search..."
                />
              </div>
            </form>

            <div className="lg:ml-40 ml-10 space-x-8">
              <Link
                to={"create"}
                className="bg-indigo-600 px-4 py-3 rounded-md text-white font-semibold tracking-wide cursor-pointer"
              >
                Thêm mới
              </Link>
            </div>
          </div>
        </div>
        <div>
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <div className="my-4 mx-5">
                <Filter filter={filter} setFilter={setFilter} />
              </div>
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Id
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Sản phẩm
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Giá
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      danh mục
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      thương hiệu
                    </th>
                    {/* <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      ngày tạo
                    </th> */}
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Trạng thái
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"></th>
                  </tr>
                </thead>
                <tbody>
                  {listProduct.length > 0 &&
                    !loading &&
                    listProduct.map((product) => (
                      <tr key={product.id}>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          {product.id}
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 w-10 h-10">
                              <img
                                className="w-full h-full rounded-full"
                                src={
                                  product?.images[0]?.image_url
                                    ? AppURL.ImageUrl +
                                      product.images[0]?.image_url
                                    : NotImage
                                }
                                alt=""
                              />
                            </div>
                            <div className="ml-3">
                              <p className="text-gray-900 whitespace-no-wrap">
                                <Link to={`/admin/products/${product.slug}`}>
                                  {product.name}
                                </Link>
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            ${product?.price}
                          </p>
                        </td>
                        <td className="px-5  py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900  whitespace-no-wrap">
                            {product?.category?.name}
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {product?.brand?.name}
                          </p>
                        </td>

                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <span
                            onClick={() => handleStatusClick(product.id)}
                            className={`relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight`}
                          >
                            <span
                              className={`absolute ${
                                product?.status == 1
                                  ? "bg-green-200"
                                  : "bg-red-400"
                              } inset-0  opacity-50 rounded-full`}
                            />
                            <span className="relative">
                              {product?.status == 1 ? "Hiện" : "Ẩn"}
                            </span>
                          </span>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <div className="flex gap-5">
                            <Link
                              to={`${product.slug}/edit`}
                              className="text-indigo-600 hover:text-indigo-900"
                            >
                              <BiEdit className=" text-xl font-bold" />
                            </Link>
                            <button
                              onClick={() => handleDeleteClick(product.id)}
                              className="text-red-400 hover:text-red-600"
                            >
                              <RiDeleteBin2Line className="text-xl font-bold" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  <SkeletonProduct loading={loading} limit={filter.limit} />
                </tbody>
              </table>
              <Pagination
                total={totalProduct}
                page={filter.page}
                filter={filter}
                limit={filter.limit}
                setPage={setFilter}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductAdmin;
