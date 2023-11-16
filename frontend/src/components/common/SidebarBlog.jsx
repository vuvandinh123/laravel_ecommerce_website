import {
  AiFillGoogleCircle,
  AiFillInstagram,
  AiFillTwitterCircle,
  AiOutlineSearch,
} from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";
import { useApiCall } from "../../hooks";
import { useState } from "react";
import PropTypes from "prop-types";
import { getRequestSite, postRequestSite } from "../../api/requestSite";
import { POSTS_SEARCH, TOPIC } from "../../constants/constants";

const SidebarBlog = ({handleSearch}) => {
  const [search, setSearch] = useState("");
  const [isSearch,setIsSearch] = useState(false);
  const { data: topics } = useApiCall(
    async () => {
      return await getRequestSite(TOPIC, { limit: 20 });
    },
    [],
    []
  );

  const handleSubmitSearch = async (e) => {
    e.preventDefault();
    const res = await postRequestSite(POSTS_SEARCH,{search});
    console.log(res);
    setIsSearch(true);
    handleSearch(res.data);
  };
  const topic = topics?.data?.data.data || [];

  return (
    <div className="sticky top-20">
      <form action="" onSubmit={handleSubmitSearch} className="my-10">
        <div className="flex items-center relative">
          <input
            type="text"
            onChange={(e) => {
              setSearch(e.target.value)
              setIsSearch(false);
            }}
            placeholder="Search blog ..."
            className="rounded-md w-full bg-[#F7F7F9] px-5 py-4 border outline-none pr-14 focus:border-blue-500"
          />
          <button className="absolute right-5">
            <AiOutlineSearch className="text-3xl text-gray-400" />
          </button>
        </div>
        {isSearch && <p className="my-5">Search for: <span className="text-gray-800">{search}</span></p>}
      </form>
      <hr />
      <div className="my-10">
        <h3 className="text-2xl font-semibold mb-5">Topic</h3>
        <ul className="leading-8 text-gray-500">
          {topic.length > 0 &&
            topic.map((item) => (
              <li className="" key={item.id}>
                <a
                  className="block capitalize py-2 hover:text-red-500 transition-all duration-100"
                  href=""
                >
                  {item.name}
                </a>
              </li>
            ))}
        </ul>
      </div>
      <hr />
      <div className="my-10">
        <h3 className="text-xl font-semibold capitalize">SOCIAL</h3>
        <ul className="my-3 flex flex-wrap gap-3 items-center">
          <li>
            <a href="">
              <span>
                <AiFillTwitterCircle className="text-blue-500 text-4xl" />
              </span>
            </a>
          </li>
          <li>
            <a href="">
              <span>
                <BsFacebook className="text-blue-500 text-3xl" />
              </span>
            </a>
          </li>
          <li>
            <a href="">
              <span>
                <AiFillGoogleCircle className="text-red-500 text-4xl" />
              </span>
            </a>
          </li>
          <li>
            <a href="">
              <span>
                <AiFillInstagram className="text-red-500 text-4xl" />
              </span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};
SidebarBlog.propTypes = {
  handleSearch: PropTypes.func.isRequired,
}
export default SidebarBlog;
