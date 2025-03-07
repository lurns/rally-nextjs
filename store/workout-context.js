import { createContext, useEffect, useState } from "react";
import { useAuth } from "./auth-context";
import { server } from "../lib/config";

export const WorkoutContext = createContext({});

export const WorkoutProvider = (props) => {
  const [workouts, setWorkouts] = useState([]);

  const getWorkouts = async () => {
    try {
      const response = await fetch(`${server}api/workouts`);
      const data = await response.json();
      setWorkouts(data); // Store workouts in context
    } catch (error) {
      console.error("Error fetching workouts:", error);
    }
  };

  useEffect(() => {
    if (workouts.length === 0 && localStorage.getItem('rally_storage') === '') {
      getWorkouts();
    }
  }, []);

  return (
    <WorkoutContext.Provider value={{ workouts, setWorkouts, getWorkouts }}>
      {props.children}
    </WorkoutContext.Provider>
  );
};
