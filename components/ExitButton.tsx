import React from "react";
import { View, Button, Platform, BackHandler } from "react-native";
import CustomButton from "./CustomButton";

const ExitButton = () => {
	const exitApp = () => {
		if (Platform.OS === "android") {
			BackHandler.exitApp(); // Exits and removes from recent apps on Android
		} else if (Platform.OS === "ios") {
			BackHandler.exitApp(); // Not officially supported, but may work in dev
		}
	};

	return <CustomButton text='Log Out' onPress={exitApp} style={{ width: "full", margin: 10 }} />;
};

export default ExitButton;
