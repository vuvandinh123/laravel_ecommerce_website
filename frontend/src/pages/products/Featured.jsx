import { Link } from "react-router-dom";
import { AppURL } from "../../api/AppURL";
import { Accordion } from "../../components/common";
import { useApiCall } from "../../hooks";
import formatPrice from "../../utils/formathPrice";
import { getRequestSite } from "../../api/requestSite";
import { PRODUCT_FEATURED } from "../../constants/constants";

const Featured = () => {
  const { data } = useApiCall(
    async () => {
      return getRequestSite(PRODUCT_FEATURED, { limit: 5 });
    },
    [],
    []
  );
  const listProduct = data?.data || [];
  return (
    <>
      <Accordion title="FEATURED PRODUCT">
        {listProduct?.map((item, index) => (
          <div key={index} className="mt-5">
            <div className="flex items-center">
              <div className="basis-2/6 shrink-0 group relative">
                <div>
                  <Link to={`/products/${item.slug}`} className="block">
                    <img
                      className="absolute group-hover:opacity-0 transition-all duration-400:"
                      src={AppURL.ImageUrl + item?.images[0]?.image_url}
                      alt=""
                    />
                    {item?.images[1]?.image_url && (
                      <img
                        className="group-hover:scale-105"
                        src={AppURL.ImageUrl + item?.images[1]?.image_url}
                        alt=""
                      />
                    )}
                  </Link>
                </div>
              </div>
              <div className="mt-1">
                <h4 className="">
                  <Link to={`/products/${item.slug}`} className="block text-[12px] hover:text-blue-500" >
                    {item?.name}
                  </Link>{" "}
                </h4>
                <h5 className="font-bold mt-1 text-red-500">{formatPrice(item?.price)}</h5>
              </div>
            </div>
          </div>
        ))}
      </Accordion>
    </>
  );
};

export default Featured;
