import { StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { getSalesCounter } from "@/api/backend";
import { useSession } from "@/context/AuthContext";
import { Surface, Text, useTheme } from "react-native-paper";

const SalesCounter = () => {
	const [sales, setSales] = useState(0);
	const { session } = useSession();
	const theme = useTheme();

	useEffect(() => {
		const fetchSalesData = async () => {
			try {
				const salesCount = await getSalesCounter(session?.id ?? "");
				setSales(salesCount.counter);
			} catch (error) {
				console.error("Error fetching sales data:", error);
				setSales(0); // Display 0 in case of error
			}
		};

		fetchSalesData();
	}, []);

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
