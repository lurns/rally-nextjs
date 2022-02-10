import LoginForm from '../../components/login/LoginForm';
import { useRouter } from "next/router";

const Home = () => {
    // handle sending data to api/signup
    const router = useRouter();

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
        router.push('/dash');
    }
    return (
        <div className="flex h-screen bg-white">
            <div className="flex mx-auto bg-purple-500 self-center p-10 rounded-2xl shadow-lg">
                <div className="flex-1">
                    Image here
                </div>
                <div className="flex-1">
                    <LoginForm onLogin={loginHandler} />
                </div>
            </div>
        </div>

    )
}



export default Home;