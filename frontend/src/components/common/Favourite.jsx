import PropTypes from "prop-types";

const Favourite = ({ isOpen, setIsOpen, favRef }) => {
  return (
    <div
      className={`fixed ${
        isOpen && " !opacity-100 !visible "
      } opacity-0 invisible top-0 left-0 right-0  bottom-0 z-50 bg-[#000000ad]`}
    >
      <div
        ref={favRef}
        className={` ${
          isOpen && "lg:!w-[450px]"
        } overflow-hidden transition-all duration-300  w-[100%] lg:w-[0px]  bg-white absolute right-0 h-full`}
      >
        <div className="h-14 flex justify-between items-center py-4 bg-[#F1F5F6] px-5 text-[1rem]">
          <h4 className="font-semibold">WISHLIST</h4>
          <i
            onClick={() => setIsOpen(false)}
            className="fa-solid text-[1.4rem] text-gray-400 hover:text-black cursor-pointer fa-xmark"
          ></i>
        </div>
        <div className="max-h-[80%] overflow-scroll">
          {Array(4)
            .fill(1)
            .map((item, index) => (
              <div key={index} className="flex justify-between border-b items-center p-3">
                <div className="flex">
                  <div className="w-[90px]">
                    <img
                      src="https://cdn.shopify.com/s/files/1/0687/1177/6541/products/products_31_1_9617e01f-65e8-464c-8e92-1f17c1002192_120x.jpg"
                      alt=""
                    />
                  </div>
                  <div className="mt-2">
                    <h3>Graphite Stainless Steel Case - Black Unity</h3>
                    <h4 className="text-[#2b38d1] font-bold mt-2 text-[16px]">
                      $428.00
                    </h4>
                  </div>
                </div>

                <div className="">
                  <i className="fa-regular cursor-pointer hover:text-red-500 p-3 fa-trash-can"></i>
                </div>
              </div>
            ))}
        </div>
        <div className="bg-[#F1F5F6] p-4">
          <div className="mt-5 h-[100vh]">
            <button className="w-full  bg-blue-500 duration-300 text-white transition-all border rounded-full py-3 font-bold mb-3">
              VIEW WISHLIST
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
Favourite.propTypes = {
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func,
  favRef: PropTypes.object,
};
export default Favourite;
