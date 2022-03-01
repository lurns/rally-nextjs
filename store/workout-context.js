import { createContext, useEffect, useState } from "react";
import { useAuth } from "./auth-context";
import { server } from "../lib/config";

export const WorkoutContext = createContext();

export const getWorkouts = async () => {
	try {
		if (typeof window !== 'undefined') {
			console.log(localStorage.getItem('rally_storage'))
			const response = await fetch(`${server}/api/workouts`, {
				method: 'GET'
			});

			const res = await response.json();
			return res;
		}
	} catch (e) {
		console.log('error ', e)
	}

}

export const WorkoutProvider = async (props) => {
	const [workouts, setWorkouts] = useState([]);

	useEffect(() => {
		setWorkouts(getWorkouts())
	}, []);

	return (
		<WorkoutContext.Provider value={workouts}>{props.children}</WorkoutContext.Provider>
	)

}

