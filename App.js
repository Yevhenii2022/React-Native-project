import { StyleSheet, View } from 'react-native';
import { LoginScreen } from './src/Screens/LoginScreen';
import { RegistrationScreen } from './src/Screens/RegistrationScreen';

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
