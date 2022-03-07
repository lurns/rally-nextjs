import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { server } from "../lib/config";

const AuthContext = createContext();

export const getUser = async() => {
	try {
		// see if user in localstorage
		let user;

		if (typeof window !== 'undefined') {
			const response = await fetch(`${server}api/auth`, {
				method: 'GET',
			});

			user = await response.json();

			localStorage.setItem('rally_storage', JSON.stringify(user));
		}

		if (user) {
			return { status: 'SIGNED_IN', user: user };
		} else {
			return { status: 'SIGNED_OUT', user: null };
		}
	} catch (e) {
		return { status: 'SIGNED_OUT', user: null };
	}

}

export const AuthProvider = (props) => {
	const [user, setUser] = useState();

	const userValue = useMemo(() => ({ user, setUser}), [user, setUser]);

	return <AuthContext.Provider value={userValue}>{props.children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext);
export const AuthConsumer = AuthContext.Consumer;

export default AuthContext;