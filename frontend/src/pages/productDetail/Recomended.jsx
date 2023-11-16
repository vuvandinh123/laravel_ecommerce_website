import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { useApiCall } from "../../hooks";
import SlickCround from "../../components/common/SlickCround";
import { Product } from "../../components/common";
import PropTypes from "prop-types";
import { getRequestSite } from "../../api/requestSite";
import { PRODUCTS, PRODUCT_BY_CATEGORY } from "../../constants/constants";

const Recomended = ({productId}) => {
  var settings = {
    infinite: false,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const { data } = useApiCall(
    async () => {
      return await getRequestSite(PRODUCT_BY_CATEGORY + productId);
    },
    [productId],
    []
  );
  const listProduct = data || [];
  return (
    <>
      <div className="my-10">
        <div className=" bg-white rounded-md p-4 flex justify-between flex-wrap gap-y-4 my-2 items-center">
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
        <SlickCround settings={settings}>
            {listProduct.map((item, index) => {
              return <Product key={index} data={item} deals={true} />;
            })}
          </SlickCround>
      </div>
    </>
  );
};
Recomended.propTypes = {
  productId: PropTypes.string,
}
export default Recomended;
