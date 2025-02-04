import React from "react";

const MessageSkelaton = () => {
  const skelotonMessage = Array(2).fill(null);
  return (
    <div className=" flex-1  flex-col flex overflow-y-hi p-4 space-y-4">
      {skelotonMessage.map((_, idx) => (
        <div
          key={idx}
          className={`chat ${idx % 2 === 0 ? "chat-start" : "chat-end"}`}
        >
          <div className="chat-image avatar">
            <div className="size-10 rounded-full ">
              <div className="skeleton size-full  rounded-full"/>
            </div>
            <div>
            <div className="chat-header mb-1">
              <div className="skeleton h-6 w-16" />
            </div>
            <div className="chat-bubble bg-transparent p=0">
              <div className="skeleton h-16 w-[200px]" />
            </div>
            </div>
            
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageSkelaton;
