import { createContext, useContext } from "react";

const AuthContext = createContext();

export const getUser = async() => {
	try {
		const response = await fetch('api/auth', {
			method: 'GET',
		});
		const user = await response.json();

		if (user) {
			return { status: 'SIGNED_IN', user: user };
		} else {
			return { status: 'SIGNED_OUT', user: null };
		}
	} catch(e) {
		return { status: 'SIGNED_OUT', user: null };
	}

}

export const AuthProvider = (props) => {
	const auth = props.myAuth || {status: 'SIGNED_OUT', user: null};

	return <AuthContext.Provider value={{ auth }}>{props.children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext);
export const AuthConsumer = AuthContext.Consumer;

export default AuthContext;