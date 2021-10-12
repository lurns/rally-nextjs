import router from "next/router";
import { useRef } from "react";

const Signup = (props) => {
    const nicknameRef = useRef();
    const emailRef = useRef();
    const passRef = useRef();
    const confirmPassRef = useRef();

    const submitHandler = (event) => {
        event.preventDefault();

        const userData = {
            nickname: nicknameRef.current.value,
            email: emailRef.current.value,
            password: passRef.current.value,
            confirmPassword: confirmPassRef.current.value
        }

        props.onNewUser(userData)
    }


    return (
        <div className="h-screen bg-blue-200 p-10">
            <div className="container mx-auto max-w-xl bg-white self-center p-10 rounded-2xl shadow-lg">
            
            <h2 className="text-left font-black text-6xl text-purple-500">
                Sign up
            </h2>
            <h3 className="mt-3 text-left font-medium italic text-3xl text-gray-300">
                It&apos;s gonna be great!
            </h3>
            <form id="rallySignup" className="mt-10" onSubmit={submitHandler}>
            <div className="flex flex-col mb-3">
                <label 
                        htmlFor="rallyNick"
                        className="text-left text-gray-500"
                    >Nickname
                    </label>
                    <input 
                        type="text"
                        name="rallyNick"
                        id="rallyNick"
                        className="border-gray-300"
                        ref={nicknameRef}
                        required
                    />
                </div>
                <div className="flex flex-col mb-3">
                <label 
                        htmlFor="rallyEmail"
                        className="text-left text-gray-500"
                    >Email
                    </label>
                    <input 
                        type="email"
                        name="rallyEmail"
                        id="rallyEmail"
                        className="border-gray-300"
                        ref={emailRef}
                        required
                    />
                </div>
                <div className="flex flex-col mb-3">
                    <label 
                        htmlFor="rallyPass"
                        className="text-left text-gray-500"
                    >Password
                    </label>
                    <input
                        type="password"
                        name="rallyPass"
                        id="rallyPass"
                        className="border-gray-300"
                        ref={passRef}
                        required
                    />
                </div>
                <div className="flex flex-col mb-3">
                    <label 
                        htmlFor="confirmRallyPass"
                        className="text-left text-gray-500"
                    >Confirm Password
                    </label>
                    <input
                        type="password"
                        name="confirmRallyPass"
                        id="confirmRallyPass"
                        className="border-gray-300"
                        ref={confirmPassRef}
                        required
                    />
                </div>
                <div className="flex flex-col mb-3">
                    <button type="submit" className="min-w-full mt-5 p-4 bg-purple-500 font-bold text-yellow-200 rounded-2xl shadow-lg">Sign up</button>
                </div>
                <div>
                    <p className="italic text-sm text-purple-400">Already have an account? Log in.</p>
                </div>

            </form>
            </div>
        </div>
    )
}

export default Signup;