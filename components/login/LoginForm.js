import { useRef } from "react";
import Link from "next/dist/client/link";
import ErrorMessage from '../../components/ui/ErrorMessage';

const LoginForm = (props) => {
    const emailRef = useRef();
    const passRef = useRef();

    const submitHandler = (event) => {
        event.preventDefault();

        const userData = {
            email: emailRef.current.value,
            password: passRef.current.value,
        }

        props.onLogin(userData)
    }

    return (
        <>
            <h2 className="text-left font-black text-6xl text-yellow-200">
                Let&apos;s log those workouts!
            </h2>
            <h3 className="mt-3 text-left font-medium italic text-3xl text-slate-100">
                Or else.
            </h3>
            {props.error ? <ErrorMessage message="User not found. Sign up?" /> : ''}
            <form id="rallyLogin" className="mt-10" onSubmit={submitHandler}>
                <div className="flex flex-col mb-3">
                <label 
                        htmlFor="email"
                        className="text-left text-white pb-1"
                    >Email
                    </label>
                    <input 
                        type="text"
                        name="rallyEmail"
                        id="rallyEmail"
                        className="border-1 border-slate-300 bg-white rounded-lg p-1"
                        ref={emailRef}
                        required
                    />
                </div>
                <div className="flex flex-col mb-3">
                    <label 
                        htmlFor="password"
                        className="text-left text-white pb-1"
                    >Password
                    </label>
                    <input
                        type="password"
                        name="rallyPass"
                        id="rallyPass"
                        className="border-1 border-slate-300 bg-white rounded-lg p-1"
                        ref={passRef}
                        required
                    />
                </div>
                <div className="flex flex-col mb-3">
                    <button className="
                        transition 
                        duration-200 
                        ease-in-out 
                        min-w-full 
                        mt-5 
                        p-4 
                        bg-white 
                        font-bold 
                        text-purple-700 
                        rounded-2xl 
                        shadow-lg
                        hover:bg-purple-400
                        hover:text-white
                        hover:cursor-pointer
                    ">Log in</button>
                </div>
                <div>
                    <p className="italic text-sm text-yellow-200">
                        Need an account?&nbsp;
                        <Link href="/signup">
                            <span className="underline cursor-pointer">
                                Sign up.        
                            </span>
                        </Link>
                    </p>
                </div>

            </form>
        </>
    )
}

export default LoginForm;