import { useState } from "react";

const Detail = () => {
  const [des, setDes] = useState("des");
  const handleClickDesc = () => {
    setDes("des");
  };
  const handleClickInfomation = () => {
    setDes("infomation");
  };
  const handleClickShipping = () => {
    setDes("shipping");
  };
  const handleClickReview = () => {
    setDes("review");
  };
  return (
    <>
      <div className="mt-20">
        <div className="border-b">
          <ul className="flex justify-center items-center gap-8">
            <li
              onClick={handleClickDesc}
              className={`${
                des == "des" && "!text-blue-600 before:!left-0 before:!right-0"
              } cursor-pointer uppercase before:content-[''] before:block before:h-[2px] transition-all duration-200 py-4 before:bg-blue-500 text-gray-400 hover:text-blue-500 before:absolute before: before:bottom-0 before:left-1/2 before:right-1/2 hover:before:left-0 hover:before:right-0 before:transition-all before:duration-300 relative font-bold`}
            >
              Description
            </li>
            <li
              onClick={handleClickInfomation}
              className={`${
                des == "infomation" &&
                "!text-blue-600 before:!left-0 before:!right-0"
              } cursor-pointer uppercase before:content-[''] before:block before:h-[2px] transition-all duration-200 py-4 before:bg-blue-500 text-gray-400 hover:text-blue-500 before:absolute before: before:bottom-0 before:left-1/2 before:right-1/2 hover:before:left-0 hover:before:right-0 before:transition-all before:duration-300 relative font-bold`}
            >
              Additional Information
            </li>
            <li
              onClick={handleClickShipping}
              className={`${
                des == "shipping" &&
                "!text-blue-600 before:!left-0 before:!right-0"
              } cursor-pointer uppercase before:content-[''] before:block before:h-[2px] transition-all duration-200 py-4 before:bg-blue-500 text-gray-400 hover:text-blue-500 before:absolute before: before:bottom-0 before:left-1/2 before:right-1/2 hover:before:left-0 hover:before:right-0 before:transition-all before:duration-300 relative font-bold`}
            >
              Shipping & Return
            </li>
            <li
              onClick={handleClickReview}
              className={`${
                des == "review" &&
                "!text-blue-600 before:!left-0 before:!right-0"
              } cursor-pointer uppercase before:content-[''] before:block before:h-[2px] transition-all duration-200 py-4 before:bg-blue-500 text-gray-400 hover:text-blue-500 before:absolute before: before:bottom-0 before:left-1/2 before:right-1/2 hover:before:left-0 hover:before:right-0 before:transition-all before:duration-300 relative font-bold`}
            >
              Reviews ( 1 ){" "}
            </li>
          </ul>
        </div>
        <div className="p-10">
          {des === "des" && (
            <>
              <p className="leading-7 mb-5">
                iPad Air with a vibrant 10.9-inch Liquid Retina display.
                Breakthrough Apple M1 chip for faster performance, making iPad
                Air super-powerful for creativity and mobile gaming. Get Touch
                ID, an advanced camera, lightning-fast 5G2 and Wi-Fi 6, a USB-C
                port, and support for the Magic Keyboard and Apple Pencil (2nd
                generation).
              </p>
              <img
                src="https://cdn.shopify.com/s/files/1/0687/1177/6541/files/img_detail_0.png?v=1678077641"
                alt=""
              />
              <p className="my-5">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero
                pariatur quo odio amet doloribus omnis perferendis, consectetur
                vero quod. Sit omnis animi voluptas. Dolore cum cupiditate minus
                dicta quasi at.
              </p>
            </>
          )}
          {}
          {des === "infomation" && <h1>infomation</h1>}
          {des === "shipping" && (
            <div>
              <p className="font-bold uppercase text-[14px] my-3">Shipping</p>
              <ul className="text-gray-500 leading-7">
                <li>
                  Complimentary ground shipping within 1 to 7 business days
                </li>
                <li>
                  In-store collection available within 1 to 7 business days
                </li>
                <li>Next-day and Express delivery options also available</li>
                <li>
                  Purchases are delivered in an orange box tied with a Bolduc
                  ribbon, with the exception of certain items
                </li>
                <li>
                  See the delivery FAQs for details on shipping methods, costs
                  and delivery times
                </li>
                <li></li>
              </ul>
              <p className="font-bold uppercase text-[14px] my-3">
                RETURNS AND EXCHANGES
              </p>
              <ul className="text-gray-500 leading-7">
                <li>Easy and complimentary, within 14 days</li>
                <li>See conditions and procedure in our return FAQs</li>
              </ul>
            </div>
          )}
          {des === "review" && <></>}
        </div>
      </div>
    </>
  );
};

export default Detail;
