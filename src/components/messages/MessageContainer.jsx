import { useEffect } from "react";
import useConversation from "../../zustand/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { FaVideo, FaPhone } from "react-icons/fa";
import Logo from "../../images/Logo.png";
import { useAuthContext } from "../../context/AuthContext";

const MessageContainer = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const { authUser } = useAuthContext();

  useEffect(() => {
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);

  const noChatSelected = !selectedConversation;

  return (
    <div className="flex-1 flex flex-col bg-[#F0ECE5]">
      {noChatSelected ? (
        <NoChatSelected authUser={authUser} />
      ) : (
        <>
          <div className="bg-[#31304D] text-white px-4 py-2 mb-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="avatar online">
                <div className="w-8 rounded-full">
                  <img
                    src={selectedConversation?.profilePic || ""}
                    alt="user-avatar"
                  />
                </div>
              </div>
              <span className="font-bold">
                {selectedConversation?.username}
              </span>
            </div>
            <div className="flex gap-4">
              <FaVideo className="w-5 h-5 cursor-pointer" />
              <FaPhone className="w-5 h-5 cursor-pointer" />
            </div>
          </div>
          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );
};

export default MessageContainer;

const NoChatSelected = ({ authUser }) => {
  useEffect(() => {
    const logo = document.querySelector(".logo");
    logo.classList.add("hover-effect");
  }, []);

  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl text-[#31304D] font-semibold flex flex-col items-center gap-2">
        <img src={Logo} alt="App Logo" className="w-24 h-24 mb-4 logo" />
        <p>Welcome {authUser.username}</p>
        <p>Select a chat to start messaging</p>
      </div>
    </div>
  );
};
