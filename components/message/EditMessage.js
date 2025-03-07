import { useRef, useState, useEffect } from "react";
import { useAuth } from "../../store/auth-context";
import { MessageType } from "../../constants/messageType";
import MessageBanner from "../ui/MessageBanner";
import { ERROR_MESSAGE } from "../../constants/messageBannerType";

const EditMessage = (props) => {
  const [messageId, setmessageId] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const { auth, user, setUser } = useAuth();
  const messageTypeRef = useRef();
  const messageBodyRef = useRef();

  useEffect(() => {
    messageTypeRef.current.value = MessageType[props.message.message.message_type];
    messageBodyRef.current.value = props.message.message.message_body;

    setmessageId(props.message._id);
  }, []);

  const submitMessageHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    const messageData = {
      message_body: messageBodyRef.current.value,
      user_id: user._id,
      id: messageId,
    };

    const response = await fetch("/api/update-message", {
      method: "PUT",
      body: JSON.stringify(messageData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!data.error) {
      setLoading(false);

      props.setMessages((prev) => {
        return prev.map((message) =>
          message._id === data._id ? data : message
        );
      });

      props.closeModal();
    } else {
      setLoading(false);
      setError(true);
    }
  };

  return (
    <div>
      <h3 className="font-black text-3xl text-sky-900">Edit message</h3>
      {error && !loading ? (
        <MessageBanner type={ERROR_MESSAGE} message="Error updating message" />
      ) : (
        ""
      )}
      <form
        id="editMessageForm"
        className="mt-5"
        onSubmit={submitMessageHandler}
      >
        <div className="flex flex-col mb-3">
          <label
            htmlFor="messageType"
            className="text-left text-slate-500 pb-2"
          >
            Message Type
          </label>
          <input
            type="text"
            name="messageType"
            id="messageType"
            className="form-input border-1 border-slate-300 bg-slate-100 rounded-lg p-2"
            ref={messageTypeRef}
            placeholder={messageTypeRef}
            disabled
          />
        </div>
        <div className="flex flex-col mb-3">
          <label htmlFor="messageBody" className="text-left text-slate-500">
            Message Body
          </label>
          <textarea
            name="messageBody"
            id="messageBody"
            className="form-textarea border-1 border-slate-300 bg-white rounded-lg p-2 resize-none"
            ref={messageBodyRef}
            placeholder={messageBodyRef}
            maxLength="300"
            required
          />
        </div>

        <div className="flex flex-col mb-3">
          <button
            id="submitMessageButton"
            type="submit"
            className="
              min-w-full 
              mt-5 
              p-4 
              bg-sky-900 
              transition 
              ease-in-out 
              delay-150 
              hover:bg-blue-500 
              font-bold 
              text-white 
              rounded-2xl 
              shadow-lg
              disabled:bg-slate-400
            "
            disabled={loading ? true : false}
          >
            Edit Message
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditMessage;
