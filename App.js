import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { MainNavigations } from './src/navigation/MainNavigations';

export default function App() {
	return (
		<NavigationContainer>
			<MainNavigations />
		</NavigationContainer>
	);
}
