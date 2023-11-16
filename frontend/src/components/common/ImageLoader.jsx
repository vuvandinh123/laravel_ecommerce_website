import PropTypes from "prop-types";
import { useState } from "react";

const ImageLoader = ({ src, alt, className,imageRef }) => {
  const loaderImage = {};
  const [loader, setLoader] = useState(loaderImage[src]);
  const onLoad = () => {
    loaderImage[src] = true;
    setLoader(true);
  };
  return (
    <div>
      {!loader && (
        <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center">
          <div className="w-5 h-5 border-2 border-blue-500 rounded-full animate-spin border-t-transparent"></div>
        </div>
      )}
      <img
        ref={imageRef}
        src={src}
        alt={alt || ""}
        className={`${className || ""} ${
          loader ? "is-img-loaded" : "is-img-loading"
        }`}
        onLoad={onLoad}
      />
    </div>
  );
};
ImageLoader.propTypes = {
  src: PropTypes.string.isRequired,
  className: PropTypes.string,
  alt: PropTypes.string,
  imageRef: PropTypes.object
};

export default ImageLoader;
