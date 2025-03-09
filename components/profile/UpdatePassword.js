import { useRef, useState } from "react";
import MessageBanner from "../ui/MessageBanner";
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "../../constants/messageBannerType";

const UpdatePassword = () => {
	const oldPassRef = useRef();
	const newPassRef = useRef();
	const confirmNewPassRef = useRef();

	const [updateRespsonse, setUpdateResponse] = useState({});

	const submitHandler = async (e) => {
		e.preventDefault();

		const passData = {
			oldPass: oldPassRef.current.value,
			newPass: newPassRef.current.value,
			confirmNewPass: confirmNewPassRef.current.value
		}

		try {
			if (newPass !== confirmNewPass) throw new Error("Passwords do not match.");

			const response = await fetch('/api/update-password', {
				method: 'PUT',
				body: JSON.stringify(passData),
				headers: {
					'Content-Type': 'application/json'
				}
			});
	
			const data = await response.json();
	
			if (!data.error) {
				setUpdateResponse({ type: SUCCESS_MESSAGE, message: "Password updated." });
			} else {
				setUpdateResponse({ type: ERROR_MESSAGE, message: data.error });
			}
		} catch (e) {
			console.log(e)
			setUpdateResponse({ type: ERROR_MESSAGE, message: e.message ?? "Unable to update password." });
		} finally {
			// clear input
			document.getElementById('oldPass').value = '';
			document.getElementById('newPass').value = '';
			document.getElementById('confirmNewPass').value = '';
		}
	}

	return (
		<>
			{ Object.keys(updateRespsonse).length > 0 && 
				<MessageBanner type={updateRespsonse.type} message={updateRespsonse.message} />
			}
			<form id="updatePassword" className="mt-5" onSubmit={submitHandler}>
				<div className="flex flex-col">
        			<div className="mb-3">
						<label
							htmlFor="oldPass"
							className="flex text-left text-slate-500 pb-1"	
						>
								Current Password
						</label>
						<input 
							type="password" 
							id="oldPass"
							name="oldPass"
							className="form-input border-1 border-slate-300 bg-slate-100 rounded-lg p-2 w-full"
							ref={oldPassRef}
							required
						/>
					</div>
					<div className="mb-3">
						<label
							htmlFor="newPass"
							className="flex text-left text-slate-500 pb-1"	
						>
								New Password
						</label>
						<input 
							type="password" 
							id="newPass"
							name="newPass"
							className="form-input border-1 border-slate-300 bg-slate-100 rounded-lg p-2 w-full"
							ref={newPassRef}
							required
						/>
					</div>
					<div className="mb-3">
						<label
							htmlFor="confirmNewPass"
							className="flex text-left text-slate-500 pb-1"	
						>
								Confirm New Password
						</label>
						<input 
							type="password" 
							id="confirmNewPass"
							name="confirmNewPass"
							className="form-input border-1 border-slate-300 bg-slate-100 rounded-lg p-2 w-full"
							ref={confirmNewPassRef}
							required
						/>
					</div>
					<div className="mb-3">
						<button className="
							transition
							duration-200
							ease-in-out
							w-full 
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

export default UpdatePassword;