import { useRef, useState } from "react";
import { ImageLoader, Sidebar } from "../../components/common";
import Slider from "react-slick";
import Hotdeals from "./Hotdeals";
import Recomended from "./Recomended";
import TopSellingProducts from "./TopSellingProducts";
import FeaturedProducts from "./FeaturedProducts";
import News from "./News";
const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderList = [
    {
      id: 1,
      image:
        "https://demo-uminex.myshopify.com/cdn/shop/files/banner_3_1.jpg?v=1681465950&width=2000",
      label: "galaxy tab 2022",
      name1: "Top Trending",
      name2: "galaxy tab s6 ultra",
    },
    {
      id: 2,
      image:
        "https://demo-uminex.myshopify.com/cdn/shop/files/banner_3_2.jpg?v=1681465965&width=2000",
      label: "GAMEPAD CONSOLE",
      name1: "today's offer",
      name2: "skin gamepad 2022",
    },
    {
      id: 3,
      image:
        "https://demo-uminex.myshopify.com/cdn/shop/files/banner_3_3.jpg?v=1681465977&width=2000",
      label: "Security Cameras",
      name1: "Outdoor",
      name2: "Security Cameras",
    },
  ];
  const categorys = [
    {
      id: 1,
      image:
        "https://demo-uminex.myshopify.com/cdn/shop/files/col_3_1.png?v=1681548716&width=2000",
      name: "Tablets/Ipad",
    },
    {
      id: 2,
      image:
        "https://demo-uminex.myshopify.com/cdn/shop/files/col_3_2.png?v=1681548716&width=2000",
      name: "Phone/Mobile",
    },
    {
      id: 3,
      image:
        "https://demo-uminex.myshopify.com/cdn/shop/files/col_3_3.png?v=1681548716&width=2000",
      name: "Camara/Photo",
    },
    {
      id: 4,
      image:
        "https://demo-uminex.myshopify.com/cdn/shop/files/col_3_4.png?v=1681548715&width=2000",
      name: "Gamepad Pro",
    },
    {
      id: 5,
      image:
        "https://demo-uminex.myshopify.com/cdn/shop/files/col_3_5.png?v=1681548716&width=2000",
      name: "Tablet/Ipad",
    },
  ];
  var settings = {
    dots: true,
    fade: true,
    infinite: true,
    slidesToShow: 1,
    initialSlide: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    afterChange: (current) => setCurrentSlide(current),
  };
  var settings2 = {
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
  
  const arrowsRef = useRef(null);
  const handleClickNext = () => {
    arrowsRef.current.slickNext();
  };
  const handleClickPrev = () => {
    arrowsRef.current.slickPrev();
  };

  return (
    <div className="bg-[#F1F5F6]">
      <div className="max-w-[1410px] relative px-5 py-5 mx-auto ">
        <div className="flex flex-wrap lg:flex-nowrap lg:flex-row mt-2 gap-5 w-[100%]">
          <div className=" shrink-0 w-[250px] hidden lg:block">
            <Sidebar />
          </div>
          {/* slider */}
          <div className=" max-w-[100%] flex flex-col justify-between  lg:max-w-[56%] relative">
            <div
              onClick={handleClickPrev}
              className="absolute z-20 transition-all duration-200 left-5 top-16 lg:top-[25%] w-12 h-12 text-center flex items-center justify-center hover:text-[#212529] cursor-pointer hover:bg-[#fff] hover:shadow-lg text-gray-400 text-[12px] rounded-full"
            >
              <i className="fa-solid fa-chevron-left"></i>
            </div>
            <div
              onClick={handleClickNext}
              className="absolute z-20 transition-all duration-200 right-5 top-16 lg:top-[25%] w-12 h-12 text-center flex items-center justify-center hover:text-[#212529] cursor-pointer hover:bg-[#fff] hover:shadow-lg text-gray-400 text-[12px] rounded-full"
            >
              <i className="fa-solid fa-chevron-right"></i>
            </div>
            <Slider ref={arrowsRef} {...settings}>
              {sliderList.map((item, index) => {
                return (
                  <div
                    key={item.id}
                    className="relative min-h-[200px] md:min-h-[250px] lg:min-h-[340px] h-full bg-white rounded-md overflow-hidden pt-8"
                  >
                    <a href="" className="block h-full">
                      <img
                        className={`  h-full object-cover`}
                        src={item.image}
                        alt=""
                      />
                      <div className="absolute top-7 lg:top-[27%] lg:left-14 left-5 w-80 overflow-hidden">
                        <p
                          className={`${
                            index == currentSlide &&
                            "sliderAnimationLeft opacity-100"
                          } opacity-0 text-red-600 text-[10px] lg:text-[13px] font-semibold uppercase`}
                        >
                          {item.label}
                        </p>
                        <h6 className="capitalize text-[1.4rem] lg:text-[2rem] font-semibold my-3">
                          <span
                            className={`${
                              index == currentSlide &&
                              "sliderAnimationLeft opacity-100"
                            } opacity-0 block`}
                          >
                            {item.name1}
                          </span>{" "}
                          <span
                            className={`${
                              index == currentSlide &&
                              "sliderAnimationRight opacity-100"
                            } opacity-0 block`}
                          >
                            {item.name2}
                          </span>
                        </h6>
                        <button className="bg-[#2b38d1] hidden lg:block text-white py-1 px-2 lg:py-2 lg:px-8 rounded-full hover:bg-slate-200 hover:text-black transition-all">
                          Show Now
                        </button>
                      </div>
                    </a>
                  </div>
                );
              })}
            </Slider>
            <div className=" max-w-[100%]">
              <Slider {...settings2}>
                {categorys.map((item) => {
                  return (
                    <div key={item.id} className="">
                      <div
                        className={`p-3 bg-white min-h-[160px] flex flex-col justify-between ${
                          categorys.length == item.id && "!me-0"
                        } me-3   rounded-md`}
                      >
                        <div className="mb-2 min-h-[100px] flex justify-center relative">
                          <ImageLoader
                            src={item.image}
                            alt={item.name}
                            className={"w-[102px]"}
                          />
                        </div>
                        <h4 className="text-center font-semibold  text-[#212529]">
                          {item.name}
                        </h4>
                      </div>
                    </div>
                  );
                })}
              </Slider>
            </div>
          </div>
          <div className=" w-[100%]  flex flex-col justify-between">
            <div className=" min-h-[160px] bg-white mb-3 lg:mb-0 relative rounded-md group overflow-hidden">
              <a href="" className="block">
                <div className="absolute z-20 top-10 left-6 leading-10">
                  <h5 className="text-lg font-semibold">Over-Ear</h5>
                  <h5 className="text-lg font-semibold">Headphones</h5>
                  <p>20 Days Return Products</p>
                </div>
                <div className="overflow-hidden">
                  <ImageLoader
                    className="w-full h-full -z-10 group-hover:scale-105 transition-all duration-300"
                    src={
                      "https://demo-uminex.myshopify.com/cdn/shop/files/3_1.jpg?v=1681466981&width=2000"
                    }
                  />
                </div>
              </a>
            </div>
            <div className=" mb-3  min-h-[160px] bg-white lg:mb-0 relative group rounded-md overflow-hidden">
              <a href="" className="block">
                <div className="absolute z-20 top-10 left-6 leading-10">
                  <h5 className="text-lg font-semibold">Over-Ear</h5>
                  <h5 className="text-lg font-semibold">Headphones</h5>
                  <p>20 Days Return Products</p>
                </div>
                <div className="overflow-hidden ">
                  <ImageLoader
                    className="w-full h-full -z-10 group-hover:scale-105 transition-all duration-300"
                    src={
                      "https://demo-uminex.myshopify.com/cdn/shop/files/3_2.jpg?v=1681466999&width=2000"
                    }
                  />
                </div>
              </a>
            </div>
            <div className=" mb-3 lg:mb-0  min-h-[160px] bg-white relative group rounded-md overflow-hidden">
              <a href="" className="block">
                <div className="absolute z-20 top-10 left-6 leading-10">
                  <h5 className="text-lg font-semibold">Over-Ear</h5>
                  <h5 className="text-lg font-semibold">Headphones</h5>
                  <p>20 Days Return Products</p>
                </div>
                <div className="overflow-hidden ">
                  <ImageLoader
                    className="w-full h-full -z-10 group-hover:scale-105 transition-all duration-300"
                    src={
                      "https://demo-uminex.myshopify.com/cdn/shop/files/3_3.jpg?v=1681467017&width=2000"
                    }
                  />
                </div>
              </a>
            </div>
          </div>
        </div>
        <Hotdeals />
        <FeaturedProducts />
        <div className="lg:my-20 my-10 relative">
          <div className="relative ">
            <img
              className="h-full min-h-[100px]"
              src="https://demo-uminex.myshopify.com/cdn/shop/files/img_1_4.png?v=1673237940&width=2000"
              alt=""
            />
            <div className="absolute top-[25px] left-10 text-white">
              <p className="uppercase">
                apply card today and{" "}
                <span className="text-yellow-500 font-bold">get discount</span>
              </p>
              <p className="text-gray-400">
                In rewards on you first dat of purchase when you are approvend
                for the card
              </p>
            </div>
          </div>
        </div>
        <TopSellingProducts />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-10 ">
          <div className="w-full group overflow-hidden rounded-md relative">
            <a href="">
              <img
                className="group-hover:scale-105 transition-all duration-300"
                src="https://demo-uminex.myshopify.com/cdn/shop/files/img_1_5_540x.jpg?v=1673624736"
                alt=""
              />
              <div className="absolute top-10 left-10 z-20 text-white text-xl">
                <p className="text-2xl font-semibold">Gamepad</p>
                <p>
                  <span className="text-yellow-400 font-bold">Sale 20%</span>{" "}
                  Product
                </p>
                <p className="text-gray-300 text-[13px]">
                  Free shipping 20km Radius
                </p>
              </div>
            </a>
          </div>
          <div className="w-full group overflow-hidden relative rounded-md">
            <a href="">
              <img
                className="group-hover:scale-105 transition-all duration-300"
                src="https://demo-uminex.myshopify.com/cdn/shop/files/img_1_6_540x.jpg?v=1675702823"
                alt=""
              />
              <div className="absolute top-10 left-10 z-20 text-white text-xl">
                <p className="text-2xl font-semibold">Gamepad</p>
                <p>
                  <span className="text-yellow-400 font-bold">Sale 20%</span>{" "}
                  Product
                </p>
                <p className="text-gray-300 text-[13px]">
                  Free shipping 20km Radius
                </p>
              </div>
            </a>
          </div>
          <div className="w-full group overflow-hidden relative rounded-md">
            <a href="">
              <img
                className="group-hover:scale-105 transition-all duration-300"
                src="https://demo-uminex.myshopify.com/cdn/shop/files/img_1_7_540x.jpg?v=1675702834"
                alt=""
              />
              <div className="absolute top-10 left-10 z-20 text-white text-xl">
                <p className="text-2xl font-semibold">Gamepad</p>
                <p>
                  <span className="text-yellow-400 font-bold">Sale 20%</span>{" "}
                  Product
                </p>
                <p className="text-gray-300 text-[13px]">
                  Free shipping 20km Radius
                </p>
              </div>
            </a>
          </div>
        </div>
        <Recomended />
        <News/>
      </div>
    </div>
  );
};

export default HomePage;
