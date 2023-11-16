import PropTypes from "prop-types";

const menusSiderBar = [
  {
    id: 1,
    name: "Computer & Desktop",
    url: "/",
    submenus: [
      {
        id: 21,
        name: "Laptop & Computers",
        url: "/products/phones",
        submenus: [
          {
            id: 24,
            name: "Computers",
            url: "",
          },
          {
            id: 25,
            name: "Desktops & Monitors",
            url: "",
          },
          {
            id: 26,
            name: "Hard Drives & Memory",
            url: "",
          },
          {
            id: 27,
            name: "Printers & Ink",
            url: "",
          },
          {
            id: 28,
            name: "Networking & Internet",
            url: "",
          },
          {
            id: 29,
            name: "Computer Accessories",
            url: "",
          },
          {
            id: 30,
            name: "Software Computers",
            url: "",
          },
        ],
      },
      {
        id: 22,
        name: "Prime Videos",
        url: "/products/phones",
        submenus: [
          {
            id: 31,
            name: "Unlocked Phones",
            url: "",
          },
          {
            id: 32,
            name: "Phone & Cellphone",
            url: "",
          },
          {
            id: 33,
            name: "Cellphone Charges",
            url: "",
          },
          {
            id: 34,
            name: "Printers & Supplies",
            url: "",
          },
        ],
      },
      {
        id: 23,
        name: "Digital Cameras",
        url: "/products/phones",
        submenus: [
          {
            id: 35,
            name: "Software Computers",
            url: "",
          },
          {
            id: 36,
            name: "Computer Accessories",
            url: "",
          },
          {
            id: 37,
            name: "Networking & Internet",
            url: "",
          },
          {
            id: 38,
            name: "Printers & Ink",
            url: "",
          },
        ],
      },
      {
        id: 242,
        name: "Cameras",
        url: "",
        submenus: [
          {
            id: 39,
            name: "Digital Cameras",
            url: "",
          },
          {
            id: 40,
            name: "Professional & SLR Cameras",
            url: "",
          },
          {
            id: 41,
            name: "Camcorders & Video Cameras",
            url: "",
          },
          {
            id: 42,
            name: "CCTV Cameras",
            url: "",
          },
          {
            id: 43,
            name: "Other Accessories",
            url: "",
          },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "Laptop & Ipad",
    url: "/",
  },
  {
    id: 3,
    name: "Cameras & Photos",
    url: "/news",
  },
  {
    id: 4,
    name: "Smart Phones & Tablets",
    url: "/contact",
  },
  {
    id: 5,
    name: "Home & Kitchen",
    url: "/",
  },
  {
    id: 6,
    name: "TV & Audios",
    url: "/",
  },
  {
    id: 7,
    name: "Health & Beauty",
    url: "/",
  },
  {
    id: 8,
    name: "Watches & Eyewear",
    url: "/",
  },
  {
    id: 9,
    name: "Top Deals",
    url: "/",
  },
  {
    id: 10,
    name: "Top Selling Products",
    url: "/",
  },
  {
    id: 11,
    name: "Top Featured Products",
    url: "",
  },
];
function Submenu({ subItem }) {
  return (
    <div className="absolute z-50 group-hover:translate-x-0 group-hover:opacity-100 duration-300 group-hover:visible transition-all  left-[106%] translate-x-5 opacity-0 invisible top-0 bg-white shadow-md">
      <div className="w-[700px] max-h-[500px] p-5">
        <div className="flex justify-between">
          <div className="w-auto">
            <div className="flex flex-wrap items-start gap-x-14">
              {subItem &&
                subItem?.map((item) => {
                  return (
                    <div key={item.id}>
                      <h3 className="text-[#212529] font-semibold mb-2">
                        <a href="" className="block">
                          {item.name}
                        </a>
                      </h3>
                      <ul>
                        {item.submenus &&
                          item.submenus.map((item2) => {
                            return (
                              <li key={item2.id} className="w-40 ">
                                <a
                                  className="text-[#515d66] block hover:pl-2 transition-all text-ellipsis truncate ... hover:text-[#2b38d1]"
                                  href="#"
                                >
                                  {item2.name}
                                </a>
                              </li>
                            );
                          })}
                      </ul>
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="max-h-xs">
            <a href="">
              <div className="group/1  overflow-hidden">
                <img
                  className="group-hover/1:scale-105 transition-all duration-200"
                  src="https://demo-uminex.myshopify.com/cdn/shop/files/banner-menu1.jpg?v=1671607665&width=2000"
                  alt=""
                />
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
Submenu.propTypes = {
  subItem: PropTypes.array,
};
const Sidebar = () => {
  return (
    <div
      className={`transition-all  z-30 relative duration-500 !scale-100 opacity-100`}
    >
      <div className=" bg-white p-8 bottom-auto left-0 right-0 rounded-md shadow-md">
        <ul className="leading-8">
          {menusSiderBar.map((item) => {
            return (
              <div key={item.id} className="relative group">
                <div className="flex w-full justify-between border-b-[1px] hover:text-[#2b38d1] items-center">
                  <li className="py-1  px-2  truncate ...">
                    <a href="" className="block">
                      {item.name}
                    </a>
                  </li>
                  {item.submenus && (
                    <i className="fa-solid fa-chevron-right text-[9px]"></i>
                  )}
                </div>
                {item.submenus && <Submenu subItem={item.submenus} />}
                {/* <div className='absolute z-50 group-hover:translate-x-0 group-hover:opacity-100 duration-300 group-hover:visible transition-all  left-[106%] translate-x-5 opacity-0 invisible top-0 bg-white shadow-md'>
                                        <div className='w-[700px] p-5'>
                                            <div className="grid grid-cols-3">
                                                <div>
                                                    <h3 className='text-[#212529] font-semibold mb-2'>Laptop computer</h3>
                                                    <ul>
                                                        <li><a className='text-[#515d66] block hover:text-[#2b38d1]' href="#">hello</a></li>
                                                        <li><a className='text-[#515d66] block hover:text-[#2b38d1]' href="#">hello</a></li>
                                                        <li><a className='text-[#515d66] block hover:text-[#2b38d1]' href="#">hello</a></li>
                                                        <li><a className='text-[#515d66] block hover:text-[#2b38d1]' href="#">hello</a></li>
                                                    </ul>
                                                    <h3 className='text-[#212529] font-semibold mb-2'>Laptop computer</h3>
                                                    <ul>
                                                        <li><a className='text-[#515d66] block hover:text-[#2b38d1]' href="#">hello</a></li>
                                                        <li><a className='text-[#515d66] block hover:text-[#2b38d1]' href="#">hello</a></li>
                                                        <li><a className='text-[#515d66] block hover:text-[#2b38d1]' href="#">hello</a></li>
                                                        <li><a className='text-[#515d66] block hover:text-[#2b38d1]' href="#">hello</a></li>
                                                    </ul>
                                                </div>
                                                <div>
                                                    <h3 className='text-[#212529] font-semibold mb-2'>Laptop computer</h3>
                                                    <ul>
                                                        <li><a className='text-[#515d66] block hover:text-[#2b38d1]' href="#">hello</a></li>
                                                        <li><a className='text-[#515d66] block hover:text-[#2b38d1]' href="#">hello</a></li>
                                                        <li><a className='text-[#515d66] block hover:text-[#2b38d1]' href="#">hello</a></li>
                                                    </ul>
                                                    <h3 className='text-[#212529] font-semibold mb-2'>Laptop computer</h3>
                                                    <ul>
                                                        <li><a className='text-[#515d66] block hover:text-[#2b38d1]' href="#">hello</a></li>
                                                        <li><a className='text-[#515d66] block hover:text-[#2b38d1]' href="#">hello</a></li>
                                                        <li><a className='text-[#515d66] block hover:text-[#2b38d1]' href="#">hello</a></li>
                                                    </ul>
                                                </div>
                                                <div className='max-h-xs'>
                                                    <a href="">
                                                        <div className='group/1  overflow-hidden'>
                                                            <img className='group-hover/1:scale-105 transition-all duration-200' src="https://demo-uminex.myshopify.com/cdn/shop/files/banner-menu1.jpg?v=1671607665&width=2000" alt="" />
                                                        </div>

                                                    </a>

                                                </div>

                                            </div>
                                        </div>
                                    </div> */}
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
