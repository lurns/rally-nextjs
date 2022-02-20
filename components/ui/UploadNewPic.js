import { useEffect, useState } from "react";
import ErrorMessage from "./ErrorMessage";
import SuccessMessage from "./SuccessMessage";
import { useRouter } from "next/router";
import { useAuth } from "../../store/auth-context";

export const UploadNewPic = (props) => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const [success, setSuccess] = useState(false);
	const router = useRouter();
	const { auth, user, setUser } = useAuth();
	var updatedUser = user;

	useEffect(() => {
		if (success) {
			setUser(JSON.parse(localStorage.getItem('rally_storage')));
		}
	}, [success])

	const uploadNewPicHandler = async (event) => {
        event.preventDefault();
		setLoading(true);
		setSuccess(false);
		setError(false);

		const file = document.getElementById('uploadNewPic').files[0];
		const unsignedUploadPreset = 'wg3a96lr';
		var url = '';
		var data = ''

		// TODO: error handling

		// send pic to cloudinary
		const sendToCloudinary = () => {
			var xhr = new XMLHttpRequest();
			var fd = new FormData();
			xhr.open('POST', `https://api.cloudinary.com/v1_1/dgnsgqoi9/image/upload`, true);
			xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
			xhr.onreadystatechange = function(e) {
				if (xhr.readyState == 4 && xhr.status == 200) {
					// File uploaded successfully
					var response = JSON.parse(xhr.responseText);
					url = response.secure_url;

					// save url to user in db
					data = sendToDb({pic_url: url});

					if (!data.error) {
						// update state
						updatedUser = {
							_id: user._id,
							user: {
								nickname: user.user.nickname,
								email: user.user.email,
								password: '',
								pic_url: url,
							}
						}
						// console.log('this is the new user')
						// console.log(updatedUser);
						localStorage.setItem('rally_storage', JSON.stringify(updatedUser));
			
						// clear fields, give success msg
						setLoading(false);
						document.getElementById('uploadNewPic').value = '';
						setSuccess(true);
						router.push('/dash');  
					} else {
						setLoading(false);
						setError(true);
					}
				}
			};
			fd.append('upload_preset', unsignedUploadPreset);
			fd.append('file', file);
			xhr.send(fd);	
		}
	
		const sendToDb = async (picData) => {
			console.log('sending ' + JSON.stringify(picData));

			const response = await fetch('/api/new-pic', {
				method: 'POST',
				body: JSON.stringify(picData),
				headers: {
					'Content-Type': 'application/json'
				}
			});
		
			data = await response.json();
			return data;
		}

		await sendToCloudinary();
		
    }

	return (
		<div className="align-content-center">
			{!loading && error ? <ErrorMessage message="Error uploading photo." /> : ''}
			{!loading && success ? <SuccessMessage message="Photo updated." /> : ''}
			<form id="uploadNewPicForm" className="mt-5" onSubmit={uploadNewPicHandler} encType="multipart/form-data" >
				<div className="flex flex-col mb-3">
				<input 
					type="file"
					className="
					block w-full text-sm text-slate-500 
					file:mr-4 file:py-2 file:px-4
					file:rounded-full file:border-0
					file:text-sm file:font-semibold
					file:bg-orange-50 file:text-orange-700 file:delay-150
					hover:file:bg-orange-100 file:transition file:ease-in-out"
					id="uploadNewPic"
					name="uploadNewPic"
				/>
				</div>
				<div className="flex flex-col mb-3">
				<button id="submitNewPicButton"
					type="submit" 
					className="
						mx-auto
						text-sm
						w-1/2 
						mt-2 
						p-2 
						bg-orange-900 
						transition 
						ease-in-out 
						delay-150 
						hover:bg-orange-500 
						font-bold 
						text-white 
						rounded-2xl 
						shadow-lg
						disabled:bg-slate-400
					"
					disabled={loading ? true : false}
				>
					Change Profile Picture
				</button>
				</div>
			</form>
		</div>
	)
}

export default UploadNewPic;