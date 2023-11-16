import { useApiCall } from "../../../hooks";
import { Link } from "react-router-dom";
import { useState } from "react";
import Pagination from "../../../components/admin/Pagination";
import { invoicesApi } from "../../../api/admin/invoices";
import Modal from "../../../components/admin/Modal";
import SkeletonImport from "./SkeletonImport";
import formathDate from "../../../utils/formathDate";
import { RiDeleteBin2Line } from "react-icons/ri";
import { BiShowAlt } from "react-icons/bi";
const Import = () => {
  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState("");
  const [status, setStatus] = useState(0);
  const [show, setShow] = useState(false);
  const [dataShow, setDataShow] = useState([]);
  const [filter, setFilter] = useState({
    page: 1,
    limit: 5,
    category: "all",
    brand: "",
    search: "",
    sortBy: "",
  });
  const handleShowClick = async (id) => {
    const res = await invoicesApi.get(id);
    setShow(true);
    setDataShow(res.data.data);
  };
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setFilter({ ...filter, search: search });
  };
  const handleDeleteClick = async (id) => {
    const res = await invoicesApi.delete(id);
    if (res.status === 200) {
      setDeleteId(id);
    }
  };

  const { data, loading } = useApiCall(
    async () => {
      return await invoicesApi.getAll({ ...filter });
    },
    [filter, deleteId, status],
    []
  );
  const total = data?.data?.data.total;
  const invoices = data?.data?.data?.data || [];
  return (
    <div className="m-5">
      {/* component */}
      <div className="bg-white p-8 rounded-md w-full">
        <div className=" flex items-center justify-between pb-6">
          <div>
            <h1 className="text-gray-600 font-semibold">Nhập hàng</h1>
            <span className="text-xs">Danh sách nhập hàng</span>
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
                {/* <Filter filter={filter} setFilter={setFilter} /> */}
              </div>
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Id
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Nội dung
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Ghi chú
                    </th>

                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      ngày tạo
                    </th>

                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"></th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"></th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.length > 0 &&
                    !loading &&
                    invoices.map((item) => (
                      <tr key={item.id}>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          {item.id}
                        </td>

                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {item?.content}
                          </p>
                        </td>
                        <td className="px-5  py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900  whitespace-no-wrap">
                            {item?.note}
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {formathDate(item?.created_at)}
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm"></td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <div className="flex gap-5">
                            <span
                              onClick={() => handleShowClick(item.id)}
                              className="  px-4 py-1 rounded-md cursor-pointer "
                            >
                              <BiShowAlt className=" text-2xl font-bold" />
                            </span>

                            <button
                              onClick={() => handleDeleteClick(item.id)}
                              className="text-red-400 hover:text-red-600"
                            >
                              <RiDeleteBin2Line className="text-xl font-bold" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  <SkeletonImport loading={loading} limit={5} />
                </tbody>
              </table>
              <Pagination
                total={total}
                page={filter.page}
                filter={filter}
                limit={filter.limit}
                setPage={setFilter}
              />
            </div>
          </div>
        </div>
      </div>
      {show && <Modal show={show} setShow={setShow} data={dataShow} />}
    </div>
  );
};

export default Import;
