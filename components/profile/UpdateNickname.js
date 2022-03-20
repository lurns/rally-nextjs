import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../store/auth-context";
import ErrorMessage from "../ui/ErrorMessage";
import SuccessMessage from "../ui/SuccessMessage";

const UpdateNickname = () => {
	const { auth, user, setUser } = useAuth();
	const nicknameRef = useRef();

	const [error, setError] = useState(false);
	const [success, setSuccess] = useState(false);

	const submitHandler = async (e) => {
		e.preventDefault();

		const response = await fetch('/api/update-nickname', {
			method: 'POST',
			body: JSON.stringify({nickname_input: nicknameRef.current.value}),
			headers: {
				'Content-Type': 'application/json'
			}
		});

		const data = await response.json();

		if (!data.error) {
			// update user
			let updateUser = user;
			updateUser.user.nickname = data.success;

			setUser({...updateUser});

			// clear input
			document.getElementById('nickname').value = '';

			// give success msg
			setSuccess(true);
		} else {
			setError(true);
		}

	}

	return (
		<>
			{ error && <ErrorMessage message="Error updating nickname." />}
			{ success && <SuccessMessage message="Nickname updated." /> }
			<form id="updateNickname" className="mt-5" onSubmit={submitHandler}>
				<div className="flex flex-nowrap">
					<div className="w-full">
						<label
							htmlFor="nickname"
							className="flex text-left text-slate-500"	
						>
								New Nickname
						</label>
						<input 
							type="text" 
							id="nickname"
							name="nickname"
							className="border-slate-300 w-full"
							ref={nicknameRef}
						/>
					</div>
					<div className="flex-none self-end">
						<button className="ml-5 pt-2 pb-2 pl-5 pr-5 bg-yellow-100 font-bold text-yellow-700 rounded-2xl">Save</button>
					</div>
				</div>


			</form>
		</>
	)

}

export default UpdateNickname;