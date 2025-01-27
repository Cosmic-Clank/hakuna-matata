import { PaperProvider } from "react-native-paper";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import PaperNavigationBar from "@/components/navigation/AppBar";
import { View, Text, StyleSheet, Image } from "react-native";

export default function StackLayout() {
	return (
		<Stack
			screenOptions={{
				headerShown: false,
			}}>
			{/* <Stack.Screen name='home' options={{ headerShown: false }} /> */}
			<Stack.Screen name='index' />
			<Stack.Screen name='signin' />
			<Stack.Screen name='signup' />
		</Stack>
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
