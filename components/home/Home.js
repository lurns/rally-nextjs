import LoginForm from '../../components/login/LoginForm';
import { useRouter } from "next/router";
import {useState} from 'react';
import { useAuth } from "../../store/auth-context";

const Home = () => {
    // handle sending data to api/login
    const router = useRouter();
    const [error, setError] = useState(false);
    const { auth } = useAuth();

    const loginHandler = async (userData) => {
        const response = await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
            'Content-Type': 'application/json'
        }
        });

        const data = await response.json();
        console.log(data);

        if (!data.error) {
            router.push('/dash');  
        } else {
            setError(true);
        }

    }
    return (
        <div className="flex h-screen bg-white">
            <div className="flex mx-auto bg-purple-500 self-center p-10 rounded-2xl shadow-lg">
                <div className="flex-1">
                    Image here
                </div>
                <div className="flex-1">
                    <LoginForm onLogin={loginHandler} error={error}/>
                </div>
            </div>
        </div>

    )
}



export default Home;