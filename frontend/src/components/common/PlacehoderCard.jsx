import Skeleton from "react-loading-skeleton";

const PlacehoderCard = () => {
  return (
    <div className="">
      <div className="mx-1 flex h-full flex-col justify-between  group rounded-md overflow-hidden relative  bg-white p-[20px]">
        <div className="">
          <div className="cursor-wait relative min-h-[170px]">
            <Skeleton className="" height={"170px"} />
          </div>
        </div>
        <div className=" relative pb-0 transition-all duration-500 mt-0 z-20 py-3 bg-white">
          <h3 className="text-[15px] text-ellipsis h-10 w-full line-clamp-2 leading-[1.2em] max-h-[2.4em]  overflow-hidden ">
            <Skeleton className="" height={"20px"} width={"80%"} />
          </h3>
          <div className=" gap-2">
            <Skeleton className="" height={"10px"} width={"30%"} />
          </div>
          <div className="gap-3">
            <h4 className="text-[#3741ff] font-bold text-base mt-1"></h4>
          </div>
          <div>
            <p className="text-gray-500 mt-3">
              <Skeleton className="" height={"20px"} width={"100%"} />
            </p>
          </div>

          <button className="bg-[#2b38d1] absolute mt-5 text-white py-2 px-5 w-full lg:py-2 lg:px-8 rounded-full transition-all">
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlacehoderCard;
