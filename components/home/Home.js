import LoginForm from '../../components/login/LoginForm';

const Home = () => {
    return (
        <div className="flex h-screen bg-white">
            <div className="flex mx-auto bg-purple-500 self-center p-10 rounded-2xl shadow-lg">
                <div className="flex-1">
                    Image here
                </div>
                <div className="flex-1">
                    <LoginForm />
                </div>
            </div>
        </div>

    )
}



export default Home;