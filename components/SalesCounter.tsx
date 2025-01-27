import { StyleSheet, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { getUserDataByCode } from "@/api/backend";
import { useSession } from "@/context/AuthContext";
import { Surface, Text, useTheme } from "react-native-paper";
import { useFocusEffect } from "expo-router";

const SalesCounter = () => {
	const [sales, setSales] = useState(0);
	const { session, signIn } = useSession();
	const theme = useTheme();

	const fetchSalesData = async () => {
		try {
			const response = await getUserDataByCode(session.CUST_CODE);
			if (response.statusCode === 200) {
				const userData = response.userData;
				console.log("Fetched User Data:", userData);
				setSales(userData.CUST_COUNTER);
				signIn({ ...userData });
			} else {
				console.error("Error fetching sales data:", "Network Error");
				setSales(session.CUST_COUNTER); // Display 0 in case of error
			}
		} catch (error) {
			console.error("Error fetching sales data:", error);
			setSales(session.CUST_COUNTER); // Display 0 in case of error
		}
	};
	useFocusEffect(
		useCallback(() => {
			fetchSalesData();
		}, [])
	);

	return (
		<View style={styles.container}>
			<Surface style={styles.surface}>
				<Text style={styles.title}>Collected Units</Text>
				<Text style={[styles.salesText, { color: theme.colors.primary }]}>{sales}</Text>
			</Surface>
		</View>
	);
};

export default SalesCounter;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 16,
		marginTop: 20,
	},
	surface: {
		padding: 24,
		elevation: 4,
		borderRadius: 12,
		alignItems: "center",
		justifyContent: "center",
	},
	title: {
		fontSize: 22,
		fontWeight: "bold",
		marginBottom: 8,
	},
	salesText: {
		fontSize: 48,
		fontWeight: "bold",
	},
});
