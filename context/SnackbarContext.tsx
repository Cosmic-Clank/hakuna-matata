import React, { createContext, useContext, useState, ReactNode } from "react";
import { Snackbar } from "react-native-paper";

// Create a context
const SnackbarContext = createContext({
	showSnackbar: (message: string) => {},
});

// Custom hook to use the snackbar context
export const useSnackbar = () => useContext(SnackbarContext);

// Snackbar provider that wraps the app
export const SnackbarProvider = ({ children }: { children: ReactNode }) => {
	const [snackbar, setSnackbar] = useState({
		visible: false,
		message: "",
	});

	// Function to show the snackbar
	const showSnackbar = (message: string) => {
		setSnackbar({ visible: true, message });
		// Automatically hide the snackbar after 3 seconds
		setTimeout(() => setSnackbar({ visible: false, message: "" }), 5000);
	};

	return (
		<SnackbarContext.Provider value={{ showSnackbar }}>
			{children}
			<Snackbar visible={snackbar.visible} onDismiss={() => setSnackbar({ visible: false, message: "" })} duration={3000}>
				{snackbar.message}
			</Snackbar>
		</SnackbarContext.Provider>
	);
};
