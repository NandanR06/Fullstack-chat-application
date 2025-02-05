import React, { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkelaton from "./MessageSkelaton";
import { useAuthStore } from "../store/useAuthStore";
import { format } from "timeago.js";
import "../../src/index.css";

const ChatContainer = () => {
  const { unSubscribeFromMessage,subscriberToMessage,messages, getMessage, isMessageLoading, selectedUser } =
    useChatStore();
  const { authUser } = useAuthStore();

  const lastMessageRef = useRef(null); // Ref for last message

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [messages]);

  useEffect(() => {
    getMessage(selectedUser._id);
    subscriberToMessage();
    return ()=>unSubscribeFromMessage();
  }, [selectedUser._id, getMessage,subscriberToMessage,unSubscribeFromMessage]);

  if (isMessageLoading)
    return (
      <div className="flex flex-1 overflow-auto flex-col h-130">
        <ChatHeader />
        <MessageSkelaton />
        <MessageInput />
      </div>
    );
  return (
    <div className="flex-1 flex flex-col  h-130 ">
      <ChatHeader />
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={message._id}
            ref={index === messages.length - 1 ? lastMessageRef : null}
            className={`chat ${
              message.senderId === authUser._id ? "chat-start" : "chat-end "
            }`}
          >
            <div className="chat-image avatar">
              <div className="size-10 rounded-full border">
                <img
                  src={
                    message.senderId === authUser._id
                      ? authUser.profilepic || "/avatar.png"
                      : selectedUser.profilepic || "/avatar.png"
                  }
                  alt="profile pic"
                />
              </div>
            </div>
            <div className="chat-header mb-1 flex flex-col">
              <div className="chat-bubble flex bg-primary/60 flex-col text-[17px]">
                {message.image && (
                  <img
                    src={message.image}
                    alt="attach image"
                    className="sm:max-w-[150px] bg-transparent rounded-md mb-2"
                  />
                )}
                {message.text && <p>{message.text}</p>}
              </div>
              <div className="text-x5 opacity-50 ml-1">
                {format(message.createdAt)}
              </div>
            </div>
          </div>
        ))}
      </div>
      <MessageInput />
    </div>
  );
};

export default ChatContainer;
