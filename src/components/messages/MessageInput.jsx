import { useState } from "react";
import { BsSend } from "react-icons/bs";
import useSendMessage from "../../hooks/useSendMessage";
import useConversation from "../../zustand/useConversation";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const { loading, sendMessage } = useSendMessage();
  const { selectedConversation } = useConversation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message || !selectedConversation) return;
    await sendMessage(message, selectedConversation.id);
    setMessage("");
  };

  return (
    <div>
      <form className="px-4 my-3" onSubmit={handleSubmit}>
        <div className="relative w-full">
          <input
            type="text"
            className="border text-sm rounded-lg block w-full pl-4 pr-12 p-2.5 bg-gray-700 border-gray-600 text-white"
            placeholder="Send a message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            type="submit"
            className="absolute inset-y-0 right-3 flex items-center focus:outline-none"
            style={{
              background: "none",
              border: "none",
              padding: 0,
              margin: 0,
            }}
          >
            {loading ? (
              <div className="loading loading-spinner"></div>
            ) : (
              <BsSend className="w-5 h-5 text-white" />
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MessageInput;
