import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import { Routes } from './src/navigation/mainNavigation';

// import { StyleSheet, View } from 'react-native';
// import { LoginScreen } from './src/Screens/LoginScreen';
// import { RegistrationScreen } from './src/Screens/RegistrationScreen';

export default function App() {
	return (
		<NavigationContainer>
			<Routes />
		</NavigationContainer>

		// <View style={styles.container}>
		// 	{/* <LoginScreen /> */}
		// 	<RegistrationScreen />
		// </View>
	);
}

// const styles = StyleSheet.create({
// 	container: {
// 		flex: 1,
// 	},
// });
