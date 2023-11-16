import Skeleton from "react-loading-skeleton";
import PropTypes from "prop-types";

const SkeletonCategory = ({loading,limit=5}) => {
  return (
    <>
      {loading &&
        Array(limit)
          .fill(1)
          .map((item, index) => (
            <tr key={index}>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <Skeleton className="" width={"10px"} rounded />
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <div className="flex items-center">
                  <div className="flex-shrink-0 w-10 h-10">
                    <Skeleton
                      className=""
                      height={"40px"}
                      width={"40px"}
                      rounded
                    />
                  </div>
                  <div className="ml-3">
                    <p className="text-gray-900 whitespace-no-wrap">
                      <Skeleton className="" height={"20px"} width={"200px"} />
                    </p>
                  </div>
                </div>
              </td>

              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">
                  <Skeleton className="" height={"20px"} width={"100px"} />
                </p>
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">
                  <Skeleton className="" height={"20px"} width={"100px"} />
                </p>
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">
                  <Skeleton className="" height={"20px"} width={"100px"} />
                </p>
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <Skeleton className="" height={"20px"} width={"50px"} />
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <Skeleton className="" height={"20px"} width={"100px"} />
              </td>
            </tr>
          ))}
    </>
  );
};
SkeletonCategory.propTypes = {
  loading: PropTypes.bool,
  limit: PropTypes.number,
};
export default SkeletonCategory;
