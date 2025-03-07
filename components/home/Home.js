import LoginForm from '../../components/login/LoginForm';
import { useRouter } from "next/router";
import { useState, useContext } from 'react';
import Image from 'next/image';
import { WorkoutContext } from '../../store/workout-context';

const Home = () => {
    // handle sending data to api/login
    const router = useRouter();
    const [error, setError] = useState(false);
    const { getWorkouts } = useContext(WorkoutContext);

    const loginHandler = async (userData) => {
        const response = await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
            'Content-Type': 'application/json'
        }
        });

        const data = await response.json();

        if (!data.error) {
            router.push('/dash');
            getWorkouts();
        } else {
            setError(true);
        }

    }
    return (
        <div className="flex h-full bg-purple-200 pb-5 pt-5">
            <div className="md:flex sm:flex-wrap-reverse mx-auto bg-slate-600 self-center p-10 rounded-2xl shadow-lg">
                <div className="flex-1">
                    <Image alt="Motivate yourself!" width="500" height="500" src="https://res.cloudinary.com/dgnsgqoi9/image/upload/v1646167222/rally/Rally_copy_rx4xhm.png" />
                </div>
                <div className="flex-1">
                    <LoginForm onLogin={loginHandler} error={error}/>
                </div>
            </div>
        </div>
    )
}



export default Home;