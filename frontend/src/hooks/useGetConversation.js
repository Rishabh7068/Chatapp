import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useConversation from "../zustand/useConversation";


const useGetConversation = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);

 
  
  useEffect(()=>{
    const getConversation = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/users`,{
                method : "GET",
                credentials : "include"
            });
            const data = await res.json();
            if(data.error){
                throw new Error(data.error);
            }
            setConversations(data);
        } catch (error) {
            toast.error(error.message);
        }finally{
            setLoading(false);
        }
    }
    getConversation();
  },[])
  return {loading , conversations , setConversations};
}

export default useGetConversation