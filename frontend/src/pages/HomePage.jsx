import React from "react";
import { useChatStore } from "../store/useChatStore";
import SideBar from "../components/SideBar";
import ChatContainer from "../components/ChatContainer";
import NoChatSelected from "../components/NoChatSelected";

const HomePage = () => {
  const { selectedUser } = useChatStore();
  return (
    <div className="h-screen   bg-base-100">
      <div className="  flex flex-row  items-center justify-center pt-30 px-6 lg:px-20">
        <div
          className="bg-primary-100 rounded-lg
         shadow-lg w-full mxa-w-6xl h-[cal(100vh-8rem)]"
        >
          <div className=" h-full flex  rounded-lg overflow-hidden">
            <SideBar />

            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
