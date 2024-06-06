import { useState, useEffect } from "react";
import { BsSend } from "react-icons/bs";
import useSendMessage from "../../hooks/useSendMessage";
import useConversation from "../../zustand/useConversation";
import * as toxicity from "@tensorflow-models/toxicity";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const [toxicityModel, setToxicityModel] = useState(null);
  const { loading, sendMessage } = useSendMessage();
  const { selectedConversation } = useConversation();

  useEffect(() => {
    const loadToxicityModel = async () => {
      const threshold = 0.9;
      const model = await toxicity.load(threshold);
      setToxicityModel(model);
    };
    loadToxicityModel();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message || !selectedConversation || !toxicityModel) return;

    const sentences = [message];
    const predictions = await toxicityModel.classify(sentences);
    const isToxic = predictions.some((prediction) =>
      prediction.results.some((result) => result.match)
    );

    if (isToxic) {
      alert("Toxic message detected! Message not sent.");
      setMessage("");
    } else {
      await sendMessage(message, selectedConversation.id);
      setMessage("");
    }
  };

  return (
    <div>
      <form className="px-4 my-3" onSubmit={handleSubmit}>
        <div className="w-full relative">
          <input
            type="text"
            className="border text-sm rounded-lg block w-full pl-4 pr-10 p-2.5 bg-gray-700 border-gray-600 text-white"
            placeholder="Send a message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <span className="absolute inset-y-0 right-0 flex items-center pr-3">
            {loading ? (
              <div className="loading loading-spinner"></div>
            ) : (
              <BsSend
                className="w-5 h-5 text-white cursor-pointer"
                onClick={handleSubmit}
              />
            )}
          </span>
        </div>
      </form>
    </div>
  );
};

export default MessageInput;
