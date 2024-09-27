import { MD3LightTheme, MD3DarkTheme, PaperProvider } from "react-native-paper";
import React, { createContext, useState, useContext, ReactNode } from "react";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "react-native";

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
	const [isDarkTheme, setIsDarkTheme] = useState(useColorScheme() === "dark");

	// Toggle theme between light and dark
	const toggleTheme = () => {
		setIsDarkTheme(!isDarkTheme);
	};

	return <ThemeContext.Provider value={{ isDarkTheme, toggleTheme, theme: isDarkTheme ? darkTheme : lightTheme }}>{children}</ThemeContext.Provider>;
};

// Custom hook to use the ThemeContext in components
export const useThemeContext = () => useContext(ThemeContext);
