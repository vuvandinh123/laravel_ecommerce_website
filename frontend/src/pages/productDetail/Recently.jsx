import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import SlickCround from "../../components/common/SlickCround";
import { Product } from "../../components/common";
import PropTypes from "prop-types";

const Recently = ({ product }) => {
  const listProducts = JSON.parse(localStorage.getItem("viewedProducts")) || [];
  if (product.id) {
    let viewedProducts =
      JSON.parse(localStorage.getItem("viewedProducts")) || [];
    const isProductViewed = viewedProducts.some(
      (item) => item.id === product.id
    );
    if (!isProductViewed) {
      viewedProducts.unshift(product);
      viewedProducts = viewedProducts.slice(0, 10);
      localStorage.setItem("viewedProducts", JSON.stringify(viewedProducts));
    }
  }
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
  return (
    <>
      <div className="my-20">
        <div className=" bg-white rounded-md p-4 flex justify-between flex-wrap gap-y-4 my-2 items-center">
          <div className="flex items-center">
            <h5 className="uppercase font-bold text-[16px]">
              RECENTLY VIEWED PRODUCTS
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
          {listProducts.length > 0 &&
            listProducts.map((item, index) => {
              return <Product data={item} key={index} deals={true} />;
            })}
        </SlickCround>
      </div>
    </>
  );
};
Recently.propTypes = {
  product: PropTypes.object,
};
export default Recently;
