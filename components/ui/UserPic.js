import Image from 'next/image'
import { useEffect, useState } from 'react';
import { useAuth } from '../../store/auth-context';

const DEFAULT_URL = 'https://res.cloudinary.com/dgnsgqoi9/image/upload/v1645384204/rally/Rally_default_f15otb.png'

export const UserPic = (props) => {
  	const {auth, user, setUser} = useAuth();
	const [picURL, setPicURL] = useState(DEFAULT_URL)

	useEffect(() => {
		setPicURL(user?.user?.pic_url ? user.user.pic_url : DEFAULT_URL);

		if (typeof user === 'string') {
			var parse = JSON.parse(localStorage.getItem('rally_storage'));
			setPicURL(parse.user.pic_url);
		}
	}, [user])

	return (
		<div className="mx-auto relative w-1/2 self-center mt-5 aspect-square">
			<Image alt="profile pic" layout="fill" className="object-cover rounded-full" src={picURL} />
		</div>
	)
}

export default UserPic;