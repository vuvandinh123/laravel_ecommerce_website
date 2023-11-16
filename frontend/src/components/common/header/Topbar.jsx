import Dropdown from "../Dropdown";

const Topbar = () => {
  return (
    <>
      <div className="topbar hidden lg:block py-3 max-w-[1410px] px-5 mx-auto text-sm">
        <div className="flex justify-between items-center">
          <p className="text-[#515d66]">
            You are a student and students get 20% discount.
          </p>
          <ul className="flex gap-x-8 text-[#212529]">
            <li>
              <a className="hover:text-[#2b38d1]" href="#">
                Store Locator
              </a>
            </li>
            <li>
              <a className="hover:text-[#2b38d1]" href="#">
                Order Tracking
              </a>
            </li>
            <li>
              <a className="hover:text-[#2b38d1]" href="#">
                FAQs
              </a>
            </li>
            {
              <Dropdown title={"English"}>
                <div className="bg-white absolute z-10 top-8 right-0 w-[130px] shadow-lg">
                  <ul className="leading-8 p-3">
                    <li className="hover:text-[#2b38d1] cursor-pointer hover:pl-1 transition-all ">
                      English
                    </li>
                    <li className="hover:text-[#2b38d1] cursor-pointer hover:pl-1 transition-all ">
                      Viet Nam
                    </li>
                    <li className="hover:text-[#2b38d1] cursor-pointer hover:pl-1 transition-all ">
                      English
                    </li>
                  </ul>
                </div>
              </Dropdown>
            }
            {
              <Dropdown title={"USD"}>
                <div className="bg-white absolute z-10 top-8 right-0 w-[100px] shadow-lg">
                  <ul className="leading-8 p-3">
                    <li className="hover:text-[#2b38d1] cursor-pointer hover:pl-1 transition-all ">
                      VND
                    </li>
                    <li className="hover:text-[#2b38d1] cursor-pointer hover:pl-1 transition-all ">
                      USD
                    </li>
                  </ul>
                </div>
              </Dropdown>
            }
          </ul>
        </div>
      </div>
    </>
  );
};

export default Topbar;
