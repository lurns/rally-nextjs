import { useRef } from "react";
import classes from './DashHome.module.css';

const AddNewWorkout = () => {
    const workoutTypeRef = useRef();
    const workoutDurationRef = useRef();

    const submitWorkoutHandler = (event) => {
        event.preventDefault();

        const workoutData = {
            workout_type: workoutTypeRef.current.value,
            duration: workoutDurationRef.current.value,
        }

        props.onAddNewWorkout(workoutData)
    }

	const displayWorkoutDuration = () => {
		const output = document.getElementById('rangeDuration');
		output.innerHTML = workoutDurationRef.current.value > 1 ? workoutDurationRef.current.value + ' minutes' : workoutDurationRef.current.value + ' minute' 
	}

	return (
		<div className="">
			<h3 className="font-black text-3xl text-sky-900">
				Add New Workout
			</h3>
			<p>inputs needed: type of workout and duration (in min)</p>
			
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
						required
					/>
					<output id="rangeDuration" className="font-black text-1xl pt-5 text-sky-700">
						
					</output>
				</div>
			</div>

				
			<div className="flex flex-col mb-3">
				<button 
					type="submit" 
					className="min-w-full mt-5 p-4 bg-sky-900 font-bold text-white rounded-2xl shadow-lg"
				>
					Add New Workout
				</button>
			</div>

			</form>
		</div>
  )
}

export default AddNewWorkout;