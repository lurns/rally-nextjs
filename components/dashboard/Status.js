import { useContext, useEffect, useState } from "react";
import { useAuth } from "../../store/auth-context";
import UserPic from "../ui/UserPic";
import MessageBubble from "../ui/MessageBubble";
import UploadNewPic from "../ui/UploadNewPic";
import { WorkoutContext } from "../../store/workout-context";
import { DateTime } from "luxon";
import { server } from "../../lib/config";
import ErrorMessage from "../ui/ErrorMessage";

const timePassed = (lastWorkout) => {
	const currentDate = DateTime.fromJSDate(new Date());
	const lastWorkoutDate = DateTime.fromISO(lastWorkout.date);
	const timePassed = currentDate.diff(lastWorkoutDate, ["hours"])
	return timePassed.values.hours;
}

const fetchMessage = async (messageType) => {
	try {
		const msg = { message_type: messageType }
		const response = await fetch(`${server}/api/message`, {
			method: 'POST',
			body: JSON.stringify(msg),
			headers: {
				'Content-Type': 'application/json'
			}
		});

		return response.json();

	} catch (e) {
		console.log('error ', e);
	}
}

const Status = () => {
	const { auth, user, setUser } = useAuth();
	const { workouts } = useContext(WorkoutContext);
	const [message, setMessage] = useState('');
	const [error, setError] = useState('');

	useEffect(() => {
		if (localStorage.getItem('rally_storage') !== '') {
			setUser(JSON.parse(localStorage.getItem('rally_storage')));
		}
	}, [auth, setUser]);

	useEffect(() => {
		if (workouts && workouts[0]) {
			const hours = timePassed(workouts[0].workout);
			let messageType = '';

			// determine message
			if (hours < 48) {
				// on track
				messageType = 'ON_TRACK';
			} else if (hours > 48 && hours < 72) {
				// motivational
				messageType = 'MOTIVATIONAL';
			} else if (hours > 72 && hours < 96) {
				// do better
				messageType = 'DO_BETTER';
			} else {
				// do better-er
				messageType = 'DO_BETTER_ER';
			}

			// get message, set it
			fetchMessage(messageType)
				.then(res => {
					setMessage(res)
			}).catch(e => {
				setError('Error finding messages.')
			});
		}

	}, [workouts])

	return (
		<div>
			<h3 className="font-black text-4xl text-yellow-500 bg-yellow-900 w-fit p-2">
				Hey, { user?.user?.nickname }!
			</h3>
			{ error && <ErrorMessage message={error} />}
			<MessageBubble message={message?.message ?? ''} />
			<UserPic />
			<UploadNewPic />
		</div>
	)
}

export default Status;