import { AiOutlineCheck, AiOutlineEye, AiOutlineHeart } from "react-icons/ai";
import { FiLayers } from "react-icons/fi";
import { ImageLoader, Title } from "../../components/common";
import SlickCround from "../../components/common/SlickCround";
import { useApiCall } from "../../hooks";
import { AppURL } from "../../api/AppURL";
import formatPrice from "../../utils/formathPrice";
import { Link } from "react-router-dom";
import { getRequestSite } from "../../api/requestSite";
import { PRODUCT_TOP_SELLING } from "../../constants/constants";
const TopSellingProducts = () => {
  const settings = {
    dots: false,
    infinite: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    rows: 2, // Số hàng
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: false,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: false,
          dots: false,
        },
      },
    ],
  };
  const { data } = useApiCall(
    async () => {
      return await getRequestSite(PRODUCT_TOP_SELLING, {
        limit:15
      });
    },
    [],
    []
  );
  const listProduct = data?.data || [];
  return (
    <div>
      <div className=" bg-white rounded-md p-4 flex justify-between flex-wrap gap-y-4 items-center">
        <div className="flex items-center">
          <p className="text-base font-bold text-[#000]">
            TOP SELLING PRODUCTS
          </p>
        </div>
        <div>
          <div className="text-sm leading-4">
            <ul className="flex justify-center items-center gap-5">
              <li>
                <a className="hover:text-[#4369ff]" href="">
                  All product
                </a>
              </li>
              <li>
                <a className="hover:text-[#4369ff]" href="">
                  Smartphone
                </a>
              </li>
              <li>
                <a className="hover:text-[#4369ff]" href="">
                  Ipad
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="my-2 relative group/arrow">
        <SlickCround settings={settings}>
          {listProduct.map((item, index) => (
            <div className="p-1" key={index}>
              <div className="flex bg-white">
                <div className="relative group p-1">
                  <div className="group/image w-[150px] md:w-[180px]">
                    <Link to={`/products/${item.slug}`} className="block relative min-h-[160px]">
                      <ImageLoader
                        src={AppURL.ImageUrl + item?.images[0]?.image_url}
                        className={`group-hover/image:opacity-0 transition-all duration-400 object-contain`}
                        alt={"image"}
                      />
                      {item?.images[1]?.image_url && (
                        <img
                          className=" group-hover/image:!opacity-100 opacity-0 transition-all duration-400 absolute top-0 left-0"
                          src={AppURL.ImageUrl + item?.images[1]?.image_url}
                          alt=""
                        />
                      )}
                    </Link>
                  </div>

                  <div className="absolute top-20 right-2 opacity-0 group-hover:top-10 group-hover:opacity-100 transition-all duration-500 ">
                    <div className="w-9 h-9 hover:bg-[#4459ff] hover:text-white bg-white group/t  cursor-pointer mb-1 relative flex justify-center items-center rounded-full bg-transparent border">
                      <AiOutlineHeart />
                      <Title title={"Add wishlist"} />
                    </div>
                    <div className="w-9 h-9 cursor-pointer hover:bg-[#4459ff] hover:text-white group/t bg-white mb-1 flex justify-center items-center rounded-full bg-transparent border">
                      <FiLayers />
                      <Title title={"Add compare"} />
                    </div>
                    <div className="w-9 h-9 cursor-pointer hover:bg-[#4459ff] hover:text-white group/t bg-white mb-1 flex justify-center items-center rounded-full bg-transparent border">
                      <AiOutlineEye />
                      <Title title={"Quick view"} />
                    </div>
                  </div>
                  <div className="absolute top-5 font-bold text-[12px] left-0 px-2 py-1 text-white bg-[#1edd4b]">
                    NEW
                  </div>
                </div>
                <div className="py-5 px-2 flex flex-col">
                  <h3 className="">
                    <Link to={`/products/${item.slug}`} className="font-[400]" >
                      {item.name}
                    </Link>
                  </h3>
                  <div className="flex items-center md:my-3 my-1">
                    <div className="flex items-center gapx-3 text-yellow-500">
                      {Array(5)
                        .fill(0)
                        .map((item, index) => (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={`md:h-5 h-3 w-3 md:w-5`}
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            key={index}
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                    </div>
                    <span className="text-gray-400 text-[12px]">
                      (1 review)
                    </span>
                  </div>
                  <h4 className="text-[#3741ff] font-bold text-xl ">
                    {formatPrice(item?.price)}
                  </h4>
                  <div className={`mt-2`}>
                    <div className="flex items-center text-[#1c8e24] text-[13px] ">
                      {" "}
                      <AiOutlineCheck className="me-2" /> In stock{" "}
                      <span className="text-black ms-2">
                        {" "}
                        <span className="font-bold">{item.quantity}</span>{" "}
                        Products
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </SlickCround>
      </div>
    </div>
  );
};

export default TopSellingProducts;
