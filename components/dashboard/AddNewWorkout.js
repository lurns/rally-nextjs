import { useContext, useRef, useState } from "react";
import classes from './DashHome.module.css';
import { useAuth } from "../../store/auth-context";
import ErrorMessage from '../../components/ui/ErrorMessage';
import SuccessMessage from "../ui/SuccessMessage";
import { useRouter } from "next/router";
import { WorkoutContext } from "../../store/workout-context";

const AddNewWorkout = () => {
	const [error, setError] = useState(false);
	const [success, setSuccess] = useState(false);
	const [loading, setLoading] = useState(false);
	const { workouts, setWorkouts } = useContext(WorkoutContext);

	const { auth, user, setUser } = useAuth();
	const router = useRouter();
    const workoutTypeRef = useRef();
    const workoutDurationRef = useRef();

    const submitWorkoutHandler = async (event) => {
        event.preventDefault();
		setLoading(true);

		// TODO: error handling

        const workoutData = {
            workout_type: workoutTypeRef.current.value,
            duration: workoutDurationRef.current.value,
			user_id: user._id,
        }

		const response = await fetch('/api/new-workout', {
			method: 'POST',
			body: JSON.stringify(workoutData),
			headers: {
				'Content-Type': 'application/json'
			}
			});
	
			const data = await response.json();
	
			if (!data.error) {
				// clear fields, give success msg
				setLoading(false);
				document.getElementById('workoutType').value = '';
				document.getElementById('workoutDuration').value = 1;
				document.getElementById('rangeDuration').value = '';
				setSuccess(true);

				// update workouts, add newest to beginning
				setWorkouts((current) => [data, ...current]);

				router.push('/dash');  
			} else {
				setLoading(false);
				setError(true);
			}
    }

	const displayWorkoutDuration = () => {
		const output = document.getElementById('rangeDuration');
		output.innerHTML = workoutDurationRef.current.value > 1 ? workoutDurationRef.current.value + ' minutes' : workoutDurationRef.current.value + ' minute' 
	}

	return (
		<div className={classes}>
			<h3 className="font-black text-3xl text-sky-900">
				Add New Workout
			</h3>
			{error && !loading ? <ErrorMessage message="Error adding workout" /> : ''}
			{success && !loading ? <SuccessMessage message="Workout added!" /> : ''}
			<form id="addNewWorkoutForm" className="mt-5" onSubmit={submitWorkoutHandler}>
			<div className="flex flex-col mb-3">
				<label 
					htmlFor="workoutType"
					className="text-left text-slate-500"
				>Workout Type
				</label>
				<input 
					type="text"
					name="workoutType"
					id="workoutType"
					className="border-slate-300"
					ref={workoutTypeRef}
					required
				/>
			</div>
			<div className="flex flex-col mb-3">
				<label 
					htmlFor="workoutDuration"
					className="text-slate-500"
				>Duration
				</label>
				{/* TODO: snap to ranges, change the range slider color */}
				<div id={classes.rangeInput}>
					<input
						type="range"
						className="
							form-range 
							appearance-none 
							w-full 
							h-1 
							p-0
							mt-4
							mb-2
							focus:outline-none focus:ring-0 focus:shadow-none
						"
						id="workoutDuration"
						name="workoutDuration"
						ref={workoutDurationRef}
						onChange={displayWorkoutDuration}
						min="1"
						max="90"
						defaultValue="1"
						required
					/>
					<output id="rangeDuration" className="font-black text-1xl pt-5 text-sky-700">
						
					</output>
				</div>
			</div>

				
			<div className="flex flex-col mb-3">
				<button id="submitWorkoutButton"
					type="submit" 
					className="
						min-w-full 
						mt-5 
						p-4 
						bg-sky-900 
						transition 
						ease-in-out 
						delay-150 
						hover:bg-blue-500 
						font-bold 
						text-white 
						rounded-2xl 
						shadow-lg
						disabled:bg-slate-400
					"
					disabled={loading ? true : false}
				>
					Add New Workout
				</button>
			</div>

			</form>
		</div>
  )
}

export default AddNewWorkout;