
const LoginForm = () => {
    return (
        <>
            <h2 className="text-left font-black text-6xl text-yellow-200">
                Let&apos;s log those workouts!
            </h2>
            <h3 className="mt-3 text-left font-medium italic text-3xl text-gray-100">
                Or else.
            </h3>
            <form id="rallyLogin" className="mt-10">
                <div className="flex flex-col mb-3">
                <label 
                        htmlFor="email"
                        className="text-left text-white"
                    >Email
                    </label>
                    <input 
                        type="text"
                        name="rallyEmail"
                        id="rallyEmail"
                        className="border-gray-300"
                        required
                    />
                </div>
                <div className="flex flex-col mb-3">
                    <label 
                        htmlFor="password"
                        className="text-left text-white"
                    >Password
                    </label>
                    <input
                        type="password"
                        name="rallyPass"
                        id="rallyPass"
                        className="border-gray-300"
                        required
                    />
                </div>
                <div className="flex flex-col mb-3">
                    <button className="min-w-full mt-5 p-4 bg-white font-bold text-purple-700 rounded-2xl shadow-lg">Log in</button>
                </div>
                <div>
                    <p className="italic text-sm text-yellow-200">Need an account? Sign up.</p>
                </div>

            </form>
        </>
    )
}

export default LoginForm;