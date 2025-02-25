import { useRouter } from 'next/router';

import Signup from '../components/signup/Signup';

const SignupPage = () => {
    // handle sending data to api/signup
    const router = useRouter();

    const newUserHandler = async (newUserData) => {
        const response = await fetch('/api/signup', {
            method: 'POST',
            body: JSON.stringify(newUserData),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        router.push('/');
    }

    return (
        <Signup onNewUser={newUserHandler} />
    )
}

export default SignupPage;