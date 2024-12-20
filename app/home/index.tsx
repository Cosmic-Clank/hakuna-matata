import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Text, useTheme, Searchbar } from "react-native-paper";
import { useSnackbar } from "@/context/SnackbarContext"; // Import the showSnackbar function
import ThemedScrollContainer from "@/components/ThemedScrollContainer";
import SurfaceIcons from "@/components/SurfaceIcons";
import SalesCounter from "@/components/SalesCounter";
import Categories from "@/components/Categories";
import Products from "@/components/Products";
import ExitButton from "@/components/ExitButton";

export default function HomeScreen() {
	const theme = useTheme(); // Get the current theme colors
	const { showSnackbar } = useSnackbar(); // Get the showSnackbar function from the context
	const [searchQuery, setSearchQuery] = useState(""); // State for search bar

	// Handle product quantity changes
	const handleAddToCart = (product: { id?: string; name: any; price?: string; image?: string }) => {
		showSnackbar(`Added ${product.name} to cart`);
	};

	const handleRemoveFromCart = (product: { id?: string; name: any; price?: string; image?: string }) => {
		showSnackbar(`Removed ${product.name} from cart`);
	};

	// Handle search bar changes (for now, just set the value)
	const onChangeSearch = (query: string) => setSearchQuery(query);

	return (
		<ThemedScrollContainer contentContainerStyle={{ padding: "0" }}>
			{/* Search Bar */}
			{/* <View style={styles.searchBarContainer}>
				<Searchbar placeholder='Search' onChangeText={onChangeSearch} value={searchQuery} style={styles.searchBar} />
			</View> */}

			{/* Existing QR Code, Profile, Settings Surfaces */}
			<SurfaceIcons />
			<SalesCounter />
			{/* <ExitButton /> */}

			{/* Categories Section */}
			{/* <Text style={styles.sectionTitle}>Categories</Text>
			<Categories /> */}

			{/* Products Section */}
			{/* <Text style={styles.sectionTitle}>Popular Deals</Text>
			<Products handleAddToCart={handleAddToCart} handleRemoveFromCart={handleRemoveFromCart} /> */}
		</ThemedScrollContainer>
	);
}

const styles = StyleSheet.create({
	searchBarContainer: {
		marginTop: 20,
		paddingHorizontal: 16,
		paddingBottom: 16,
	},
	searchBar: {
		borderRadius: 8,
		elevation: 2, // Adds slight shadow to search bar
	},
	sectionTitle: {
		fontSize: 18,
		fontWeight: "bold",
		marginHorizontal: 16,
		marginTop: 20,
		marginBottom: 10,
	},
});
