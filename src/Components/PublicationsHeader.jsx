import { View, Text, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import { getHeaderTitle } from '@react-navigation/elements';
import { authSignOutUser } from '../redux/auth/authOperations.js';

const PublicationsHeader = ({ route, options }) => {
	const dispatch = useDispatch();
	const title = getHeaderTitle(options, route.name);

	const signOut = () => {
		dispatch(authSignOutUser());
	};

	return (
		<View style={styles.hedder}>
			<Text style={styles.title}>{title}</Text>
			<Feather
				name="log-out"
				size={24}
				color="#BDBDBD"
				onPress={signOut}
				style={styles.exitBtn}
			/>
		</View>
	);
};

export default PublicationsHeader;

const styles = StyleSheet.create({
	hedder: {
		backgroundColor: '#ffffff',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		height: 80,
		position: 'relative',
		paddingTop: 30,
		borderBottomWidth: 1,
		borderBottomColor: '#b3b3b3',
	},
	title: {
		fontFamily: 'Roboto',
		fontWeight: 500,
		fontSize: 20,
		lineHeight: 22,
		textAlign: 'center',
		letterSpacing: -0.408,
		color: '#212121',
	},
	exitBtn: {
		marginLeft: 16,
		color: '#BDBDBD',
		position: 'absolute',
		right: 16,
		bottom: 12,
	},
});
