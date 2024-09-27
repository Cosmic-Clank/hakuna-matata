import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useTheme } from "react-native-paper";

const CustomButton = ({ text, onPress, style, isOutlined = false }: { text: string; onPress: () => void; style?: object; isOutlined?: boolean }) => {
	const theme = useTheme(); // Get theme for colors

	return (
		<TouchableOpacity style={[styles.button, isOutlined ? styles.outlinedButton : { backgroundColor: theme.colors.primary }, style]} onPress={onPress}>
			<Text style={[styles.buttonText, isOutlined ? { color: theme.colors.primary } : { color: "#fff" }]}>{text}</Text>
		</TouchableOpacity>
	);
};

export default CustomButton;

const styles = StyleSheet.create({
	button: {
		width: "80%",
		paddingVertical: 12,
		borderRadius: 8,
		marginVertical: 10,
		alignItems: "center",
	},
	outlinedButton: {
		borderWidth: 2,
		borderColor: "#FE5E00", // Default color, can be overridden with theme
	},
	buttonText: {
		fontSize: 16,
		fontWeight: "bold",
	},
});
