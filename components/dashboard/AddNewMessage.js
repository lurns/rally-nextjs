import { useRef, useState } from "react";
import { useAuth } from "../../store/auth-context";
import MessageBanner from "../ui/MessageBanner";
import { useRouter } from "next/router";
import {
  DO_BETTER,
  DO_BETTER_ER,
  MessageType,
  MOTIVATIONAL,
  ON_TRACK,
} from "../../constants/messageType";
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "../../constants/messageBannerType";

const AddNewMessage = (props) => {
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const { auth, user, setUser } = useAuth();
  const router = useRouter();
  const messageBodyRef = useRef();
  const messageTypeRef = useRef();

  const submitMessageHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const messageData = {
        message_body: messageBodyRef.current.value,
        message_type: messageTypeRef.current.value,
        user_id: user._id,
      };

      if (!messageData.user_id)
        throw new Error("You need to login to save a message.")

      if (!messageData.message_body || !messageData.message_type || messageData.message_body.trim() === '')
        throw new Error("Message type and body required.");
  
      const response = await fetch("/api/new-message", {
        method: "POST",
        body: JSON.stringify(messageData),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      const data = await response.json();
  
      if (!data.error) {
        // clear fields, give success msg
        setLoading(false);
        document.getElementById("messageBody").value = "";
        setSuccess(true);
        if (props.setMessages) props.setMessages((current) => [data, ...current]);
        props.closeModal ? props.closeModal() : router.push("/dash");
      } else {
        setLoading(false);
        setError(true);
      }
    } catch (e) {
      setLoading(false);
      setError(e.message);
    }
  };

  return (
    <div>
      <h3 className="font-black text-3xl text-sky-900">Add New Message</h3>
      {error && !loading ? <MessageBanner type={ERROR_MESSAGE} message={error ?? "Error adding message"} /> : ""}
      {success && !loading ? <MessageBanner type={SUCCESS_MESSAGE} message="Message added!" /> : ""}
      <form
        id="addNewMessageForm"
        className="mt-5"
        onSubmit={submitMessageHandler}
      >
        <div className="flex flex-col mb-3">
          <label htmlFor="messageType" className="text-left text-slate-500">
            Message Type
          </label>
          <select
            name="messageType"
            id="messageType"
            className="form-select border-1 border-slate-300 bg-slate-100 rounded-lg p-2"
            ref={messageTypeRef}
            required
          >
            <option value={ON_TRACK}>{MessageType.ON_TRACK}</option>
            <option value={MOTIVATIONAL}>{MessageType.MOTIVATIONAL}</option>
            <option value={DO_BETTER}>{MessageType.DO_BETTER}</option>
            <option value={DO_BETTER_ER}>{MessageType.DO_BETTER_ER}</option>
          </select>
        </div>
        <div className="flex flex-col mb-3">
          <label htmlFor="messageBody" className="text-left text-slate-500">
            Message Body
          </label>
          <textarea
            name="messageBody"
            id="messageBody"
            className="form-textarea border-1 border-slate-300 bg-slate-100 rounded-lg p-2 resize-none"
            ref={messageBodyRef}
            placeholder="Be gentle..."
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
            Add New Message
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNewMessage;
