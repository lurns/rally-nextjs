import AddNewWorkout from "./AddNewWorkout";
import AddNewMessage from "./AddNewMessage";
import Status from "./Status";
import SingleWorkout from "./SingleWorkout";
import WeeklyGoal from "./WeeklyGoal";

const DashHome = () => {
  return (
    <div className="bg-slate-700 pt-5 pb-5">
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
  );
};

export default DashHome;
