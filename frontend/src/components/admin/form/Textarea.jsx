import { useField } from "formik";
import PropTypes from "prop-types";
const Textarea = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="mb-3">
      <label
        htmlFor={props.id || props.name}
        className="mb-2 mt-3  block text-base font-medium text-[#04043c8e]"
      >
        {label}
      </label>
      <textarea {...props} {...field}></textarea>
      {meta.touched && meta.error && (
        <div className="text-red-500 text-[12px] mt-2 ms-1">{meta.error}</div>
      )}
    </div>
  );
};
Textarea.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
};
export default Textarea;
