import { Link } from "react-router-dom";
import { useApiCall, useAuth } from "../../hooks";
import { useState } from "react";
import Modal from "./Modal";
import Pagination from "../../components/admin/Pagination";
import { getRequestSite } from "../../api/requestSite";
import { ORDERS } from "../../constants/constants";

const OrderDetails = () => {
  const [filter, setFilter] = useState({
    page: 1,
    limit: 5,
    headers: {
      Authorization: `Bearer ${
        JSON.parse(sessionStorage.getItem("token"))?.access_token
      }`,
      accept: "application/json",
    },
  });
  const [show, setShow] = useState(false);
  const [dataShow, setDataShow] = useState([]);
  const handleShowClick = async (id) => {
    const res = await getRequestSite(`${ORDERS}/${id}/show`, { limit: 5 });
    setShow(true);
    setDataShow(res.data);
  };
  const { user } = useAuth(
    JSON.parse(sessionStorage.getItem("token"))?.access_token
  );
  const { data } = useApiCall(
    async () => {
      return await getRequestSite(ORDERS + "/" + user?.id);
    },
    [filter, user?.id],
    []
  );
  const total = data?.data?.total;

  const orders = data?.data?.data || [];
  return (
    <div className="max-w-[1410px] relative px-5 py-5 mx-auto ">
      <div className="mb-5">
        <ul className="flex items-center gap-3">
          <li>
            <Link className="text-blue-500" to={"/"}>
              Home
            </Link>
          </li>
          <li>/</li>
          <li>Order detail</li>
        </ul>
      </div>
      <h1 className="text-center text-3xl font-semibold mb-3">Order detail</h1>
      <div className="align-middle inline-block min-w-full  shadow overflow-hidden bg-white shadow-dashboard px-8 pt-3 rounded-bl-lg rounded-br-lg">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                Full Name
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                Address
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                Phone
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                Created At
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300" />
            </tr>
          </thead>
          <tbody className="bg-white">
            {orders.length > 0 ? (
              orders.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                    <div className="flex items-center">
                      <div>
                        <div className="text-sm leading-5 text-gray-800">
                          # {item.id}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                    <div className="text-sm leading-5 text-blue-900">
                      {item.firstName + " " + item.lastName}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
                    {item.address}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
                    {item.email}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
                    {item.phone}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
                    <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                      <span
                        aria-hidden
                        className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                      />
                      <span className="relative text-xs">active</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-blue-900 text-sm leading-5">
                    {item.created_at}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-500 text-sm leading-5">
                    <button
                      onClick={() => handleShowClick(item.id)}
                      className="px-5 py-2 border-blue-500 border text-blue-500 rounded transition duration-300 hover:bg-blue-700 hover:text-white focus:outline-none"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <div className="w-full">
                {" "}
                <p className="my-5 text-gray-400 text-xl">
                  Order detail not found
                </p>
                <Link
                  to={"/categories/all"}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
                >
                  Go To Shopping
                </Link>
              </div>
            )}
          </tbody>
        </table>
        <div className="">
          <Pagination
            total={total}
            page={filter.page}
            filter={filter}
            limit={filter.limit}
            setPage={setFilter}
          />
        </div>
      </div>
      {show && <Modal show={show} setShow={setShow} data={dataShow} />}
    </div>
  );
};

export default OrderDetails;
