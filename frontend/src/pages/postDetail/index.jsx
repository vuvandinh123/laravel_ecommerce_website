import { useParams } from "react-router-dom";
import { AppURL } from "../../api/AppURL";
import { useApiCall, useScrollTop } from "../../hooks";
import { ImageLoader, SiderbarBlog } from "../../components/common";
import { getRequestSite } from "../../api/requestSite";
import { POSTS } from "../../constants/constants";


const PostDetail = () => {
  const { slug } = useParams();
  useScrollTop();
  const { data } = useApiCall(
    async () => {
      return await getRequestSite(POSTS + `/${slug}`);
    },
    [slug],
    []
  );
 
  const post = data?.data || [];

  return (
    <div className="p-10">
      <div className="grid-cols-5 grid gap-5">
        <div className="col-span-1 p-5 border-r ">
          <SiderbarBlog />
        </div>
        <div className="col-span-4">
          <div className=" m-0">
            <ImageLoader
              className="w-full h-full"
              src={AppURL.ImageUrl + post?.image}
              alt=""
            />
          </div>
          <div className="w-[80%] m-auto my-10">
            <p className="my-3 text-blue-400">Category</p>
            <h1 className="text-3xl font-bold mb-10">{post?.title}</h1>
            <div className="text-[13px]">{post?.compact}</div>
            <div className="my-10 overflow-hidden text-gray-500 leading-8 text-base">
              <div dangerouslySetInnerHTML={{ __html: post?.content }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
