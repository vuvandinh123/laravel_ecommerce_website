import { useCountDown } from "../../hooks";

const CountDown = () => {
  const timeCountDown = new Date("2023-10-28T00:00:00").getTime();
  const { time } = useCountDown(timeCountDown);
  return (
    <div>
      <span className="px-3 me-1 py-2 bg-red-600 font-bold rounded-sm text-white">
        {time.days}
      </span>
      <span className="px-3 me-1 py-2 bg-red-600 font-bold rounded-sm text-white">
        {time.hours}
      </span>
      <span className="px-3 me-1 py-2 bg-red-600 font-bold rounded-sm text-white">
        {time.minutes}
      </span>
      <span className="px-3 py-2 bg-red-600 font-bold rounded-sm text-white">
        {time.seconds}
      </span>
    </div>
  );
};

export default CountDown;
