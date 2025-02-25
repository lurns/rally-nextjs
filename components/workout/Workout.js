import { useContext, useEffect, useState } from "react";
import { useAuth } from "../../store/auth-context";
import { formatDateMDY } from "../../lib/formatDate";
import { WorkoutContext } from "../../store/workout-context";
import 'material-icons/iconfont/material-icons.css';
import Modal from "../ui/Modal";
import EditWorkout from "./EditWorkout";
import DeleteWorkout from "./DeleteWorkout";
import AddNewWorkout from "../dashboard/AddNewWorkout";

const Workout = () => {
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState({})
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const { auth, user, setUser } = useAuth();
  const { workouts, setWorkouts } = useContext(WorkoutContext);

	useEffect(() => {
		if (localStorage.getItem('rally_storage') !== '') {
			setUser(JSON.parse(localStorage.getItem('rally_storage')));
		}
	}, [auth, setUser]);

  const addWorkout = () => {
    setModalType('ADD');
    setModalOpen(true);
  }

  const editWorkout = (workout) => {
    setSelectedWorkout(workout);
    setModalType('EDIT');
    setModalOpen(true);
  }

  const deleteWorkout = (workout) => {
    setSelectedWorkout(workout);
    setModalType('DELETE');
    setModalOpen(true);
  }

  const closeModal = () => {
    setModalType('');
    setModalOpen(false);
    setSelectedWorkout({});
  }

  return (
    <div className="flex h-screen bg-slate-700">
      <div className="flex mx-auto bg-slate-200 w-3/4 p-3">
        <div className="m-2">
        <div className="flex justify-between items-center">
          <h3 className="font-black text-4xl text-yellow-900 p-2">
            Your Workouts
          </h3>
          <button id="newWorkoutButton"
            onClick={() => addWorkout()} 
            type="button" 
            className="
                bg-green-500 
                transition 
                ease-in-out 
                delay-150 
                hover:bg-green-900 
                hover:cursor-pointer
                font-bold 
                text-white 
                w-11
                h-11
                rounded-full
                shadow-sm
            "
          >
            +
          </button>
        </div>
          {modalOpen && (<>
            <div 
              id="modalBackdrop"
              className="fixed top-0 left-0 w-full h-full bg-slate-800/75 backdrop-blur-xs"
              onClick={closeModal}
            ></div>
            <Modal>
              { modalType === 'EDIT' && <EditWorkout workout={selectedWorkout} closeModal={closeModal} /> }
              { modalType === 'DELETE' && <DeleteWorkout workout={selectedWorkout} closeModal={closeModal} /> }
              { modalType === 'ADD' && <AddNewWorkout closeModal={closeModal} /> }
            </Modal>
          </>)}
          <table className="w-full table-fixed mx-auto mt-5">
            <thead>
              <tr className="bg-slate-400 border-b-4 border-orange-200">
                <th className="p-2 text-white rounded-tl-lg">Workout type</th>
                <th className="p-2 text-white">Duration</th>
                <th className="p-2 text-white">Date</th>
                <th className="p-2 text-white">Edit</th>
                <th className="p-2 text-white rounded-tr-lg">Delete</th>
              </tr>
            </thead>
            <tbody>
            { workouts.map((workout, index) => {
                return(
                  <tr key={index} className="bg-white border-b-2 border-dotted border-orange-200">
                    <td className="p-2 pl-5">{workout.workout.workout_type}</td>
                    <td className="p-2 text-center">{workout.workout.duration}m</td>
                    <td className="p-2 text-center">{formatDateMDY(workout.workout.date)}</td>
                    <td className="p-2 text-center text-amber-500">
                      <span 
                        onClick={() => editWorkout(workout)} 
                        className="
                          transition 
                          duration-200 
                          ease-in-out 
                          hover:text-amber-900 
                          hover:cursor-pointer 
                          material-icons
                        ">edit</span>
                    </td>
                    <td className="p-2 text-center text-red-500">
                      <span 
                        onClick={() => deleteWorkout(workout)} 
                        className="
                          transition 
                          duration-200 
                          ease-in-out 
                          hover:text-red-900 
                          hover:cursor-pointer 
                          material-icons
                        ">delete</span>
                    </td>
                  </tr>)
            }) }
            </tbody>
          </table>
        </div>
        {!workouts && <p>No workouts...</p>}
      </div>
    </div>
  )
}

export default Workout;