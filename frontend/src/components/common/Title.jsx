import PropTypes  from "prop-types";

const Title = ({title}) => {
  return (
    <span className="absolute bg-[#000] opacity-0 transition-all duration-200 invisible group-hover/t:opacity-100 group-hover/t:visible group-hover/t:-translate-x-2 text-white px-2 w-max py-2 rounded-md right-full text-[11px] -translate-x-0 after:content-[''] after:border-t-[6px] after:border-solid after:absolute  after:border-t-transparent  after:border-s-[6px] after:border-s-[#000] after:border-b-[6px] after:border-b-transparent after:translate-x-[8px] after:top-[10px]">
      {title}
    </span>
  );
};
Title.propTypes = {
  title: PropTypes.string
}
export default Title;
