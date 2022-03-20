import { createContext, useEffect, useState } from "react";
import { useAuth } from "./auth-context";
import { server } from "../lib/config";

export const WorkoutContext = createContext({});

export const getWorkouts = async () => {
	try {
		const response = await fetch(`${server}api/workouts`, {
			method: 'GET'
		})

		const res = await response.json();
		return res;

	} catch (e) {
		console.log('error ', e)
	}

}

export const WorkoutProvider = (props) => {
	const [workouts, setWorkouts] = useState([]);

	useEffect(() => {
		getWorkouts().then(res => {
			setWorkouts(res);
		})
	}, [setWorkouts]);

	return (
		<WorkoutContext.Provider value={{workouts, setWorkouts}}>
			{props.children}
		</WorkoutContext.Provider>
	)

}

