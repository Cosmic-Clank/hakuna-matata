import { StyleSheet, View } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { useSession } from "@/context/AuthContext";
import { Surface, Text } from "react-native-paper";
import ThemedContainer from "@/components/ThemedContainer";

export default function QR() {
	const { session } = useSession();

	const data = {
		id: session?.CUST_CODE,
		fname: session?.CUST_FNAME,
		lname: session?.CUST_LNAME,
		email: session?.CUST_EMAIL,
	};

	return (
		<ThemedContainer>
			<Text style={styles.title}>Your QR Code</Text>
			<Surface style={styles.qrContainer}>
				<QRCode value={JSON.stringify(data)} size={250} backgroundColor='transparent' />
			</Surface>
			<View style={styles.infoContainer}>
				<Text style={styles.infoText}>
					Name: {data.fname} {data.lname}
				</Text>
				<Text style={styles.infoText}>Email: {data.email}</Text>
			</View>
		</ThemedContainer>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#f5f5f5",
	},
	title: {
		fontSize: 22,
		fontWeight: "bold",
		marginBottom: 20,
		opacity: 0.8,
	},
	qrContainer: {
		padding: 20,
		backgroundColor: "#fff",
		borderRadius: 10,
		elevation: 5, // For Android shadow
		shadowColor: "#000", // For iOS shadow
		shadowOffset: { width: 0, height: 3 },
		shadowOpacity: 0.2,
		shadowRadius: 4,
		alignItems: "center",
		marginBottom: 20, // Space between QR code and text
	},
	infoContainer: {
		marginTop: 10,
	},
	infoText: {
		fontSize: 16,
		marginTop: 5,
		opacity: 0.8,
	},
});
