import { useRef } from "react";

const UpdateNickname = () => {
	const nicknameRef = useRef();

	const submitHandler = () => {
		console.log(nicknameRef)
	}

	return (
		<>
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