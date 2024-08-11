import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext"
import useConversation from "../zustand/useConversation";
import ns from "../assets/sounds/notification.mp3";
import toast from "react-hot-toast";
import useGetConversation from "./useGetConversation";
const useListenMessages = () => {
    const {socket} = useSocketContext();
    const {messages , setMessages , selectedConversation} = useConversation();

    const { conversations, setConversations } = useGetConversation();


    const helper = async (newMessage)=>{
		if(selectedConversation._id === newMessage.senderId){
			setMessages([...messages, newMessage]);
		}
        
        const present = conversations.find(x => x._id === newMessage.senderId);

        if(!present){
            try {
                const res = await fetch(`/api/users`,{
                    method : "GET",
                    credentials : "include"
                });
                const data = await res.json();
                if(data.error){
                    throw new Error(data.error);
                }
                
                const newuser = data.find(x=>x._id === newMessage.senderId);
                setConversations([...conversations , newuser]);
            } catch (error) {
                toast.error(error.message);
            }
        }

		if(selectedConversation._id !== newMessage.senderId){
			toast(newMessage.messages, {
				icon: `🔔 ${newMessage.senderName}`,
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                  },
			  });
		}
	}


    useEffect(()=>{


        socket?.on("newMessage",(newMessage)=>{
            newMessage.shouldShake = true;
            const sound = new Audio(ns);
            sound.play();
			helper(newMessage);
        })
    
        return()=>{
            socket?.off("newMessage");
        }
    },[socket,setMessages,messages]);
}

export default useListenMessages