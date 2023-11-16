import Skeleton from "react-loading-skeleton";
import PropTypes from "prop-types";

const SkeletonImport = ({ limit, loading}) => {
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
                <Skeleton className="" height={"20px"} width={"200px"} />
              </td>
            </tr>
          ))}
    </>
  );
};
SkeletonImport.propTypes = {
  loading: PropTypes.bool,
  limit: PropTypes.number,
}
export default SkeletonImport;
