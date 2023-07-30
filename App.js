// import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { store } from './src/redux/store';

import MainNavigations from './src/navigation/MainNavigations';

export default function App() {
	return (
		<Provider store={store}>
			<NavigationContainer>
				<MainNavigations />
			</NavigationContainer>
		</Provider>
	);
}
