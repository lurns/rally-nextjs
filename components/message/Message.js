import { useContext, useEffect, useState } from "react";
import { useAuth } from "../../store/auth-context";
import { server } from "../../lib/config"
import { formatDateMDY } from "../../lib/formatDate";
import 'material-icons/iconfont/material-icons.css';
import Modal from "../ui/Modal";
import EditMessage from "./EditMessage";
import DeleteMessage from "./DeleteMessage";
import AddNewMessage from "../dashboard/AddNewMessage";
import { MessageType } from "../../constants/messageType";

const Message = () => {
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const { auth, user, setUser } = useAuth();
  const [messages, setMessages] = useState([])

	useEffect(() => {
		if (localStorage.getItem('rally_storage') !== '') {
			setUser(JSON.parse(localStorage.getItem('rally_storage')));
		}
	}, [auth, setUser]);

  useEffect(() => {
    const fetchit = async () => {
      const response = await fetch(`${server}api/messages`, {
        method: "GET",
      })
      const data = await response.json()
      setMessages(data)
    }
    fetchit()
  }, [])

  const addMessage = () => {
    setModalType('ADD');
    setModalOpen(true);
  }

  const editMessage = (message) => {
    setSelectedMessage(message);
    setModalType('EDIT');
    setModalOpen(true);
  }

  const deleteMessage = (message) => {
    setSelectedMessage(message);
    setModalType('DELETE');
    setModalOpen(true);
  }

  const closeModal = () => {
    setModalType('');
    setModalOpen(false);
    setSelectedMessage({});
  }

  return (
    <div className="flex h-screen bg-slate-700">
      <div className="flex mx-auto bg-slate-200 w-3/4 p-3">
        <div className="m-2">
          <div className="flex justify-between items-center">
            <h3 className="font-black text-4xl text-yellow-900 p-2">
              Your Messages
            </h3>
            <button id="newMessageButton"
              onClick={() => addMessage()} 
              type="button" 
              className="
                bg-green-500 
                transition 
                ease-in-out 
                delay-150 
                hover:bg-green-900 
                hover:cursor-pointer
                font-bold 
                text-white 
                w-11
                h-11
                rounded-full
                shadow-sm
              "
            >
              +
            </button>
          </div>

          {modalOpen && (<>
            <div 
              id="modalBackdrop"
              className="fixed top-0 left-0 w-full h-full bg-slate-800/75 backdrop-blur-xs"
              onClick={closeModal}
            ></div>
            <Modal>
              { modalType === 'EDIT' && <EditMessage message={selectedMessage} closeModal={closeModal} setMessages={setMessages} /> }
              { modalType === 'DELETE' && <DeleteMessage message={selectedMessage} closeModal={closeModal} setMessages={setMessages} /> }
              { modalType === 'ADD' && <AddNewMessage closeModal={closeModal} setMessages={setMessages} /> }
            </Modal>
          </>)}
          <table className="w-full table-fixed mx-auto mt-5">
            <thead>
              <tr className="bg-slate-400 border-b-4 border-orange-200">
                <th className="p-2 text-white rounded-tl-lg">Message</th>
                <th className="p-2 text-white">Type</th>
                <th className="p-2 text-white">Date</th>
                <th className="p-2 text-white">Edit</th>
                <th className="p-2 text-white rounded-tr-lg">Delete</th>
              </tr>
            </thead>
            <tbody>
            { messages && messages.map((message, index) => {
                return(
                  <tr key={index} className="bg-white border-b-2 border-dotted border-orange-200">
                    <td className="p-2 pl-5">{message.message.message_body}</td>
                    <td className="p-2 text-center">{MessageType[message.message.message_type]}</td>
                    <td className="p-2 text-center">{formatDateMDY(message.message.date)}</td>
                    <td className="p-2 text-center text-amber-500">
                      <span 
                        onClick={() => editMessage(message)} 
                        className="
                          transition 
                          duration-200 
                          ease-in-out 
                          hover:text-amber-900 
                          hover:cursor-pointer 
                          material-icons
                        ">edit</span>
                    </td>
                    <td className="p-2 text-center text-red-500">
                      <span 
                        onClick={() => deleteMessage(message)} 
                        className="
                          transition 
                          duration-200 
                          ease-in-out 
                          hover:text-red-900 
                          hover:cursor-pointer 
                          material-icons
                        ">delete</span>
                    </td>
                  </tr>)
            }) }
            </tbody>
          </table>
        </div>
        {!messages && <p>No messages...</p>}
      </div>
    </div>
  )
}

export default Message;