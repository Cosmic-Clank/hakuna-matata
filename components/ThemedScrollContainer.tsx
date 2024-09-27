import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { useTheme } from "react-native-paper";

export default function ThemedScrollContainer({ children, style, contentContainerStyle }: { children: React.ReactNode; style?: any; contentContainerStyle?: any }) {
	const theme = useTheme(); // Get the theme colors

	return (
		<ScrollView style={[styles.container, { backgroundColor: theme.colors.background }, style]} contentContainerStyle={[styles.contentContainer, contentContainerStyle]}>
			{children}
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	contentContainer: {
		padding: 20,
	},
	container: {
		flex: 1,
	},
});
