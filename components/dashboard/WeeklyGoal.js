import { useContext, useEffect, useState } from "react";
import { currentWeek } from "../../lib/formatDate";
import { WorkoutContext } from "../../store/workout-context";

const workoutsOfTheWeek = (workouts) => {
	// get the week
	const today = new Date();
	const weekRange = currentWeek(today);

	// filter within date range
	const results = workouts?.filter((workout) => {
		var workoutDate = new Date(workout.workout.date);
		return workoutDate >= weekRange.begin && workoutDate <= weekRange.end
	});

	return results;
}

const WeeklyGoal = () => {
	const { workouts } = useContext(WorkoutContext);
	const [weekWorkouts, setWeekWorkouts] = useState([]);
	const [goalProgress, setGoalProgress] = useState();
	const goal = 3; // tbd: users can have their own goal

	useEffect(() => {
		setWeekWorkouts(workoutsOfTheWeek(workouts))
		setGoalProgress(weekWorkouts?.length);

		// style goal marker for completed workouts
		for (var i = 1; i <= weekWorkouts?.length && i <= goal; i++) {
			var goalDiv = document.getElementById('goal' + i);
			goalDiv.classList.remove('bg-slate-500');
			goalDiv.classList.add('bg-green-300')
		}

	}, [workouts, weekWorkouts?.length]);

	return (
		<div className="mx-auto bg-slate-700 self-center mt-5 mr-5 p-5 rounded-2xl shadow-lg">
			<h4 className="text-left font-black text-2xl text-white mb-4">
				Weekly goal
			</h4>
			<div className="flex justify-evenly">
				<div id="goal1" className="bg-slate-500 rounded-2xl w-1/3 h-5 mr-2"></div>
				<div id="goal2" className="bg-slate-500 rounded-2xl w-1/3 h-5 mr-2"></div>
				<div id="goal3" className="bg-slate-500 rounded-2xl w-1/3 h-5"></div>
			</div>
			<h4 className="text-center font-bold text-2xl text-white mt-4">
				{goalProgress} / {goal} completed
			</h4>
		</div>

	)
}

export default WeeklyGoal;