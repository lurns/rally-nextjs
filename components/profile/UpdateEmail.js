import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../store/auth-context";
import ErrorMessage from "../ui/ErrorMessage";
import SuccessMessage from "../ui/SuccessMessage";

const UpdateEmail = () => {
	const { auth, user, setUser } = useAuth();
	const emailRef = useRef();

	const [error, setError] = useState(false);
	const [success, setSuccess] = useState(false);

	const submitHandler = async (e) => {
		e.preventDefault();

		const response = await fetch('/api/update-email', {
			method: 'POST',
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
			setSuccess(true);
		} else {
			setError(true);
		}

	}

	return (
		<>
			{ error && <ErrorMessage message="Error updating email." />}
			{ success && <SuccessMessage message="Email updated." /> }
			<form id="updateEmail" className="mt-5" onSubmit={submitHandler}>
				<div className="flex flex-nowrap">
					<div className="w-full">
						<label
							htmlFor="email"
							className="flex text-left text-slate-500"	
						>
								New Email
						</label>
						<input 
							type="email" 
							id="email"
							name="email"
							className="border-slate-300 w-full"
							ref={emailRef}
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

export default UpdateEmail;