import React from "react";
import { View, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";

export default function ThemedContainer({ children, style }: { children: React.ReactNode; style?: any }) {
	const theme = useTheme(); // Get the theme colors

	return <View style={[styles.container, { backgroundColor: theme.colors.background }, style]}>{children}</View>;
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 16,
		justifyContent: "center",
		alignItems: "center",
	},
});
