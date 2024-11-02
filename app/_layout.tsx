import { PaperProvider } from "react-native-paper";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { SessionProvider } from "@/context/AuthContext";
import PaperNavigationBar from "@/components/navigation/AppBar";
import { SnackbarProvider } from "@/context/SnackbarContext";
import { ThemeProvider, useThemeContext } from "@/context/ThemeContext";
import { View, Text, StyleSheet, Image } from "react-native";

// Custom splash screen component
function CustomSplashScreen() {
	return (
		<View style={styles.splashContainer}>
			<Image
				source={require("../assets/images/splash.png")} // Adjust the path to your assets folder
				style={styles.splashImage}
				resizeMode='contain'
			/>
		</View>
	);
}

export default function App() {
	const [showSplash, setShowSplash] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => {
			setShowSplash(false);
		}, 3000); // Show splash for 5 seconds

		return () => clearTimeout(timer); // Clear the timer if component unmounts
	}, []);

	return <ThemeProvider>{showSplash ? <CustomSplashScreen /> : <RootLayout />}</ThemeProvider>;
}

export function RootLayout() {
	const { theme } = useThemeContext();

	const [fontsLoaded, fontsLoadedError] = useFonts({
		SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
	});

	useEffect(() => {
		if (fontsLoadedError) {
			console.error("Error loading fonts", fontsLoadedError);
		}
	}, [fontsLoadedError]);

	if (!fontsLoaded) {
		return null;
	}

	return (
		<SessionProvider>
			<PaperProvider theme={theme}>
				<SnackbarProvider>
					<Stack
						screenOptions={{
							header: () => <PaperNavigationBar />,
						}}>
						<Stack.Screen name='home' options={{ headerShown: false }} />
						<Stack.Screen name='index' />
						<Stack.Screen name='register' />
						<Stack.Screen name='login' />
					</Stack>
				</SnackbarProvider>
			</PaperProvider>
		</SessionProvider>
	);
}

const styles = StyleSheet.create({
	splashContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#e5c09d", // Optional background color
	},
	splashImage: {
		width: "100%", // Adjust the size as needed
		height: "100%",
	},
	splashText: {
		fontSize: 24,
		color: "#fff",
	},
});
