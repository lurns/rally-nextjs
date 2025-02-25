import { useContext, useState, useEffect } from "react";
import { useAuth } from "../../store/auth-context";
import ErrorMessage from '../../components/ui/ErrorMessage';
import { formatDateMDY } from "../../lib/formatDate";

const DeleteMessage = (props) => {
  const [messageId, setMessageId] = useState('')
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMessageId(props.message._id);
  }, [])

  const submitMessageHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    const response = await fetch('/api/delete-message', {
      method: 'DELETE',
      body: JSON.stringify({ id: messageId }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    const data = await response.json();
  
    if (!data.error) {
      setLoading(false);

      // rm from message state
      props.setMessages((prev) => {
        return prev.filter((message) => message._id !== messageId)
      });

      props.closeModal()
    } else {
      setLoading(false);
      setError(true);
    }
  }

  return (
    <div>
      <h3 className="font-black text-3xl text-red-900">
        Delete Message
      </h3>
      {error && !loading ? <ErrorMessage message="Error deleting message" /> : ''}
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
            Delete it!
          </button>
        </div>
      </form>
    </div>
  )
}

export default DeleteMessage;