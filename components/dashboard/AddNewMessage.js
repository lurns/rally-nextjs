import { useRef, useState } from "react";
import classes from './DashHome.module.css';
import { useAuth } from "../../store/auth-context";
import ErrorMessage from '../../components/ui/ErrorMessage';
import SuccessMessage from "../ui/SuccessMessage";
import { useRouter } from "next/router";

const AddNewMessage = () => {
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

		// TODO: error handling

        const messageData = {
            message_body: messageBodyRef.current.value,
            message_type: messageTypeRef.current.value,
			user_id: user._id,
        }

		const response = await fetch('/api/new-message', {
			method: 'POST',
			body: JSON.stringify(messageData),
			headers: {
				'Content-Type': 'application/json'
			}
			});
	
			const data = await response.json();
			console.log(data);
	
			if (!data.error) {
				// clear fields, give success msg
				setLoading(false);
				document.getElementById('messageBody').value = '';
				setSuccess(true);
				router.push('/dash');  
			} else {
				setLoading(false);
				setError(true);
			}
    }

  	return (
		<div className={classes}>
			<h3 className="font-black text-3xl text-sky-900">
				Add New Message
			</h3>
			{error && !loading ? <ErrorMessage message="Error adding message" /> : ''}
			{success && !loading ? <SuccessMessage message="Message added!" /> : ''}
			<form id="addNewMessageForm" className="mt-5" onSubmit={submitMessageHandler}>
			<div className="flex flex-col mb-3">
				<label 
					htmlFor="messageType"
					className="text-left text-slate-500"
				>Message Type
				</label>
				<select 
					name="messageType"
					id="messageType"
					className="border-slate-300 form-select"
					ref={messageTypeRef}
					required
				>
					<option value="ON_TRACK">On track</option>
					<option value="MOTIVATIONAL">Motivational</option>
					<option value="DO_BETTER">Could be better...</option>
					<option value="DO_BETTER_ER">Get out there!</option>
				</select>
			</div>
			<div className="flex flex-col mb-3">
				<label 
					htmlFor="messageBody"
					className="text-left text-slate-500"
				>Message Body
				</label>
				<textarea
					name="messageBody"
					id="messageBody"
					className="border-slate-300 form-textarea resize-none"
					ref={messageBodyRef}
					placeholder="Be gentle..."
					maxLength="300"
					required
				/>
			</div>
			<div className="flex flex-col mb-3">
				<button id="submitMessageButton"
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
					"
					disabled={loading ? true : false}
				>
					Add New Message
				</button>
			</div>

			</form>
	</div>
  )
}

export default AddNewMessage;