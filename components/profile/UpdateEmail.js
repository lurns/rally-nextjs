import { useRef, useState } from "react";
import { useAuth } from "../../store/auth-context";
import MessageBanner from "../ui/MessageBanner";
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "../../constants/messageBannerType";

const UpdateEmail = () => {
	const { auth, user, setUser } = useAuth();
	const emailRef = useRef();

	const [updateRespsonse, setUpdateResponse] = useState({});

	const submitHandler = async (e) => {
		e.preventDefault();

		try {
			const response = await fetch('/api/update-email', {
				method: 'PUT',
				body: JSON.stringify({email_input: emailRef.current.value}),
				headers: {
					'Content-Type': 'application/json'
				}
			});

			const data = await response.json();

			if (!data.error) {
				// update user
				let updateUser = user;
				updateUser.user.email = data.success;

				setUser({...updateUser});

				// clear input
				document.getElementById('email').value = '';

				// give success msg
				setUpdateResponse({ type: SUCCESS_MESSAGE, message: "Email updated." });
			} else {
				setUpdateResponse({ type: ERROR_MESSAGE, message: data.error });
			}
		} catch (e) {
			console.log(e);
			setUpdateResponse({ type: ERROR_MESSAGE, message: "Unable to update email." });
		}
	}

	return (
		<>
			{ Object.keys(updateRespsonse).length > 0 && 
				<MessageBanner type={updateRespsonse.type} message={updateRespsonse.message} />
			}
			<form id="updateEmail" className="mt-5" onSubmit={submitHandler}>
				<div className="flex flex-nowrap">
					<div className="w-full">
						<label
							htmlFor="email"
							className="flex text-left text-slate-500 pb-1"	
						>
								New Email
						</label>
						<input 
							type="email" 
							id="email"
							name="email"
							className="form-input border-1 border-slate-300 bg-slate-100 rounded-lg p-2 w-full"
							ref={emailRef}
						/>
					</div>
					<div className="flex-none self-end">
						<button className="
							transition
							duration-200
							ease-in-out
							ml-5 
							pt-2 
							pb-2 
							pl-5 
							pr-5
							bg-orange-50 
							font-bold 
							text-yellow-700 
							rounded-2xl
							hover:bg-orange-100
							hover:text-yellow-800
							hover:cursor-pointer
						">Save</button>
					</div>
				</div>


			</form>
		</>
	)

}

export default UpdateEmail;