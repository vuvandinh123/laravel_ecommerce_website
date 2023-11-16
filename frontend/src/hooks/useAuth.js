import axios from "axios";
import { useEffect, useState } from "react";

export default function useAuth(token){
    const [user,setUser] = useState();
    useEffect(() => {
        const fetchUserData = (token) => {
          const headers = {
            Authorization: `Bearer ${token}`,
          };
          axios
            .get("http://127.0.0.1:8000/api/admin/auth/user", { headers })
            .then((response) => {
              const userData = response.data;
              sessionStorage.setItem("user", JSON.stringify(userData));
              setUser(userData);
            })
            .catch((error) => {
              console.error(error);
            });
        };
        if (token) {
          fetchUserData(token)
        }
      }, [token]);
      return {
        user
      }
}