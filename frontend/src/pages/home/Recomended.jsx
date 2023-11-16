import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { Product } from "../../components/common";
import SlickCround from "../../components/common/SlickCround";
import { useApiCall } from "../../hooks";
import { getRequestSite } from "../../api/requestSite";
import { PRODUCTS } from "../../constants/constants";
const Recomended = () => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
          infinite: false,
          dots: false,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: false,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: false,
          dots: false,
        },
      },
      {
        breakpoint: 480,
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
      return await getRequestSite(PRODUCTS, {
        limit:15
      });
    },
    [],
    []
  );
  const listProduct = data?.data?.data || [];
  return (
    <div className="my-10">
      <div className=" bg-white rounded-md p-4 flex justify-between flex-wrap gap-y-4 items-center">
        <div className="flex items-center">
          <h5 className="uppercase font-bold text-[16px]">
            Recomended for you
          </h5>
        </div>
        <div>
          <div className="text-sm leading-4 flex items-center justify-between">
            <a
              href=""
              className="me-3 hover:text-[#2b38d1] group flex text-[12px] lg:text-[14px]  text-[#5a5a5a]"
            >
              View all{" "}
              <MdKeyboardDoubleArrowRight className="text-[18px]  ms-1 group-hover:translate-x-2 transition-all duration-300" />
            </a>
          </div>
        </div>
      </div>
      <div className=" max-w-[100%] relative group/arrow mt-2">
        <SlickCround settings={settings}>
          {listProduct.map((item, index) => {
            return <Product data={item} key={index} deals={false} />;
          })}
        </SlickCround>
      </div>
    </div>
  );
};

export default Recomended;
