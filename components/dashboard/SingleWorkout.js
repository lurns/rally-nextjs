import { data } from "autoprefixer";
import { useEffect, useState } from "react";
import { useAuth } from "../../store/auth-context";
import ErrorMessage from "../ui/ErrorMessage";

const SingleWorkout = () => {
	const [error, setError] = useState(false);
	const [data, setData] = useState();

	useEffect(() => {
		const getLastWorkout = async () => {
			const response = await fetch('/api/workouts', {
				method: 'GET'
			});

			const res = await response.json();

			if (res.error) {
				setError(true);
			} else {
				// replace default with workouts
				setData(res[0]);
				console.log(res[0])
			}
		}
		
		getLastWorkout();
	}, []);

	return (
		<div>
			{ error && <ErrorMessage message="Error finding last workout" /> }
			{ !error && data?.workout && <>
				<p>found it!</p>
				<p>{data.workout.workout_type}</p>
			</> }
			{ !data && 
				<>
				<p>nothing to see here</p>
				</>
			}
		</div>
	)
}

export default SingleWorkout;