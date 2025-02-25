import { useContext, useState, useEffect } from "react";
import { useAuth } from "../../store/auth-context";
import ErrorMessage from '../../components/ui/ErrorMessage';
import { WorkoutContext } from "../../store/workout-context";
import { formatDateMDY } from "../../lib/formatDate";

const DeleteWorkout = (props) => {
  const [workoutId, setWorkoutId] = useState('')
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { workouts, setWorkouts } = useContext(WorkoutContext);

  const { auth, user, setUser } = useAuth();

  useEffect(() => {
    setWorkoutId(props.workout._id);
  }, [])

  const submitWorkoutHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    const response = await fetch('/api/delete-workout', {
      method: 'DELETE',
      body: JSON.stringify({ id: workoutId }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    const data = await response.json();
  
    if (!data.error) {
      setLoading(false);

      // rm from workout context
      setWorkouts((prev) => {
        return prev.filter((workout) => workout._id !== workoutId)
      });

      props.closeModal()
    } else {
      setLoading(false);
      setError(true);
    }
  }

  return (
    <div>
      <h3 className="font-black text-3xl text-red-900">
        Delete Workout
      </h3>
      {error && !loading ? <ErrorMessage message="Error deleting workout" /> : ''}
      <p className="text-center mt-5">
        Are you sure you want to delete <br/> 
        <strong>{props.workout.workout.workout_type}</strong>
        &nbsp;on <strong>{formatDateMDY(props.workout.workout.date)}</strong>
      </p>
      <form id="deleteWorkoutForm" className="mt-5" onSubmit={submitWorkoutHandler}>
        <div className="flex flex-col mb-3">
          <button id="submitWorkoutButton"
            type="submit" 
            className="
              min-w-full 
              mt-5 
              p-4 
              bg-red-500 
              transition 
              ease-in-out 
              delay-150 
              hover:bg-red-900 
              font-bold 
              text-white 
              rounded-2xl 
              shadow-lg
              disabled:bg-slate-400
            "
            disabled={loading ? true : false}
          >
            Delete it!
          </button>
        </div>
      </form>
    </div>
  )
}

export default DeleteWorkout;