import { PaperProvider } from "react-native-paper";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { SessionProvider } from "@/context/AuthContext";
import PaperNavigationBar from "@/components/navigation/AppBar";
import { SnackbarProvider } from "@/context/SnackbarContext";
import { ThemeProvider, useThemeContext } from "@/context/ThemeContext";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function App() {
	return (
		<ThemeProvider>
			<RootLayout />
		</ThemeProvider>
	);
}

export function RootLayout() {
	const { theme } = useThemeContext();

	const [fontsLoaded, fontsLoadedError] = useFonts({
		SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
	});

	useEffect(() => {
		if (fontsLoaded) {
			setTimeout(SplashScreen.hideAsync, 500);
		}
		if (fontsLoadedError) {
			console.error("Error loading fonts", fontsLoadedError);
		}
	}, [fontsLoaded, fontsLoadedError]);

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
