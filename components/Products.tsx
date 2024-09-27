import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { Surface, Text, Button, Icon, IconButton } from "react-native-paper";

// Dummy data for products (You can pass this as a prop in the parent component if needed)
const products = [
	{ id: "1", name: "Red Apple", price: "$4.99", image: "https://img.icons8.com/external-vitaliy-gorbachev-flat-vitaly-gorbachev/100/external-apple-fruit-vitaliy-gorbachev-flat-vitaly-gorbachev.png" },
	{ id: "2", name: "Banana", price: "$5.99", image: "https://img.icons8.com/office/100/banana.png" },
	{ id: "3", name: "Orange", price: "$6.99", image: "https://img.icons8.com/color/100/orange.png" },
	{ id: "4", name: "Strawberry", price: "$3.99", image: "https://img.icons8.com/color/100/strawberry.png" },
];

interface Product {
	id: string;
	name: string;
	price: string;
	image: string;
}

interface ProductsProps {
	handleAddToCart: (product: Product) => void;
	handleRemoveFromCart: (product: Product) => void;
}

export default function Products({ handleAddToCart, handleRemoveFromCart }: ProductsProps) {
	return (
		<View style={styles.productList}>
			{products.map((product) => (
				<Surface style={styles.productContainer} key={product.id}>
					<Image source={{ uri: product.image }} style={styles.productImage} />
					<Text style={styles.productName}>{product.name}</Text>
					<Text style={styles.productPrice}>{product.price}</Text>
					<View style={styles.buttonRow}>
						<IconButton mode='outlined' icon='minus' onPress={() => handleRemoveFromCart(product)} style={styles.productButton} />
						<IconButton mode='outlined' icon='plus' onPress={() => handleAddToCart(product)} style={styles.productButton} />
					</View>
				</Surface>
			))}
		</View>
	);
}

const styles = StyleSheet.create({
	productList: {
		paddingHorizontal: 16,
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-between",
		marginBottom: 16,
	},
	productContainer: {
		width: "48%", // Ensure two products per row
		padding: 16,
		marginBottom: 16,
		borderRadius: 10,
		elevation: 4,
		alignItems: "center",
	},
	productImage: {
		width: 80,
		height: 80,
		marginBottom: 10,
	},
	productName: {
		fontSize: 16,
		fontWeight: "bold",
		marginBottom: 5,
	},
	productPrice: {
		fontSize: 14,
		opacity: 0.7,
		marginBottom: 10,
	},
	buttonRow: {
		flexDirection: "row",
	},
	productButton: {
		marginHorizontal: 5,
	},
});
