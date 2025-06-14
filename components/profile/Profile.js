import { useEffect } from "react";
import { useAuth } from "../../store/auth-context";
import UploadNewPic from "../ui/UploadNewPic";
import UserPic from "../ui/UserPic";
import UpdateEmail from "./UpdateEmail";
import UpdateNickname from "./UpdateNickname";
import UpdatePassword from "./UpdatePassword";

const Profile = () => {
    const { auth, user, setUser } = useAuth();

	useEffect(() => {
		if (localStorage.getItem('rally_storage') !== '') {
			setUser(JSON.parse(localStorage.getItem('rally_storage')));
		}
	}, [auth, setUser]);

    return (
      <div className="flex bg-slate-700">
        <div className="flex mx-auto bg-slate-200 w-3/4 p-3">
          <div className="m-2">
						<h3 className="font-black text-4xl text-yellow-500 bg-yellow-900 w-fit p-2">
							Update Profile Picture
						</h3>
						<UserPic />
						<UploadNewPic />
          </div>
					<div className="m-2 grow">
						<h3 className="font-black text-4xl text-yellow-500 bg-yellow-900 w-fit p-2">
							Update Nickname
						</h3>
						<UpdateNickname />
						<hr className="mt-5 mb-5 border-dotted border-slate-800" />
						<h3 className="font-black text-4xl text-yellow-500 bg-yellow-900 w-fit p-2">
							Update Email
						</h3>
						<UpdateEmail />
						<hr className="mt-5 mb-5 border-dotted border-slate-800" />
						<h3 className="font-black text-4xl text-yellow-500 bg-yellow-900 w-fit p-2">
							Update Password
						</h3>
						<UpdatePassword />
					</div>
				</div>
      </div>
    )
}

export default Profile;