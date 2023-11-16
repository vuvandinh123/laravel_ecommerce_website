import hotdeals from "../../../public/svg/hotdel.svg";
import { Loader, PlacehoderCard, Product } from "../../components/common";
import { useApiCall } from "../../hooks";
import SlickCround from "../../components/common/SlickCround";
import CountDown from "./CountDown";
import { settingSlick } from "../../helpers";
import { getRequestSite } from "../../api/requestSite";
import { PRODUCT_DISCOUNT } from "../../constants/constants";

const Hotdeals = () => {
  const settings = settingSlick(4);
  const { data, loading } = useApiCall(
    async () => {
      return await getRequestSite(PRODUCT_DISCOUNT, { limit: 15 });
    },
    [],
    []
  );
  const listProduct = data?.data || [];

  return (
    <div className="my-20">
      {!loading && <Loader />}
      <div className=" bg-white rounded-md p-4 flex justify-between flex-wrap gap-y-4 items-center">
        <div className="flex items-center">
          <img src={hotdeals} className="me-2" alt="" />
          <p className="text-base font-[200] text-[#6F7275]">
            <span className="text-red-600 me-2 uppercase font-semibold ">
              Hot Deals!
            </span>
            GET OUR BEST PRICES
          </p>
        </div>
        <div>
          <div className="text-sm leading-4 flex items-center justify-between">
            <span className="me-3 text-[12px] lg:text-[14px]  text-[#424242]">
              Hurry up! Offer ends in:
            </span>
            <CountDown />
          </div>
        </div>
      </div>
      <div className="flex flex-wrap lg:flex-nowrap mt-3 gap-2">
        <div className="lg:basis-1/3 w-full">
          <a href="#" className="overflow-hidden block rounded-md">
            <img
              className="w-full min-h-[380px]   hover:scale-105 transition-all duration-300"
              src="https://demo-uminex.myshopify.com/cdn/shop/files/img_1_3.png?v=1673017886&width=2000"
              alt=""
            />
          </a>
        </div>
        <div className="lg:basis-2/3 max-w-[100%]  lg:max-w-[900px] relative group/arrow">
          <SlickCround settings={settings}>
            {!loading
              ? listProduct.length > 0 &&
                listProduct?.map((item, index) => {
                  return <Product data={item} key={index} deals={true} />;
                })
              : Array(4)
                  .fill(null)
                  .map((item, index) => <PlacehoderCard key={index} />)}
          </SlickCround>
        </div>
      </div>
    </div>
  );
};

export default Hotdeals;
