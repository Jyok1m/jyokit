import { StyleSheet, Text, View, Button } from "react-native";

export default function StackScreen1({ navigation }) {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>StackScreen1</Text>
			<Button title="Go to StackScreen2" onPress={() => navigation.navigate("StackScreen2")} />
			<Button title="Go to TabNavigator" onPress={() => navigation.navigate("TabNavigator")} />
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
