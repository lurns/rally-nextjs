import { useEffect, useState } from "react";
import { useAuth } from "../../store/auth-context";
import ErrorMessage from "../ui/ErrorMessage";
import { formatDateMDY } from "../../lib/formatDate";

const SingleWorkout = () => {
	const [error, setError] = useState(false);
	const [data, setData] = useState();
	const [loading, setLoading] = useState(false);

	// should potentially move this up a component so only
	// grabbing workout data once for this + goal component + message
	useEffect(() => {
		const getLastWorkout = async () => {
			setLoading(true);
			const response = await fetch('/api/workouts', {
				method: 'GET'
			});

			const res = await response.json();
			console.log(res)

			if (res.error) {
				setLoading(false);
				setError(true);
			} else {
				setLoading(false);
				setData(res[0]);
			}
		}
		
		getLastWorkout();
	}, []);

	return (
		<div>
			{ loading && 
				<div className="mx-auto bg-slate-500 self-center mt-5 mr-5 p-5 rounded-2xl shadow-lg">
					<h4 className="text-center font-black text-2xl text-white mb-2">
						loading last workout...
					</h4>
				</div>
			}
			{ error && !loading && <ErrorMessage message="Error finding last workout" /> }
			{ !error && !loading && data?.workout && 
				<div className="mx-auto bg-slate-500 self-center mt-5 mr-5 p-5 rounded-2xl shadow-lg">
					<h4 className="text-left font-black text-2xl text-white mb-2">
						Last workout
					</h4>
					<p className="text-white">
						<strong className="text-orange-200">{data.workout.workout_type}</strong>&nbsp;
						on {formatDateMDY(data.workout.date)}
					</p>
				</div>
			}
			{ !data && !loading &&
				<>
				</>
			}
		</div>
	)
}

export default SingleWorkout;