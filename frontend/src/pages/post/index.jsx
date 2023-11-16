import { useApiCall } from "../../hooks";
import { Link } from "react-router-dom";
import { AppURL } from "../../api/AppURL";
import { SiderbarBlog } from "../../components/common";
import { useState } from "react";
import { getRequestSite } from "../../api/requestSite";
import { POSTS } from "../../constants/constants";

const Post = () => {
  const [data, setData] = useState([]);

  const handleSearch = (value) => {
    setData(value);
  };
  useApiCall(
    async () => {
      const res =  await getRequestSite(POSTS,{limit:50});
      setData(res?.data.data);
      return null;
    },
    [],
    []
  );
  return (
    <div>
      <section className="bg-white dark:bg-gray-900">
        <div className="container px-6 py-10 mx-auto">
          <h1 className="text-3xl text-center font-semibold text-gray-600 capitalize lg:text-4xl dark:text-white">
            Blog
          </h1>
          <div className="flex justify-center mt-2 text-[14px]">
            <ul className="flex items-center gap-3">
              <li className="text-blue-500">
                <a href="">Home</a>
              </li>
              <li>/</li>
              <li>Blog</li>
            </ul>
          </div>
          <div className="grid grid-cols-5 gap-4">
            <div className="col-span-1 border p-5">
              <SiderbarBlog handleSearch={handleSearch} />
            </div>
            <div className="col-span-4">
              <div>
                {data?.length > 0 ?
                  data.map((item, index) => (
                    <div key={index} className="mt-8 lg:-mx-6 gap-7 lg:flex">
                      <div className="basis-1/5">
                        <Link to={`/blog/${item.slug}`}>
                          <img
                            className="object-cover w-full lg:mx-6 lg: rounded-xl "
                            src={AppURL.ImageUrl + item?.image}
                            alt=""
                          />
                        </Link>
                      </div>

                      <div className="mt-6 basis-4/5 lg:mt-0 lg:mx-6 ">
                        <p className="text-[10px]  text-blue-500 uppercase">
                          category
                        </p>
                        <Link
                          to={`/blog/${item.slug}`}
                          href="#"
                          className="block mt-2 text-xl font-semibold text-gray-800 hover:underline dark:text-white "
                        >
                          {item.title}
                        </Link>
                        <p className="mt-3 text-gray-500  text-[14px] text-ellipsis  w-full line-clamp-2 leading-[1.5em]   overflow-hidden">
                          {item.compact}
                        </p>
                        <Link
                          to={`/blog/${item.slug}`}
                          href="#"
                          className="inline-block mt-2 text-blue-500 underline hover:text-blue-400"
                        >
                          Read more
                        </Link>
                      </div>
                    </div>
                  ))
                : 
                <h3 className=" my-10 text-2xl text-gray-500">Blog not resul</h3>
                }
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Post;
