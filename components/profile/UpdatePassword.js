import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../store/auth-context";
import ErrorMessage from "../ui/ErrorMessage";
import SuccessMessage from "../ui/SuccessMessage";

const UpdatePassword = () => {
	const { auth, user, setUser } = useAuth();
	const oldPassRef = useRef();
  	const newPassRef = useRef();
	const confirmNewPassRef = useRef();

	const [error, setError] = useState(false);
	const [success, setSuccess] = useState(false);

	const submitHandler = async (e) => {
		e.preventDefault();

		// TODO: validate
		const passData = {
			oldPass: oldPassRef.current.value,
			newPass: newPassRef.current.value,
			confirmNewPass: confirmNewPassRef.current.value
		}

		const response = await fetch('/api/update-password', {
			method: 'POST',
			body: JSON.stringify(passData),
			headers: {
				'Content-Type': 'application/json'
			}
		});

		const data = await response.json();

		if (!data.error) {
			setSuccess(true);
		} else {
			setError(true);
		}

		// clear input
		document.getElementById('oldPass').value = '';
		document.getElementById('newPass').value = '';
		document.getElementById('confirmNewPass').value = '';

	}

	return (
		<>
			{ error && <ErrorMessage message="Error updating password." />}
			{ success && <SuccessMessage message="Password updated." /> }
			<form id="updatePassword" className="mt-5" onSubmit={submitHandler}>
				<div className="flex flex-col">
        			<div className="mb-3">
						<label
							htmlFor="oldPass"
							className="flex text-left text-slate-500"	
						>
								Current Password
						</label>
						<input 
							type="password" 
							id="oldPass"
							name="oldPass"
							className="border-slate-300 w-full"
							ref={oldPassRef}
						/>
					</div>
					<div className="mb-3">
						<label
							htmlFor="newPass"
							className="flex text-left text-slate-500"	
						>
								New Password
						</label>
						<input 
							type="password" 
							id="newPass"
							name="newPass"
							className="border-slate-300 w-full"
							ref={newPassRef}
						/>
					</div>
					<div className="mb-3">
						<label
							htmlFor="confirmNewPass"
							className="flex text-left text-slate-500"	
						>
								Confirm New Password
						</label>
						<input 
							type="password" 
							id="confirmNewPass"
							name="confirmNewPass"
							className="border-slate-300 w-full"
							ref={confirmNewPassRef}
						/>
					</div>
					<div className="mb-3">
						<button className="w-full pt-2 pb-2 pl-5 pr-5 bg-yellow-100 font-bold text-yellow-700 rounded-2xl">Save</button>
					</div>
				</div>


			</form>
		</>
	)

}

export default UpdatePassword;