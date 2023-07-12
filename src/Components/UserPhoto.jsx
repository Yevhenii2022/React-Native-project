import { View, StyleSheet, ImageBackground } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import PlusStyledButton from './PlusStyledButton';
import { useState, useEffect } from 'react';

const UserPhoto = () => {
	const [isBtnActive, setIsBtnActive] = useState(false);
	const [photo, setPhoto] = useState(null);

	useEffect(() => {
		if (photo) setIsBtnActive(true);
		else setIsBtnActive(false);
	}, [photo]);

	const pickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [1, 1],
			quality: 1,
		});

		if (!result.canceled) {
			setPhoto(result.assets[0].uri);
		}
	};

	const handlePressStyledButton = () => {
		photo ? setPhoto(null) : pickImage();
	};

	return (
		<View style={styles.userPhoto}>
			<ImageBackground source={{ uri: photo }} style={styles.photo} />
			<PlusStyledButton
				isActive={isBtnActive}
				onPress={handlePressStyledButton}
			/>
		</View>
	);
};

export default UserPhoto;

const styles = StyleSheet.create({
	userPhoto: {
		width: 120,
		height: 120,
		borderRadius: 16,
		backgroundColor: '#F6F6F6',
		position: 'relative',
		top: -64,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	photo: {
		height: 120,
		width: 120,
		borderRadius: 16,
		overflow: 'hidden',
	},
});
