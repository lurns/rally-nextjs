import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { server } from "../lib/config";

const AuthContext = createContext();

export const getUser = async() => {
	try {
		// see if user in localstorage
		let user;

		if (typeof window !== 'undefined') {
			if (localStorage.getItem('rally_storage')) {
				user = localStorage.getItem('rally_storage');
			} else {
				const response = await fetch(`${server}api/auth`, {
					method: 'GET',
				});

				user = await response.json();

				localStorage.setItem('rally_storage', JSON.stringify(user));
			}
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
	const auth = props.myAuth || { status: 'SIGNED_OUT', user: null };

	useEffect(() => {
		if (auth.user) {
			setUser(auth.user);
			auth.user = user;
		}
	}, []);

	return <AuthContext.Provider value={{ auth, user, setUser }}>{props.children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext);
export const AuthConsumer = AuthContext.Consumer;

export default AuthContext;