import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

const UserTab = ({ email, name, photo }) => {
	return (
		<TouchableOpacity style={styles.container}>
			<Image
				source={require('../../assets/userPhoto.png')}
				style={styles.photo}
			/>
			<View>
				<Text style={styles.title}>Natali Romanova</Text>
				<Text style={styles.email}>email@example.com</Text>
			</View>
		</TouchableOpacity>
	);
};

export default UserTab;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
	},
	photo: {
		width: 60,
		height: 60,
		borderRadius: 16,
	},
	title: {
		color: '#212121',
		fontFamily: 'Roboto',
		fontWeight: '700',
		fontSize: 13,
		lineHeight: 15,
	},
	email: {
		marginTop: -4,
		color: '#212121cc',
		fontFamily: 'Roboto',
		fontWeight: '400',
		fontSize: 11,
		lineHeight: 13,
	},
});
