import { useState, useEffect } from "react";
import { formatDateMDY } from "../../lib/formatDate";
import 'material-icons/iconfont/material-icons.css';
import MessageBanner from "../ui/MessageBanner";
import { ERROR_MESSAGE } from "../../constants/messageBannerType";

const DeleteMessage = (props) => {
  const [messageId, setMessageId] = useState('')
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMessageId(props.message._id);
  }, [])

  const submitMessageHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      await fetch('/api/delete-message', {
        method: 'DELETE',
        body: JSON.stringify({ id: messageId }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      setLoading(false);

      // rm from message state
      props.setMessages((prev) => {
        return prev.filter((message) => message._id !== messageId)
      });

      props.closeModal()
    } catch (e) {
      setLoading(false);
      setError("Unable to delete message");
    }
  }

  return (
    <div>
      <h3 className="font-black text-3xl text-red-900">
        Delete Message
      </h3>
      {error && !loading ? <MessageBanner type={ERROR_MESSAGE} message={error} /> : ''}
      <p className="text-center mt-5">
        Are you sure you want to delete <br/> 
        <strong>{props.message.message.message_body}</strong>
        &nbsp;on <strong>{formatDateMDY(props.message.message.date)}</strong>
      </p>
      <form id="deleteMessageForm" className="mt-5" onSubmit={submitMessageHandler}>
        <div className="flex flex-col mb-3">
          <button id="submitMessageButton"
            type="submit" 
            className="
              min-w-full 
              mt-5 
              p-4 
              bg-red-500 
              transition 
              ease-in-out 
              delay-150 
              hover:bg-red-900 
              font-bold 
              text-white 
              rounded-2xl 
              shadow-lg
              disabled:bg-slate-400
            "
            disabled={loading ? true : false}
          >
            {loading ? 
              <span className="animate-spin material-icons-outlined">progress-activity</span>
               : "Delete it!" 
            }
          </button>
        </div>
      </form>
    </div>
  )
}

export default DeleteMessage;