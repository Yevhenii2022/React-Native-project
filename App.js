// import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { LoginScreen, RegistrationScreen } from './src/Screens';
// import { useFonts } from 'expo-font';

export default function App() {
	// const [fontsLoaded] = useFonts({
	// 	RobotoRegular: require('./assets/fonts/Roboto-Regular.ttf'),
	// 	RobotoMedium: require('./assets/fonts/Roboto-Medium.ttf'),
	// 	RobotoBold: require('./assets/fonts/Roboto-Bold.ttf'),
	// });
	// if (!fontsLoaded) {
	// 	return null;
	// }

	return (
		<View style={styles.container}>
			<LoginScreen />
			<RegistrationScreen />
			{/* <Text style={{ fontFamily: 'RobotoRegular' }}>
				Open up App.js to start!! working on your app!
			</Text> */}
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
