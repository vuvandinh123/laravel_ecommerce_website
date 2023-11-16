import PropTypes from "prop-types";
import { useState } from "react";
import { AppURL } from "../../../api/AppURL";
const File = ({ setImage, image, ...props }) => {
  const [src, setSrc] = useState([]);
  const handleImageChange = (event) => {
    const file = Array.from(event.target.files);
    let images = [];
    let files = [];
    file.forEach((element) => {
      images.push(URL.createObjectURL(element));
      files.push(element);
    });
    setSrc(images);
    setImage(files);
  };
  return (
    <>
      <div>
        <label
          htmlFor="image"
          className="block relative border-dashed  w-52 h-52 border"
        >
          <input onChange={handleImageChange} {...props} multiple />
          <div className="w-full  h-full">
            <i className="fa-solid fa-camera absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] text-[30px] "></i>
          </div>
        </label>
        <div className="py-4 flex flex-wrap gap-2">
          {src.map((item, index) => (
            <img
              className="w-[180px] h-[200px]"
              src={item}
              key={index}
              alt=""
            />
          ))}
          
        </div>
      </div>
    </>
  );
};
File.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  setImage: PropTypes.func,
  image: PropTypes.string,
};
export default File;
