import { createContext, useContext } from "react";

const AuthContext = createContext();

export const getUser = async(ctx) => {
	console.log('ctx')
	console.log(ctx)
	try {
		const response = await fetch('api/auth', {
			method: 'GET',
		});
		const user = await response.json();
		console.log('got a user?')
		console.log(user);

		if (user) {
			console.log('found')
			return { status: 'SIGNED_IN', user: user };
		} else {
			console.log('uh?')
			return { status: 'SIGNED_OUT', user: null };
		}
	} catch(e) {
		console.log('err')
		return { status: 'SIGNED_OUT', user: null };
	}

}

export const AuthProvider = (props) => {
	const auth = props.myAuth || {status: 'SIGNED_OUT', user: null};

	return <AuthContext.Provider value={{ auth }} {...props} />
}

export const useAuth = () => useContext(AuthContext);
export const AuthConsumer = AuthContext.Consumer;

export default AuthContext;