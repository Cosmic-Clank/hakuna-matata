import { Appbar, Avatar, useTheme } from "react-native-paper";
import { router, useSegments } from "expo-router";
import { StyleSheet } from "react-native";

const toTitleCase = (str: string) => str.replace(/\b\w/g, (char) => char.toUpperCase());

export default function PaperNavigationBar({ backable = true }: { backable?: boolean }) {
	const theme = useTheme(); // Get the theme colors
	const segments = useSegments(); // Provides the route segment

	// Get the title from the current route segment
	let title: keyof typeof routes | string = segments[segments.length - 1];
	if (title) {
		if (routes[title as keyof typeof routes]) {
			title = routes[title as keyof typeof routes];
		} else {
			title = toTitleCase(title);
		}
	} else {
		title = "Hakuna Matata";
	}
	segments[segments.length - 1] ? toTitleCase(segments[segments.length - 1]) : "App"; // Fallback to 'App' if no segment
	// console.log(segments);
	return (
		<Appbar.Header style={[styles.header, { backgroundColor: theme.colors.surface }]}>
			{backable && segments.length >= 1 ? <Appbar.BackAction onPress={() => router.back()} /> : null}
			<Appbar.Content title={title} titleStyle={[styles.title, { color: theme.colors.primary }]} />
			<Appbar.Action size={50} icon={require("../../assets/images/logo-sticker.png")} onPress={() => {}} />
		</Appbar.Header>
	);
}

const styles = StyleSheet.create({
	header: {
		elevation: 3, // No shadow
		height: 90, // Fixed height
		margin: 0,
	},
	title: {
		fontSize: 28, // Larger font size
		fontWeight: "bold", // Bold text
		paddingTop: 10, // Add padding to the top
	},
});

const routes = {
	qrcode: "QR Code",
	home: "Hakuna Matata",
};
