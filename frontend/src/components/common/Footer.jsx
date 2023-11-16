import fastSvg from "../../../public/svg/fast.svg";
import paySvg from "../../../public/svg/pay.svg";
import discountSvg from "../../../public/svg/discount.svg";
import helpSvg from "../../../public/svg/help.svg";
import curatedSvg from "../../../public/svg/curated.svg";
const Footer = () => {
  return (
    <div className="bg-white my-3">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5  max-w-[1410px] px-5 mx-auto">
        <div className="flex flex-col gap-3 justify-center items-center p-5">
          <div className="icon-hover p-3">
            <img src={fastSvg} alt="" />
          </div>
          <div className="flex flex-col justify-center items-center">
            <h3 className="text-[12px] font-semibold uppercase">
              Fast Delivery
            </h3>
            <p className="text-[11px] mt-1">Across West & East India</p>
          </div>
        </div>
        <div className="flex flex-col gap-3 justify-center items-center p-5">
          <div className="icon-hover p-3">
            <img src={paySvg} alt="" />
          </div>
          <div className="flex flex-col justify-center items-center">
            <h3 className="text-[12px] font-semibold uppercase">
              SAFE PAYMENT
            </h3>
            <p className="text-[11px] mt-1">100% Secure Payment</p>
          </div>
        </div>
        <div className="flex flex-col gap-3 justify-center items-center p-5">
          <div className="icon-hover p-3">
            <img src={discountSvg} alt="" />
          </div>
          <div className="flex flex-col justify-center items-center">
            <h3 className="text-[12px] font-semibold uppercase">
              ONLINE DISCOUNT
            </h3>
            <p className="text-[11px] mt-1">Add Multi-buy Discount</p>
          </div>
        </div>
        <div className="flex flex-col gap-3 justify-center items-center p-5">
          <div className="icon-hover p-3">
            <img src={helpSvg} alt="" />
          </div>
          <div className="flex flex-col justify-center items-center">
            <h3 className="text-[12px] font-semibold uppercase">HELP CENTER</h3>
            <p className="text-[11px] mt-1">Dedicated 24/7 Support</p>
          </div>
        </div>
        <div className="flex flex-col gap-3 justify-center items-center p-5">
          <div className="icon-hover p-3">
            <img src={curatedSvg} alt="" />
          </div>
          <div className="flex flex-col justify-center items-center">
            <h3 className="text-[12px] font-semibold uppercase">
              CURATED ITEMS
            </h3>
            <p className="text-[11px] mt-1">From Handpicked Sellers</p>
          </div>
        </div>
      </div>
      <div className="py-3 max-w-[1410px] px-5 mx-auto border-t">
        <div className="flex flex-col md:flex-row gap-10">
          <div className="lg:basis-2/6">
            <aside className="text-center md:text-start">
              <h4 className="font-semibold mb-7 mt-5">ABOUT THE STORE</h4>
              <p className="text-gray-500 my-2">Got Question? Call us 24/7</p>
              <p className="text-2xl text-[#3636ff]">+222-1800-262</p>
              <p className="text-gray-500 my-2">
                268 St, South New York/NY 98944, United States
              </p>
              <p className="text-gray-500 my-2">Customersupport@example.com</p>
              <p className="text-gray-500">Aloshopify@alothemes.com</p>
            </aside>
          </div>
          <div className="lg:basis-2/6">
            <div className="flex justify-between md:justify-start gap-32">
              <div>
                <h4 className="font-bold mt-5 mb-5">INFOMATION</h4>
                <ul className="leading-9">
                  <li>
                    <a
                      className="text-gray-500 hover:underline hover:text-[#001aff]"
                      href=""
                    >
                      Blog Us
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-gray-500 hover:underline hover:text-[#001aff]"
                      href=""
                    >
                      About Us
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-gray-500 hover:underline hover:text-[#001aff]"
                      href=""
                    >
                      Delivery Information
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-gray-500 hover:underline hover:text-[#001aff]"
                      href=""
                    >
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-gray-500 hover:underline hover:text-[#132aff]"
                      href=""
                    >
                      FeedBack
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mt-5 mb-5">QUICK LINKS</h4>
                <ul className="leading-9">
                  <li>
                    <a
                      className="text-gray-500 hover:underline hover:text-[#001aff]"
                      href=""
                    >
                      Store Location
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-gray-500 hover:underline hover:text-[#001aff]"
                      href=""
                    >
                      Orders Tracking
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-gray-500 hover:underline hover:text-[#001aff]"
                      href=""
                    >
                      FAQs
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="lg:basis-2/6 text-center  md:text-start">
            <h4 className="font-bold mt-5 mb-5 ">NEWSLETTER SIGNUP</h4>
            <p className="leading-7  text-gray-500">
              Join 20.000+ subscribers and get a new discount coupon on every
              Saturday. Updates information on Sales and Offers.
            </p>
            <form
              action=""
              method="post"
              className="flex items-center gap-3 mt-5"
            >
              <input
                type="text"
                className="px-5 w-full py-3 rounded-full border focus:outline-none focus:border-[#001aff]"
                placeholder="Your email address..."
                name=""
                id=""
              />
              <button className="px-10 py-3 rounded-full bg-[#001aff] text-white">
                Subscribe
              </button>
            </form>
            <p className="text-gray-500 my-5 text-center md:text-start">
              Subscribe for Uminex and get 20% off your first purchase.
            </p>
          </div>
        </div>
      </div>
      <hr />
      <div className="flex mb-28 lg:mb-0 justify-between flex-wrap items-center max-w-[1410px] px-5 mx-auto p-5">
        <p className="text-center md:text-start">
          Copyright ©{" "}
          <a href="#" className="text-[#001aff]">
            Uminex
          </a>{" "}
          all rights reserved. Powered by
          <a className="text-[#001aff]" href=""> Alothemes.</a>
        </p>
        <div className="flex flex-wrap md:flex-nowrap items-center text-center md:text-start gap-3">
          <p className="w-full  mt-2">Payment Method:</p>
          <img
            className="h-10 w-full"
            src="https://demo-uminex.myshopify.com/cdn/shop/files/payment_acfdf180-1e05-48f1-97a2-adca8e5565e8.png?v=1679910794&width=2000"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Footer;
