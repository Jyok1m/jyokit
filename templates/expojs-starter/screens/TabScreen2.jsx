import { StyleSheet, Text, View, Button } from "react-native";

export default function TabScreen2({ navigation }) {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>TabScreen2</Text>
			<Button title="Go to StackScreen1" onPress={() => navigation.navigate("StackScreen1")} />
			<Button title="Go to StackScreen2" onPress={() => navigation.navigate("StackScreen2")} />
		</View>
	);
}

const styles = StyleSheet.create({
	// Add your styles here
	// Example:
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 20,
	},
});
