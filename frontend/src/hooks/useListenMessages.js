import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext"
import useConversation from "../zustand/useConversation";
import ns from "../assets/sounds/notification.mp3";
import toast from "react-hot-toast";
const useListenMessages = () => {
    const {socket} = useSocketContext();
    const {messages , setMessages , selectedConversation} = useConversation();


    const helper = async (newMessage)=>{
		if(selectedConversation._id === newMessage.senderId){
			setMessages([...messages, newMessage]);
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