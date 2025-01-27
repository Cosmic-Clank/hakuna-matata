import { useContext, createContext, type PropsWithChildren } from "react";
import { useStorageState } from "../hooks/UseStorageState";

const AuthContext = createContext<{
	signIn: (userData: any) => void;
	signOut: () => void;
	session?: any;
	isLoading: boolean;
}>({
	signIn: (userData) => null,
	signOut: () => null,
	session: null,
	isLoading: false,
});

// This hook can be used to access the user info.
export function useSession() {
	const value = useContext(AuthContext);
	if (!value) {
		throw new Error("useSession must be wrapped in a <SessionProvider />");
	}
	return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
	const [[isLoading, sessionString], setSession] = useStorageState("session");
	const session = sessionString ? JSON.parse(sessionString) : null;

	return (
		<AuthContext.Provider
			value={{
				signIn: (userData) => {
					console.log("Storing session", userData);

					setSession(JSON.stringify(userData));
				},
				signOut: () => {
					setSession(null);
				},
				session,
				isLoading,
			}}>
			{children}
		</AuthContext.Provider>
	);
}
