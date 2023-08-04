import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import Main from './src/navigation/Main';

export default function App() {
	return (
		<Provider store={store}>
			<Main />
		</Provider>
	);
}
