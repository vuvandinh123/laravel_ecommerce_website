import { useState } from "react";
import Siderbar from "./Siderbar";
import Table from "./Table";
import { useApiCall } from "../../../hooks";
import { deleteRequestAdmin, getRequestAdmin, postRequestAdmin } from "../../../api/requestAdmin";
import { MENUS } from "../../../constants/constants";
import {  toast } from "react-toastify";

const MenuAdmin = () => {
  const [menus, setMenus] = useState([]);
  const [isReset, setIsReset] = useState(false);
  useApiCall(
    async () => {
      const res = await getRequestAdmin(MENUS, { limit: 20 });
      setMenus(res.data);
      setIsReset(false);
      return null;
    },
    [isReset],
    []
  );
  const handleEdit = (id,name,value) => {
    setIsReset(true);
    async function updateField(){
      const res = await postRequestAdmin("menus/field/"+id,{name,value})
      setIsReset(false);
    }
    updateField()
    
  }
  const handleDelete = (id) => {
    async function deleteField(){
      const res = await deleteRequestAdmin(MENUS+"/"+id)
      if(res){
        const newMenus = menus.filter((item) => item.id !== id);
        setMenus(newMenus);
        toast.success("Xoá thành công " + res.data.name  );
      }
    }
    deleteField()
  }
  return (
    <div className="m-3">
      <div className="flex bg- p-5 gap-3 rounded-md">
        <div className="basis-1/5 border bg-white rounded-md p-5">
          <Siderbar menus={menus} setIsReset={setIsReset}/>
        </div>
        <div className="basis-4/5">
          <Table handleEdit={handleEdit} handleDelete={handleDelete} menus={menus} />
        </div>
      </div>
    </div>
  );
};

export default MenuAdmin;
