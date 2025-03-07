import { useContext, useState } from "react";
import { formatDateMDY } from "../../lib/formatDate";
import { WorkoutContext } from "../../store/workout-context";
import MessageBanner from "../ui/MessageBanner";
import { ERROR_MESSAGE } from "../../constants/messageBannerType";

const SingleWorkout = () => {
  const [error, setError] = useState(false);
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const { workouts } = useContext(WorkoutContext);

  return (
    <div>
      {/* { loading && 
				<div className="mx-auto bg-slate-500 self-center mt-5 mr-5 p-5 rounded-2xl shadow-lg">
					<h4 className="text-center font-black text-2xl text-white mb-2">
						loading last workout...
					</h4>
				</div>
			} */}
      {error && !loading && <MessageBanner type={ERROR_MESSAGE} message="Error finding last workout" />}
      {workouts[0] && (
        <div className="mx-auto bg-slate-500 self-center mt-5 mr-5 p-5 rounded-2xl shadow-lg">
          <h4 className="text-left font-black text-2xl text-white mb-2">Last workout</h4>
          <p className="text-white">
            <strong className="text-orange-200">{workouts[0]?.workout.workout_type}</strong>&nbsp;
            on {formatDateMDY(workouts[0]?.workout.date)}
          </p>
        </div>
      )}
      {!workouts && <></>}
    </div>
  );
};

export default SingleWorkout;
