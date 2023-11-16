import PropTypes from "prop-types";

const Modal = ({ data, setShow }) => {
  let total = 0;
  for (let index = 0; index < data?.details.length; index++) {
    total += data?.details[index].amount;
  }
  const handleClickPrint = () => {
    window.print();
  };
  return (
    <div>
      <div
        className="relative z-10"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="relative transform overflow-hidden rounded-lg bg-white  text-left shadow-xl transition-all sm:my-8 sm:w-[1000px] ">
              <div
                id="print-element"
                className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4"
              >
                <div className="flex justify-between items-center">
                  <p className="mb-5 text-gray-500 text-[12px]">
                    Công ty TNHH 1 mình tôi
                  </p>
                  <p>
                    <span className="text-[12px]">Hoá đơn số : </span>
                    <span className="font-bold">{data.id}</span>
                  </p>
                </div>
                <h3 className="text-center uppercase font-bold">
                  Chi tiết hoá đơn
                </h3>
                <div className="">
                  <div className="flex gap-5 mb-5">
                    <div className="basic-1/3">
                      <ul>
                        <li>ID : </li>
                        <li>Nội dung :</li>
                        <li>Ghi chú : </li>
                        <li>Ngày tạo : </li>
                      </ul>
                    </div>
                    <div className="basic-2/3">
                      <ul>
                        <li>{data.id}</li>
                        <li>{data.content}</li>
                        <li>{data.note}</li>
                        <li>{data.created_at}</li>
                      </ul>
                    </div>
                  </div>
                  <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700">
                    <thead className="bg-gray-100 dark:bg-gray-700">
                      <tr>
                        <th
                          scope="col"
                          className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                        >
                          Tên sản phẩm
                        </th>
                        <th
                          scope="col"
                          className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                        >
                          Nhà cung cấp
                        </th>
                        <th
                          scope="col"
                          className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                        >
                          Số lượng
                        </th>
                        <th
                          scope="col"
                          className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                        >
                          giá nhập
                        </th>
                        <th
                          scope="col"
                          className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                        >
                          Tổng cộng
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                      {data?.details.length > 0 &&
                        data?.details?.map((data) => (
                          <tr
                            key={data.id}
                            className="hover:bg-gray-100 dark:hover:bg-gray-700"
                          >
                            <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              {data.product?.name}
                            </td>
                            <td className="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white">
                              {data.supplier?.name}
                            </td>
                            <td className="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white">
                              {data?.quantity} cái
                            </td>
                            <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              ${data.price}
                            </td>
                            <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              ${data.amount}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                  <div className="border-t py-3 flex justify-end">
                    <div className="font-bold ">Tổng cộng: <span className="ms-5 me-4 text-[18px]">${total}</span> </div>
                  </div>
                  <div className="flex justify-end mb-10 mt-5">
                    <div className="me-10">
                      <p className=" text-[18px] mb-2">Người tạo</p>
                      <p className="text-gray-400 ms-1 text-[10px]">
                        (ký rõ họ tên)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  onClick={handleClickPrint}
                  className="inline-flex px-7 w-full justify-center rounded-md bg-red-600 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                >
                  In
                </button>
                <button
                  type="button"
                  onClick={() => setShow(false)}
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
Modal.propTypes = {
  data: PropTypes.object,
  show: PropTypes.bool,
  setShow: PropTypes.func,
};
export default Modal;