import axios from "axios";
import PropTypes from "prop-types";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
const Login = ({ setToken,user }) => {
  const handleSubmitLogin = async (values) => {
    try {
      await axios
        .post("http://127.0.0.1:8000/api/admin/login", values)
        .then((response) => {
          const token = response.data;
          setToken(token);
        });
    } catch (error) {
      
      toast.error("Đăng nhập thất bại tên tài khoản hoặc mật khẩu không đúng");
    }
  };
  return (
    <div>
      <ToastContainer />
      {/* component */}
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={Yup.object({
          email: Yup.string().email().required("Email is required"),
          password: Yup.string().required("Password is required"),
        })}
        onSubmit={(values) => handleSubmitLogin(values)}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
              <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
                <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                  <div className="max-w-md mx-auto">
                    <div className="mb-4">
                      <h1 className="text-xl font-semibold">
                        Login Form with Administrators rights
                      </h1>
                    </div>
                    <div className="divide-y divide-gray-200">
                      <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                        <div className="relative mb-5">
                          <Field
                            id="email"
                            name="email"
                            type="text"
                            className={`peer placeholder-transparent focus:border-blue-500  h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600 ${
                              touched.email && errors.email
                                ? "border-red-600"
                                : "!border-gray-300"
                            }`}
                            placeholder="Email address"
                          ></Field>
                          <label
                            htmlFor="email"
                            className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                          >
                            Email Address
                          </label>
                          <p className="text-[12px] h-5 text-red-600">
                            <ErrorMessage name="email" />
                          </p>
                        </div>
                        <div className="relative">
                          <Field
                            autoComplete="off"
                            id="password"
                            name="password"
                            type="password"
                            className={`peer placeholder-transparent focus:border-blue-500  h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600 ${
                              touched.password && errors.password
                                ? "border-red-600"
                                : "border-gray-300"
                            }`}
                            placeholder="Password"
                          ></Field>

                          <label
                            htmlFor="password"
                            className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                          >
                            Password
                          </label>
                          <p className="text-[12px] h-5 text-red-600">
                            <ErrorMessage name="password" />
                          </p>
                        </div>
                        <div className="relative">
                          <button
                            type="submit"
                            className="bg-blue-500 text-white rounded-md px-2 py-1"
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};
export default Login;
