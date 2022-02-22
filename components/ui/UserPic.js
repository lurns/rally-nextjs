import Image from 'next/image'
import { useEffect, useState } from 'react';
import { useAuth } from '../../store/auth-context';

const DEFAULT_URL = 'https://res.cloudinary.com/dgnsgqoi9/image/upload/v1645384204/rally/Rally_default_f15otb.png'

export const UserPic = () => {
  	const {auth, user, setUser} = useAuth();
	const [picURL, setPicURL] = useState(DEFAULT_URL)

	// BUG: this is still rendering wonky/infinite loops
	useEffect(() => {
		if (user) {
			setPicURL(user.user.pic_url)
		}
	})

	return (
		<div className="mx-auto relative w-1/2 self-center mt-5 aspect-square">
			<Image alt="profile pic" layout="fill" className="object-cover rounded-full" src={picURL} />
		</div>
	)
}

export default UserPic;