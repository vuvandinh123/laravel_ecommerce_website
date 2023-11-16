import PropTypes from "prop-types";

const Pagination = ({ total, page, filter, limit, setPage }) => {
  const numPage = Math.ceil(total / limit);
  const handleClickPrev = () => {
    if (page > 1) {
      setPage({ ...filter, page: page - 1 });
    }
  };
  const handleClickNext = () => {
    if (page < numPage) {
      setPage({ ...filter, page: page + 1 });
    }
  };
  return (
    <>
      <div className="flex items-center justify-center py-10 lg:px-0 sm:px-6 px-4">
        <div className="lg:w-3/5 w-full  flex items-center justify-between border-t border-gray-200">
          <div
            onClick={handleClickPrev}
            className="flex items-center pt-3 text-gray-600 hover:text-indigo-700 cursor-pointer"
          >
            <svg
              width={14}
              height={8}
              viewBox="0 0 14 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.1665 4H12.8332"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M1.1665 4L4.49984 7.33333"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M1.1665 4.00002L4.49984 0.666687"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="text-sm ml-3 font-medium leading-none ">Previous</p>
          </div>
          <div className="sm:flex hidden">
            {numPage &&
              [...Array(numPage)].map((item, index) => {
                if (index < page-5) {
                  return 
                }
                else if(index > page+3) {
                  return
                }
                return (
                  <p
                    key={index}
                    onClick={() => setPage({ ...filter, page: index + 1 })}
                    className={`${
                      index === page - 1
                        ? "text-indigo-600 border-indigo-400"
                        : "border-transparent"
                    } text-sm font-medium leading-none cursor-pointer text-gray-600 hover:text-indigo-700 border-t  hover:border-indigo-400 pt-3 mr-4 px-2`}
                  >

                    {index + 1}
                  </p>
                );
              })}
          </div>
          <div
            onClick={handleClickNext}
            className="flex items-center pt-3 text-gray-600 hover:text-indigo-700 cursor-pointer"
          >
            <p className="text-sm font-medium leading-none mr-3">Next</p>
            <svg
              width={14}
              height={8}
              viewBox="0 0 14 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.1665 4H12.8332"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9.5 7.33333L12.8333 4"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9.5 0.666687L12.8333 4.00002"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </>
  );
};
Pagination.propTypes = {
  total: PropTypes.number,
  page: PropTypes.number,
  setPage: PropTypes.func,
  limit: PropTypes.number,
  filter: PropTypes.object,
};
export default Pagination;
