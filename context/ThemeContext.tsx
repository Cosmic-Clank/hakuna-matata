import { MD3LightTheme, MD3DarkTheme, PaperProvider } from "react-native-paper";
import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { Colors } from "@/constants/Colors";
import { useStorageState } from "@/hooks/UseStorageState"; // Assuming you have a hook to handle secure storage

// Create a context
const ThemeContext = createContext({
	isDarkTheme: false,
	toggleTheme: () => {},
	theme: {},
});

const darkTheme = { ...MD3DarkTheme, colors: Colors.dark.colors };
const lightTheme = { ...MD3LightTheme, colors: Colors.light.colors };

interface ThemeProviderProps {
	children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
	const [[isLoading, colorScheme], setColorScheme] = useStorageState("theme"); // Default to light theme initially
	const [isDarkTheme, setIsDarkTheme] = useState(false);

	useEffect(() => {
		// Initialize theme from storage
		if (!isLoading) {
			setIsDarkTheme(colorScheme === "dark");
		}
	}, [isLoading, colorScheme]);

	// Toggle theme between light and dark
	const toggleTheme = () => {
		const newTheme = !isDarkTheme ? "dark" : "light";
		setIsDarkTheme(!isDarkTheme);
		setColorScheme(newTheme); // Persist new theme to storage
	};

	if (isLoading) {
		// Optional loading indicator while loading from storage
		return null;
	}

	return <ThemeContext.Provider value={{ isDarkTheme, toggleTheme, theme: isDarkTheme ? darkTheme : lightTheme }}>{children}</ThemeContext.Provider>;
};

// Custom hook to use the ThemeContext in components
export const useThemeContext = () => useContext(ThemeContext);
