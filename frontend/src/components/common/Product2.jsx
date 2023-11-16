import { AiOutlineCheck } from "react-icons/ai";
import PropTypes from "prop-types";
import { AppURL } from "../../api/AppURL";
import formatPrice from "../../utils/formathPrice";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { byToCart, setIsOpenCart } from "../../redux/cartSlice";

const Product2 = ({ data }) => {
  const newCart = {
    name: data.name,
    price: data.price,
    id: data.id,
    image: data?.images[0].image_url,
    image2: data?.images[1].image_url,
    slug: data.slug,
  };
  const dispatch = useDispatch();
  const handleClickToCart = () => {
    const newCart = {
      name: data.name,
      price: data.price,
      id: data.id,
      image: data?.images[0].image_url,
      slug: data.slug,
    };
    dispatch(byToCart(newCart));
    dispatch(setIsOpenCart(true));
  };
  return (
    <div className="flex bg-white justify-between p-5">
      <div className="flex ">
        <div className="group">
          <Link to={`/products/${newCart.slug}`} >
            <img
              className="w-[200px] group-hover:opacity-0 absolute transition-all duration-400"
              src={AppURL.ImageUrl + newCart.image}
              alt=""
            />
            <img
              className="w-[200px] group-hover:scale-105"
              src={AppURL.ImageUrl + newCart.image2}
              alt=""
            />
          </Link>
        </div>

        <div className="mt-12">
          <h3 className="text-[#212529] font-semibold mb-2">
            <Link to={`/products/${newCart.slug}`}  className="block">
              {newCart.name}
            </Link>
          </h3>
          <div className="flex items-center gap-3">
            <div className="flex items-center gapx-3 text-yellow-500">
              {Array(5)
                .fill(0)
                .map((item, index) => (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    key={index}
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
            </div>
            <span>(1 review)</span>
          </div>
          <ul className="list-disc ms-4 mt-5 text-gray-500">
            <li>Screen Size 10.9 inch</li>
            <li>Operating System iOS 14.0</li>
            <li>Product Length 9.74 inch</li>
          </ul>
        </div>
      </div>
      <div className="mt-14">
        <p className="flex items-center gap-3 text-red-500">
          <AiOutlineCheck /> Out of Stock
        </p>
        <h3 className="font-bold text-xl text-blue-600 mt-3">
          {formatPrice(newCart?.price)}
        </h3>
        <button onClick={handleClickToCart} className="rounded-full px-20 py-3 mt-5 text-white bg-blue-500">
          Add to cart
        </button>
      </div>
    </div>
  );
};
Product2.propTypes = {
  deals: PropTypes.bool,
  data: PropTypes.object,
};
export default Product2;
