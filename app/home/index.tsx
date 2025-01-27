import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Text, useTheme, Button, Surface } from "react-native-paper";
import { useSnackbar } from "@/context/SnackbarContext";
import ThemedScrollContainer from "@/components/ThemedScrollContainer";
import SurfaceIcons from "@/components/SurfaceIcons";
import SalesCounter from "@/components/SalesCounter";
import { router } from "expo-router";

export default function HomeScreen() {
	const theme = useTheme();

	const navigateToProfile = () => {
		router.navigate("/home/profile");
	};

	const styles = StyleSheet.create({
		searchBarContainer: {
			marginTop: 20,
			paddingHorizontal: 16,
			paddingBottom: 16,
		},
		searchBar: {
			borderRadius: 8,
			elevation: 2,
		},
		sectionTitle: {
			fontSize: 18,
			fontWeight: "bold",
			marginHorizontal: 16,
			marginTop: 20,
			marginBottom: 10,
		},
		promotionsContainer: {
			marginTop: 30,
			paddingHorizontal: 16,
			alignItems: "center",
		},
		surface: {
			padding: 20,
			borderRadius: 12,
			width: "100%",
			elevation: 4,
			marginBottom: 20,
		},
		promotionsText: {
			fontSize: 16,
			textAlign: "center",
			marginBottom: 16,
		},
		promotionsButton: {
			borderRadius: 8,
			paddingVertical: 6,
			width: "70%",
			alignSelf: "center",
		},
		buttonText: {
			fontSize: 14,
			color: theme.colors.onPrimary,
		},
	});

	return (
		<ThemedScrollContainer contentContainerStyle={{ padding: "0" }}>
			{/* Existing QR Code, Profile, Settings Surfaces */}
			<SurfaceIcons />
			<SalesCounter />

			{/* Promotions Section with Surface */}
			<View style={styles.promotionsContainer}>
				<Surface style={styles.surface}>
					<Text style={styles.promotionsText}>To receive special promotions and offers, please update your profile.</Text>
					<Button mode='contained' onPress={navigateToProfile} style={styles.promotionsButton} labelStyle={styles.buttonText}>
						Update Profile
					</Button>
				</Surface>
			</View>
		</ThemedScrollContainer>
	);
}
