import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const {setAuthUser} = useAuthContext();
    

    const login = async (username , password) =>{
       const success = handelInputErrors(username, password);
       console.log(`/api/auth/login`);
       
       if(!success){
        return;
       }

       setLoading(true);
       try {
            const res = await fetch(`/api/auth/login`,{
                method : "POST",
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify({ username , password })
            })
            const data = await res.json();
            if(data.error){
                throw new Error(data.error);
            }
           
            localStorage.setItem("chat-user",JSON.stringify(data));
         
            setAuthUser(data);
            toast.success(`Login Successfully ${data.fullName}`);
       } catch (error) {
        toast.error(error.message);
       }finally{
        setLoading(false);
       }
    }
    return {loading ,login};
}

export default useLogin


function handelInputErrors(username,password ){
    if(!username || !password){
        toast.error("Please fill all fields");
        return false;
    }
    if(password.length <  6){
        toast.error("Password must be of 6 characters");
        return false;
    }
    return true;
}