import { checkPropTypes } from "prop-types";
import { useCallback, useEffect, useRef, useState } from "react";

const EditFile = ({ value,dataId,handleEdit }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [data, setData] = useState(value);
  const inputRef = useRef(null);

  const handleClick = useCallback(() => {
    setIsEdit(!isEdit);
  }, [isEdit])
  useEffect(() => {
    if (isEdit && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isEdit])
  const handleBlurEdit = ()=>{
    setIsEdit(false);
    const value = inputRef.current.value
    const name = inputRef.current.name
    handleEdit(dataId,name,value)
  }
  return (
    <div>
      {
        <input
          value={data}
          type="number"
          name="sort_order"
          autoFocus={true}
          data-id={dataId}
          ref={inputRef}
          onBlur={handleBlurEdit}
          className={`${
            isEdit ? "block" : "hidden"
          } border px-2 py-2 w-12 rounded-sm outline-none focus:border-blue-500`}
          onChange={(e) => setData(e.target.value)}
        />
      }
      {!isEdit && (
        <span className="px-5 py-2 cursor-text" onDoubleClick={handleClick}>
          {data}
        </span>
      )}
    </div>
  );
};
EditFile.propTypes = {
    value: checkPropTypes.number,
    dataId: checkPropTypes.number,
    handleEdit: checkPropTypes.func
  };
export default EditFile;
