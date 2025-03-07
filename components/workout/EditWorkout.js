import { useContext, useRef, useState, useEffect } from "react";
import { useAuth } from "../../store/auth-context";
import { WorkoutContext } from "../../store/workout-context";
import { formatDateYYYYMMDD, formatDbDate, formatTimeHHMM } from "../../lib/formatDate";
import MessageBanner from "../ui/MessageBanner";
import { ERROR_MESSAGE } from "../../constants/messageBannerType";

const EditWorkout = (props) => {
  const [selectedDate, setSelectedDate] = useState('2000-01-01');
  const [selectedTime, setSelectedTime] = useState('00:00:00');
  const [workoutId, setWorkoutId] = useState('')
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { workouts, setWorkouts } = useContext(WorkoutContext);

  const { auth, user, setUser } = useAuth();
  const workoutTypeRef = useRef();
  const workoutDurationRef = useRef();

  useEffect(() => {
    workoutTypeRef.current.value = props.workout.workout.workout_type;
    workoutDurationRef.current.value = props.workout.workout.duration;

    setSelectedDate(formatDateYYYYMMDD(props.workout.workout.date));
    setSelectedTime(formatTimeHHMM(props.workout.workout.date));
    setWorkoutId(props.workout._id);

    displayWorkoutDuration();
  }, [])

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
  };

  const submitWorkoutHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    let workoutDate = formatDbDate(selectedDate, selectedTime)

    const workoutData = {
      workout_type: workoutTypeRef.current.value,
      duration: workoutDurationRef.current.value,
      date: workoutDate,
      user_id: user._id,
      id: workoutId
    }

    const response = await fetch('/api/update-workout', {
      method: 'PUT',
      body: JSON.stringify(workoutData),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    const data = await response.json();
  
    if (!data.error) {
      setLoading(false);

      // update workout context
      setWorkouts((prev) => {
        return prev
          .map((workout) => workout._id === data._id ? data : workout)
          .sort((a, b) => new Date(b.workout.date) - new Date(a.workout.date))
      });

      props.closeModal()
    } else {
      setLoading(false);
      setError(true);
    }
  }

  const displayWorkoutDuration = () => {
    const output = document.getElementById('rangeDuration');
    output.innerHTML = workoutDurationRef.current.value > 1 ? workoutDurationRef.current.value + ' minutes' : workoutDurationRef.current.value + ' minute' 
  }

  return (
    <div>
      <h3 className="font-black text-3xl text-sky-900">
        Edit Workout
      </h3>
      {error && !loading ? <MessageBanner type={ERROR_MESSAGE} message="Error updating workout" /> : ''}
      <form id="editWorkoutForm" className="mt-5" onSubmit={submitWorkoutHandler}>
        <div className="flex flex-col mb-3">
          <label 
            htmlFor="workoutType"
            className="text-left text-slate-500 pb-2"
          >Workout Type
          </label>
          <input 
            type="text"
            name="workoutType"
            id="workoutType"
            className="form-input border-1 border-slate-300 bg-white rounded-lg p-2"
            ref={workoutTypeRef}
            required
          />
        </div>
        <div className="flex flex-col mb-3">
          <label 
            htmlFor="workoutDuration"
            className="text-slate-500 pb-2"
          >Duration
          </label>
          <div>
            <input
              type="range"
              className="
                form-range 
                appearance-none 
                w-full 
                h-1 
                p-0
                mt-4
                mb-2
                border-3 
                border-slate-400 
                rounded-lg
                accent-(--color-slate-600)
              "
              id="workoutDuration"
              name="workoutDuration"
              ref={workoutDurationRef}
              onChange={displayWorkoutDuration}
              min="1"
              max="90"
              defaultValue="1"
              required
            />
            <output id="rangeDuration" className="font-black text-1xl pt-5 text-slate-600">
              
            </output>
          </div>
        </div>
        <div className="flex flex-col mb-3 pt-2">
          <div className="flex flex-row">
            <div className="pr-4 border-r-2 border-slate-200">
              <label 
                htmlFor="workoutDate"
                className="block text-slate-500 pb-2"
              >Date
              </label>
              <input
                type="date"
                className="
                  form-date 
                  w-full 
                "
                id="workoutDate"
                name="workoutDate"
                max={formatDateYYYYMMDD(new Date())}
                value={selectedDate} 
                onChange={handleDateChange} 
                required
              />
            </div>
            <div className="pl-4">
              <label 
                htmlFor="workoutTime"
                className="block text-slate-500 pb-2"
              >Time
              </label>
              <input
                type="time"
                className="
                  form-time 
                  w-full
                "
                id="workoutTime"
                name="workoutTime"
                value={selectedTime} 
                onChange={handleTimeChange} 
                required
              />
            </div>
          </div>
        </div>
          
        <div className="flex flex-col mb-3">
          <button id="submitWorkoutButton"
            type="submit" 
            className="
              min-w-full 
              mt-5 
              p-4 
              bg-sky-900 
              transition 
              ease-in-out 
              delay-150 
              hover:bg-blue-500 
              font-bold 
              text-white 
              rounded-2xl 
              shadow-lg
              disabled:bg-slate-400
            "
            disabled={loading ? true : false}
          >
            Edit Workout
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditWorkout;