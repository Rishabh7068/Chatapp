import toast from "react-hot-toast";
import useConversation from "../zustand/useConversation";
import { useState } from "react";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const {selectedConversation ,setMessages ,messages} = useConversation();

  const sendmsg = async(message)=>{
    
    if(message.length === 0){
        toast.error("Empty Message Can not Send");
        return;
    }

    setLoading(true);
    try {
        const res = await fetch(`/api/msg/send/${selectedConversation._id}`,{
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({ message })
        })
        const data = await res.json();
        if(data.error){
            throw new Error(data.error);
        }

        setMessages([...messages, data]);
        toast.success("Sent");
    } catch (error) {
        toast.error(error.message );
    }finally{
        setLoading(false);
    }
  }
  return {loading ,sendmsg};
}

export default useSendMessage