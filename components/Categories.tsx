import React from "react";
import { View, StyleSheet } from "react-native";
import { FlatList } from "react-native";
import { IconButton, Text } from "react-native-paper";
import { useTheme } from "react-native-paper";

// Dummy data for categories (This can also be passed as props if needed)
const categories = [
	{ id: "1", name: "Fruits", icon: "fruit-grapes" },
	{ id: "2", name: "Vegetables", icon: "leaf" },
	{ id: "3", name: "Meat", icon: "food-drumstick" },
	{ id: "4", name: "Dairy", icon: "cheese" },
	{ id: "5", name: "Beverages", icon: "food-fork-drink" },
	{ id: "6", name: "Snacks", icon: "food" },
	{ id: "7", name: "Bakery", icon: "bread-slice" },
];

export default function Categories() {
	const theme = useTheme();

	return (
		<FlatList
			horizontal
			showsHorizontalScrollIndicator={false}
			data={categories}
			keyExtractor={(item) => item.id}
			contentContainerStyle={styles.horizontalScroll}
			renderItem={({ item }) => (
				<View style={styles.categoryContainer}>
					<View style={[styles.iconCircle, { backgroundColor: theme.colors.surfaceVariant }]}>
						<IconButton icon={item.icon} size={40} iconColor={theme.colors.primary} />
					</View>
					<Text style={styles.categoryText}>{item.name}</Text>
				</View>
			)}
		/>
	);
}

const styles = StyleSheet.create({
	horizontalScroll: {
		paddingHorizontal: 16,
	},
	categoryContainer: {
		alignItems: "center",
		marginRight: 16,
	},
	iconCircle: {
		borderRadius: 50,
		padding: 5,
		justifyContent: "center",
		alignItems: "center",
	},
	categoryText: {
		marginTop: 8,
		fontSize: 14,
		opacity: 0.8,
		textAlign: "center",
	},
});
