import { AiOutlineArrowLeft } from "react-icons/ai";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AppURL } from "../../api/AppURL";
import { useAuth, useScrollTop } from "../../hooks";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { toast } from "react-toastify";
import { postRequestSite } from "../../api/requestSite";
import { ORDERS } from "../../constants/constants";

const CheckoutPage = () => {
  const { orderAr } = useSelector((state) => state.checkout);
  const { cartAr } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  useScrollTop();
  const token = JSON.parse(sessionStorage.getItem("token"));
  const { user } = useAuth(token?.access_token);
  document.body.style.overflow = "auto"
  if(!user){
    return "loading..."
  }
  let totalCart = 0;
  cartAr.forEach((item) => {
    totalCart += item.total;
  });
  if (orderAr.coupon) {
    var total = totalCart - (totalCart * orderAr.coupon) / 100;
  }
  const handleSubmitCheckOut =async (values) => {
    const product = []
    for (let i = 0; i < cartAr.length; i++) {
      const element = cartAr[i];
      product.push({
        product_id: element.id,
        quantity: element.qty,
        price: element.price,
        shipping_id:1,
      })
    }
    const params = {
      ...values,
      order_detail:product,
    }
    const res = await postRequestSite(ORDERS,params);
    if(res.status ==200){
      toast.success("Đặt hàng thành công")
      navigate('/order-details')
    }
  }
  return (
    <div className="">

      <div className=" h-36 text-black flex justify-center items-center flex-col gap-y-3">
        <h2 className="text-4xl font-semibold">Check out</h2>
        <div>
          <ul className="flex items-center gap-x-2">
            <li>
              <Link to={"/"} className="text-gray-500 hover:underline" href="">
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link
                to={"/cart"}
                className="text-gray-500 hover:underline"
                href=""
              >
                Cart
              </Link>
            </li>
            <li>/</li>

            <li>Check out</li>
          </ul>
        </div>
      </div>
      <div className="py-3 max-w-[1410px] px-5 mx-auto">
        <div className="flex gap-x-5">
          <div className="basis-3/5">
            <Formik
              initialValues={{
                firstName: user?.firstName || '',
                lastName: user?.lastName || '',
                email: user?.email || '',
                phone: user?.phone || '',
                address: user?.address || '',
              }}
              validationSchema={Yup.object({
                email: Yup.string().email().required("Email is required"),
                phone: Yup.string().required("Password is required"),
                firstName: Yup.string().required("First name is required"),
                lastName: Yup.string().required("Last name is required"),
                address: Yup.string().required("Last name is required"),
              })}
              onSubmit={(values) => handleSubmitCheckOut(values)}
            >
              <Form>
                <div>
                  <p className="text-xl font-bold">Contact</p>
                  <div className="flex items-center gap-5 justify-between">
                    <div className="mt-5 basis-1/2">
                      <label
                        htmlFor=""
                        className="my-2 inline-block text-[13px]"
                      >
                        First Name
                      </label>
                      <Field
                        name="firstName"
                        placeholder="vu dinh"
                        type="text"
                        className="w-full rounded-md px-5 py-3 border outline-none focus:border-[#1a40ff] "
                      />
                      <p className="text-[12px] ms-2 h-5 text-red-600">
                        <ErrorMessage name="firstName" />
                      </p>
                    </div>
                    <div className="mt-5 basis-1/2">
                      <label
                        htmlFor=""
                        className="my-2 inline-block text-[13px]"
                      >
                        Last Name
                      </label>
                      <Field
                        name="lastName"
                        placeholder="dinh"
                        type="text"
                        className="w-full rounded-md px-5 py-3 border outline-none focus:border-[#1a40ff] "
                      />
                      <p className="text-[12px] ms-2 h-5 text-red-600">
                        <ErrorMessage name="lastName" />
                      </p>
                    </div>
                  </div>
                  <div className="mt-5 ">
                    <label htmlFor="" className="my-2 inline-block text-[13px]">
                      Email
                    </label>
                    <Field
                      name="email"
                      placeholder="dinh@gmail.example"
                      type="text"
                      className="w-full rounded-md px-5 py-3 border outline-none focus:border-[#1a40ff] "
                    />
                    <p className="text-[12px] ms-2 h-5 text-red-600">
                      <ErrorMessage name="email" />
                    </p>
                  </div>
                  <div className="mt-1 ">
                    <label htmlFor="" className="my-2 inline-block text-[13px]">
                      Phone Number
                    </label>
                    <Field
                      name="phone"
                      placeholder="0333583800"
                      type="text"
                      className="w-full rounded-md px-5 py-3 border outline-none focus:border-[#1a40ff] "
                    />
                    <p className="text-[12px] ms-2 h-5 text-red-600">
                      <ErrorMessage name="phone" />
                    </p>
                  </div>
                  <p className="my-5 text-[15px] font-bold">Shipping address</p>

                  <div className="flex items-center gap-5 justify-between">
                    <div className=" basis-1/2">
                      <label
                        htmlFor=""
                        className="my-2 inline-block text-[13px]"
                      >
                        Contry/Region
                      </label>
                      <select
                        className="w-full py-3 outline-none px-2 border rounded-md"
                        name=""
                        id=""
                      >
                        <option value="">vietnam</option>
                        <option value="">my</option>
                        <option value="">malay</option>
                      </select>
                    </div>
                    <div className=" basis-1/2">
                      <label
                        htmlFor=""
                        className="my-2 inline-block text-[13px]"
                      >
                        City
                      </label>
                      <select
                        className="w-full py-3 outline-none px-2 border rounded-md"
                        name=""
                        id=""
                      >
                        <option value="">Ho Chi Minh</option>
                        <option value="">my</option>
                        <option value="">malay</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="" className="my-2 inline-block text-[13px]">
                      Address
                    </label>
                    <Field
                      name="address"
                      placeholder="address"
                      type="text"
                      className="w-full rounded-md px-5 py-3 border outline-none focus:border-[#1a40ff] "
                    />
                    <p className="text-[12px] ms-2 h-5 text-red-600">
                      <ErrorMessage name="address" />
                    </p>
                  </div>
                  <div className="flex items-center gap-2 mt-5">
                    <input type="checkbox" name="pay" id="save" />
                    <label htmlFor="save">
                      Save this information for next time
                    </label>
                  </div>
                  <div>
                    <p className="font-bold text-[15px] my-4">Payment</p>
                    <label
                      htmlFor="pay1"
                      className="inline-block cursor-pointer w-full my-1  border rounded-md px-3 py-3"
                    >
                      <input checked type="radio" name="pay" id="pay1" />
                      <span className="ml-3">Payment on delivery</span>
                    </label>
                    <label
                      htmlFor="pay2"
                      className="inline-block cursor-pointer w-full my-1 border rounded-md px-3 py-3"
                    >
                      <input disabled type="radio" name="pay" id="pay2" />
                      <span className="ml-3">Momo</span>
                    </label>
                    <label
                      htmlFor="pay3"
                      className="inline-block cursor-pointer w-full my-1 border rounded-md px-3 py-3"
                    >
                      <input disabled type="radio" name="pay" id="pay3" />
                      <span className="ml-3">Paypal</span>
                    </label>
                  </div>
                  <div className="mt-5 flex justify-between items-center">
                    <Link
                      to={"/cart"}
                      className="text-blue-500 flex items-center gap-3"
                    >
                      {" "}
                      <AiOutlineArrowLeft /> Return to cart
                    </Link>
                    <div>
                      <button type="submit" className="bg-blue-500 text-white px-10 py-2 rounded-md text-xl">
                        Pay now
                      </button>
                    </div>
                  </div>
                </div>
              </Form>
            </Formik>
          </div>
          <div className="basis-2/5 bg-[#F1F5F6] p-5">
            {cartAr.map((item) => {
              return (
                <div
                  key={item.id}
                  className="flex items-center justify-between gap-5"
                >
                  <div className="flex relative gap-2 items-center">
                    <div className="w-[90px] relative shrink-0 p-2 rounded-md">
                      <img
                        className="w-full"
                        src={AppURL.ImageUrl + item.image}
                        alt=""
                      />
                      <span className="block text-white text-center absolute top-0 w-5 right-0 h-5 bg-red-500 rounded-full">
                        {item.qty}
                      </span>
                    </div>
                    <h4 className="">{item.name}</h4>
                  </div>

                  <span className="font-bold">${item.total.toFixed(2)}</span>
                </div>
              );
            })}
            <div className="mt-10">
              <div className="flex items-center justify-between">
                <span className="font-bold text-base">Subtotal : </span>
                <span className="text-base ">${totalCart.toFixed(2)}</span>
              </div>
              <div className="flex my-2 items-center justify-between">
                <span className="font-bold text-base">Discount : </span>
                <span className="text-base ">-{orderAr.coupon}%</span>
              </div>
              <div className="flex my-2 items-center justify-between">
                <span className="font-bold text-base">Shipping : </span>
                <span className="text-base ">Free</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-bold text-base">Total : </span>
                <span className="text-xl font-bold text-red-500">
                  ${total?.toFixed(2) || totalCart.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
