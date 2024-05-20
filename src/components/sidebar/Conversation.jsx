import { useSocketContext } from "../../context/SocketContext";
import useConversation from "../../zustand/useConversation";
import { format } from "date-fns";

const Conversation = ({ conversation, lastIdx, lastMessageTime }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const { onlineUsers } = useSocketContext();

  const isSelected = selectedConversation?._id === conversation._id;
  const isOnline = onlineUsers.includes(conversation._id);

  let formattedTime = "Invalid Date";
  try {
    formattedTime = format(new Date(lastMessageTime), "p"); // Format the time using date-fns
  } catch (error) {
    console.error("Error formatting date:", error);
  }

  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-[#31304D] rounded p-2 py-1 cursor-pointer ${
          isSelected ? "bg-[#31304D]" : ""
        }`}
        onClick={() => setSelectedConversation(conversation)}
      >
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-12 rounded-full">
            <img src={conversation.profilePic} alt="user avatar" />
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-gray-200">{conversation.username}</p>
            <span className="text-xs text-gray-400">{formattedTime}</span>
          </div>
        </div>
      </div>

      {!lastIdx && <div className="divider my-0 py-0 h-1"></div>}
    </>
  );
};

export default Conversation;
