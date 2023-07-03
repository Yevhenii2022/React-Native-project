import { StyleSheet, View } from 'react-native';
import { LoginScreen, RegistrationScreen } from './src/Screens';

export default function App() {
	return (
		<View style={styles.container}>
			{/* <LoginScreen /> */}
			<RegistrationScreen />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// backgroundColor: '#fff',
		// alignItems: 'center',
		// justifyContent: 'center',
	},
});
