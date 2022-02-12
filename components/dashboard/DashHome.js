import AddNewWorkout from "./AddNewWorkout";
import AddNewMessage from "./AddNewMessage";
import Status from "./Status";

const DashHome = () => {
    return (
        <div className="flex h-screen bg-slate-700">
            <div className="flex mx-auto bg-slate-200 self-center p-10 rounded-2xl shadow-lg">
                <div className="flex-1">
                    <Status />
                    <p>other info to go here (last workout, 
                        whether they&apos;re reaching their weekly target
                    </p>
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