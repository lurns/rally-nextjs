import AddNewWorkout from "./AddNewWorkout";
import AddNewMessage from "./AddNewMessage";
import Status from "./Status";
import SingleWorkout from "./SingleWorkout";
import { useAuth } from "../../store/auth-context";
import { WorkoutContext } from "../../store/workout-context";
import { useContext } from "react";
import WeeklyGoal from "./WeeklyGoal";

const DashHome =  () => {
    const { auth } = useAuth();
    const { workouts } = useContext(WorkoutContext);

    return (
        <div className="flex h-screen bg-slate-700">
            <div className="flex mx-auto w-3/4 bg-slate-200 self-center p-10 rounded-2xl shadow-lg">
                <div className="flex-1">
                    <Status />
                    <SingleWorkout />
                    <WeeklyGoal />
                </div>
                <div className="flex-1">
                    <AddNewWorkout />
                    <hr className="mt-5 mb-5" />
                    <AddNewMessage />
                </div>
            </div>
        </div>
    )
}

export default DashHome;