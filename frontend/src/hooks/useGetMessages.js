import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { setMessages  ,selectedConversation,messages } = useConversation();
  
  useEffect(() => {
    const getmessage = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/msg/${selectedConversation._id}`, {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();
        if (data.error) {
          throw new Error(data.error);
        }
        setMessages(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    getmessage();
  }, [selectedConversation?._id, setMessages]);

  return { loading ,messages};
};

export default useGetMessages;
