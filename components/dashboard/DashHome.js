import AddNewWorkout from "./AddNewWorkout";
import AddNewMessage from "./AddNewMessage";
import Status from "./Status";
import SingleWorkout from "./SingleWorkout";
import { useAuth } from "../../store/auth-context";

const DashHome =  () => {
    const { auth } = useAuth();


    return (
        <div className="flex h-screen bg-slate-700">
            <div className="flex mx-auto bg-slate-200 self-center p-10 rounded-2xl shadow-lg">
                <div className="flex-1">
                    <Status />
                    <SingleWorkout />
                    <p>Goal component</p>
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