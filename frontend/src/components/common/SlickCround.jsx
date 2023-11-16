import Slider from "react-slick";
import { useSlick } from "../../hooks";
import PropTypes from "prop-types";
import {useState } from "react";

const SlickCround = ({ settings, children }) => {
  const { handleClickNext, handleClickPrev, arrowsRef } = useSlick(settings);
  const [first, setFirst] = useState(0);
  const [last, setLast] = useState(false);
  const handleAfterChange = (currentSlide) => {
    const totalSlides = arrowsRef.current.innerSlider.state.slideCount;
    setFirst(currentSlide);
    if (currentSlide + settings.slidesToShow >= totalSlides) {
      setLast(true);
    }
  };
  return (
    <div>
      <button
        onClick={handleClickPrev}
        className={`text-xxl ${
          first == 0 && "!bg-[#3c32ff58] cursor-not-allowed"
        } absolute top-[50%] left-0 opacity-0 group-hover/arrow:opacity-100 transition-all duration-200 -translate-y-1/2 -translate-x-5 w-12 h-12 bg-[#3c32ff58] rounded-full text-xs text-white z-30 hover:bg-[#3c32ff]`}
      >
        <i className="fa-solid fa-angle-left"></i>
      </button>
      <button
        onClick={handleClickNext}
        className={`text-xxl ${
          last && "!bg-[#3c32ff58] cursor-not-allowed"
        } absolute top-[50%] right-0 opacity-0 group-hover/arrow:opacity-100 transition-all duration-200 -translate-y-1/2 translate-x-5 w-12 h-12 bg-[#3c32ff58] rounded-full text-xs text-white z-30 hover:bg-[#3c32ff]`}
      >
        <i className="fa-solid fa-angle-right"></i>
      </button>
      <Slider ref={arrowsRef} {...settings} afterChange={handleAfterChange}>
        {children}
      </Slider>
    </div>
  );
};
SlickCround.propTypes = {
  settings: PropTypes.object,
  children: PropTypes.node,
  active: PropTypes.number,
  length: PropTypes.number,
};
export default SlickCround;
