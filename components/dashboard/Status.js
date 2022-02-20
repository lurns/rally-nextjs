import { useEffect } from "react";
import { useAuth } from "../../store/auth-context";
import UserPic from "../ui/UserPic";
import MessageBubble from "../ui/MessageBubble";
import UploadNewPic from "../ui/UploadNewPic";

const Status = () => {
	const { auth, user, setUser } = useAuth();
	
	// TODO: logic for determining what message to deliver

	useEffect(() => {
		if(auth.status === 'SIGNED_OUT' && localStorage.getItem('rally_storage') !== '') {
			setUser(JSON.parse(localStorage.getItem('rally_storage')));
		}
	}, [auth]);

	return (
		<div>
			<h3 className="font-black text-4xl text-yellow-500 bg-yellow-900 w-fit p-2">
				Hey, { auth?.user?.user?.nickname || user?.user?.nickname }!
			</h3>
			<MessageBubble message="Test message in heah" />
			<UserPic />
			<UploadNewPic />
		<p>block to show status</p>
		</div>
	)
}

export default Status;