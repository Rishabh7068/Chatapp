import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';

const useSignup = () => {
    const [loading, setLoading] = useState(false);
    const {setAuthUser} = useAuthContext();

    const signup = async ({fullName , username , gender , password , confirmPassword}) =>{
       const success = handelInputErrors({fullName , username , gender , password , confirmPassword});
       if(!success){
        return;
       }
       setLoading(true);
       try {
            const res = await fetch(`/api/auth/signup`,{
                method : "POST",
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify({fullName , username , gender , password , confirmPassword})
            })
            const data = await res.json();
            

            if(data.error){
                throw new Error(data.error);
            }

            //localstorage
            localStorage.setItem("chat-user",JSON.stringify(data));
            //context
            setAuthUser(data);
            toast.success(`Signup Successfully ${data.fullName}`);
       } catch (error) {
        toast.error(error.message);
       }finally{
        setLoading(false);
       }
    }
    return {loading ,signup};
}

export default useSignup


function handelInputErrors({fullName , username , gender , password , confirmPassword}){
    if(!fullName || !username || !password || !confirmPassword || !gender){
        toast.error("Please fill all fields");
        return false;
    }
    if(password !== confirmPassword){
        toast.error("Password do not match");
        return false;
    }

    if(password.length <  6){
        toast.error("Password must be of 6 characters");
        return false;
    }


    return true;
}