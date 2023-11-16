import { useRef, useState } from "react";
import Slider from "react-slick";
import { ImageLoader } from "../../components/common";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { useApiCall } from "../../hooks";
import { Link } from "react-router-dom";
import { AppURL } from "../../api/AppURL";
import { getRequestSite } from "../../api/requestSite";
import { POSTS } from "../../constants/constants";

const News = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    afterChange: (current) => setCurrentSlide(current),
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: false,
          dots: false,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
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
  const arrowsRef = useRef(null);
  const { data } = useApiCall(
    async () => {
      return await getRequestSite(POSTS, {
        limit: 15,
      });
    },
    [],
    []
  );
  const listPost = data?.data?.data || [];
  const handleClickNext = () => {
    arrowsRef.current.slickNext();
  };
  const handleClickPrev = () => {
    arrowsRef.current.slickPrev();
  };
  return (
    <div className=" max-w-[100%] relative group/arrow mt-20">
      <button
        onClick={handleClickPrev}
        className={`text-xxl ${
          currentSlide == 0 && "!bg-[#3c32ff58] cursor-not-allowed"
        } absolute top-[50%] left-0 opacity-0 group-hover/arrow:opacity-100 transition-all duration-200 -translate-y-1/2 -translate-x-5 w-12 h-12 bg-[#3c32ff58] rounded-full text-xs text-white z-30 hover:bg-[#3c32ff]`}
      >
        <i className="fa-solid fa-angle-left"></i>
      </button>
      <button
        onClick={handleClickNext}
        className={`text-xxl absolute top-[50%] right-0 opacity-0 group-hover/arrow:opacity-100 transition-all duration-200 -translate-y-1/2 translate-x-5 w-12 h-12 bg-[#3c32ff58] rounded-full text-xs text-white z-30 hover:bg-[#3c32ff]`}
      >
        <i className="fa-solid fa-angle-right"></i>
      </button>
      <Slider ref={arrowsRef} {...settings}>
        {listPost.length > 0 &&
          listPost?.map((item, index) => {
            return (
              <div key={index} className="">
                <div className="relative   rounded-md group mx-2 overflow-hidden bg-white ">
                  <div className="overflow-hidden  min-h-[200px] relative">
                    <Link to={`/blog/${item?.slug}`}>
                      <ImageLoader
                        src={AppURL.ImageUrl + item?.image}
                        className={
                          "group-hover:scale-105 h-[200px] group-hover:shadow-md  transition-all duration-300"
                        }
                      />
                    </Link>
                  </div>
                  <div className="p-5 flex flex-col gap-2 border-b">
                    <a href="" className="text-[#2b38d1] text-[12px]">
                      TECHNOLOGY
                    </a>
                    <h3 className="text-[17px] font-[600]">
                      <Link 
                        to={`/blog/${item?.slug}`}
                        className="hover:text-[#2b38d1] text-[17px] text-ellipsis h-10 w-full line-clamp-2 leading-[1.2em] max-h-[2.4em]  overflow-hidden "
                      >
                        {item?.title}
                      </Link>{" "}
                    </h3>
                    <div className="text-[#8d979e] text-[12px] uppercase">
                      Post by ALO Support
                    </div>
                    <p className="text-gray-500 text-[14px] text-ellipsis  w-full line-clamp-2 leading-[1.5em]   overflow-hidden">
                      {item?.compact}
                    </p>
                  </div>
                  <div className="flex justify-between items-center p-3">
                    <div className="text-[12px] ">
                      <a
                        href=""
                        className="hover:text-[#2b38d1] group/read  flex"
                      >
                        {" "}
                        READ MORE{" "}
                        <MdKeyboardDoubleArrowRight className="text-[18px]  ms-1 group-hover/read:translate-x-2 transition-all duration-300" />
                      </a>
                    </div>
                    <div className="text-[#8d979e] text-[12px]">
                      <span className="me-2">MAR</span>
                      <span className="me-1">03</span>
                      <span>2023</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </Slider>
    </div>
  );
};

export default News;
