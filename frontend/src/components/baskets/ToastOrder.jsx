import { useCallback, useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";
import { AppURL } from "../../api/AppURL.js";
import { calculateTimeDifference } from "../../helpers/utils";
import { getRequestSite } from "../../api/requestSite.js";
import { PRODUCT_BASKET } from "../../constants/constants.js";

const ToastOrder = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState([]);
  const [dataShow, setDataShow] = useState({});
  const fetchApi = useCallback(async () => {
    try {
      const res = await getRequestSite(PRODUCT_BASKET);
      setData(res.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  }, []);

  useEffect(() => {
    fetchApi();
    const interval = setInterval(fetchApi, 100000);
    return () => clearInterval(interval);
  }, [fetchApi]);

  useEffect(() => {
    const timeout = 10000;
    let timeout1 = null;
    let timeout2 = null;
    if (isOpen && data.length) {
      timeout1 = setTimeout(() => {
        setIsOpen(false);
      }, timeout);
    }
    if (!isOpen && data.length) {
      timeout2 = setTimeout(() => {
        setIsOpen(true);
        const newData = data[Math.floor(Math.random() * data.length)];
        const time = calculateTimeDifference(newData.created_at);
        setDataShow({
          ...newData,
          time: time,
        });
      }, 20000);
    }
    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
    };
  }, [isOpen, data]);
  return (
    <div
      className={`fixed  bottom-36 z-50   ${
        isOpen ? " left-4" : "  -left-[100%]"
      } transition-all duration-500`}
    >
      <div>
        {/* component */}
        <div className="absolute w-[30rem] whitespace-normal break-words rounded-lg border border-blue-gray-50 bg-white p-4 font-sans text-sm font-normal text-blue-gray-500 shadow-lg shadow-blue-gray-500/10 focus:outline-none">
          <span
            onClick={() => setIsOpen(false)}
            className="absolute top-0 cursor-pointer hover:text-pink-700 p-3 right-0"
          >
            <AiOutlineClose />
          </span>
          <div className="flex gap-3">
            <div className="basis-1/5 flex-shrink-0">
              <Link to={`/products/${dataShow?.slug}`}>
                <img src={AppURL.ImageUrl + dataShow?.image_url} alt="" />
              </Link>
            </div>
            <div className="basis-4/5">
              <div className="mb-2 flex items-center gap-3">
                <p className="block font-sans  font-medium leading-relaxed tracking-normal text-blue-gray-900 antialiased text-[13px] transition-colors">
                  <span className="text-black capitalize">
                    {dataShow?.firstName + " " + dataShow?.lastName}
                  </span>{" "}
                  (Viet Nam) purchased
                </p>
                <div className="center relative inline-block select-none whitespace-nowrap rounded-full bg-purple-500 py-1 px-2 align-baseline font-sans text-xs font-medium capitalize leading-none tracking-wide text-white">
                  <div className="mt-px">Public</div>
                </div>
              </div>
              <Link
                to={`/products/${dataShow?.slug}`}
                className="block font-sans font-bold hover:text-pink-500 text-[14px]  leading-normal text-black antialiased"
              >
                {dataShow?.name}
              </Link>
              <div className="mt-4 flex items-center gap-5">
                <div className="flex items-center gap-1">
                  <span className="h-3 w-3 rounded-full bg-blue-400" />
                  <p className="block font-sans text-xs font-normal text-gray-700 antialiased">
                    {dataShow?.time?.hours > 0 && (
                      <span>{dataShow?.time?.hours} hours ago </span>
                    )}
                    {dataShow?.time?.hours == 0 && (
                      <span>{dataShow?.time?.minutes} minutes ago</span>
                    )}
                    {dataShow?.time?.minutes == 0 && (
                      <span>{dataShow?.time?.seconds} seconds ago</span>
                    )}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    className="-mt-0.5 h-4 w-4 text-yellow-400"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className="block font-sans text-xs font-normal text-gray-700 antialiased">
                    3,480
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    className="-mt-px h-4 w-4 text-green-300"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className="block font-sans text-xs font-normal text-gray-700 antialiased">
                    Veritied
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToastOrder;
