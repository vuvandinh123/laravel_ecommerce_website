import { Editor } from "@tinymce/tinymce-react";
import PropTypes from "prop-types";

const Editorjs = ({ label,editorRef,init ,value}) => {
  return (
    <div className="mb-3">
      <label className="mb-2 mt-3  block text-base font-medium text-[#04043c8e]">
        {label}
      </label>
      <Editor
        selector="textarea"
        apiKey="j1fsmmahijypg88g0gdlwwsd58m55rdo2znfck5736tz7q07"
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue={`${value || "<p>No data !</p>"} `}
        init={{
          ...init,
          
          plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table paste code help wordcount",
          ],
          toolbar:
            "undo redo | formatselect | " +
            "bold italic backcolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
      />
    </div>
  );
};
Editorjs.propTypes = {
  label: PropTypes.string,
  editorRef: PropTypes.object,
  init: PropTypes.object,
  value: PropTypes.string

};
export default Editorjs;
