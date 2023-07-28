import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import * as Location from 'expo-location';
import { Ionicons, Octicons, Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import {
	Text,
	StyleSheet,
	View,
	TouchableOpacity,
	TouchableWithoutFeedback,
	Keyboard,
	TextInput,
	ImageBackground,
} from 'react-native';

const initialPostData = {
	description: '',
	place: '',
	photo: null,
};

const CreatePostsScreen = () => {
	const navigation = useNavigation();
	const [postData, setPostData] = useState(initialPostData);
	const [isFocused, setIsFocused] = useState(null);
	const [location, setLocation] = useState(null);
	console.log(location);

	const [hasPermission, setHasPermission] = useState(null);
	const [cameraRef, setCameraRef] = useState(null);
	const [type, setType] = useState(Camera.Constants.Type.back);

	useEffect(() => {
		(async () => {
			const { status } = await Camera.requestCameraPermissionsAsync();
			await MediaLibrary.requestPermissionsAsync();

			setHasPermission(status === 'granted');
		})();
	}, []);

	if (hasPermission === null) {
		return <View />;
	}

	//Search for  location
	const searchLocation = async () => {
		try {
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== 'granted') {
				console.log('Permission to access location was denied');
			}

			let location = await Location.getCurrentPositionAsync({});
			const coords = {
				latitude: location.coords.latitude,
				longitude: location.coords.longitude,
			};
			setLocation(coords);
		} catch (error) {
			console.log(error);
		}
	};

	const pickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});
		if (!result.canceled) {
			handlePostData('photo', result.assets[0]);
		}
	};

	const handlePostData = (type, value) => {
		setPostData(prevState => ({ ...prevState, [type]: value }));
	};

	const sendPost = () => {
		setPostData(initialPostData);
		navigation.navigate('Publications');
		searchLocation();
	};

	const handleReset = () => {
		setPostData(initialPostData);
		setLocation(null);
	};

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<View style={styles.container}>
				<View>
					<View style={styles.cameraContainer}>
						<Camera style={styles.camera} type={type} ref={setCameraRef}>
							<ImageBackground source={postData.photo} style={styles.photoView}>
								{!hasPermission && !postData.photo && (
									<Text
										style={{
											color: '#ffffff',
										}}
									>
										Завантажте будь-ласка Ваше фото
									</Text>
								)}
								<TouchableOpacity
									style={styles.flipContainer}
									onPress={() => {
										setType(
											type === Camera.Constants.Type.back
												? Camera.Constants.Type.front
												: Camera.Constants.Type.back,
										);
									}}
								>
									{hasPermission && (
										<Feather name="repeat" size={20} color="#BDBDBD" />
									)}
								</TouchableOpacity>
								{hasPermission && (
									<TouchableOpacity
										style={styles.photoButton}
										onPress={async () => {
											if (cameraRef) {
												const { uri } = await cameraRef.takePictureAsync();
												const asset = await MediaLibrary.createAssetAsync(uri);
												handlePostData('photo', asset);
											}
										}}
									>
										<Ionicons
											name="camera"
											size={24}
											style={styles.photoIcon}
										/>
									</TouchableOpacity>
								)}
							</ImageBackground>
						</Camera>
					</View>
					<View
						style={{
							justifyContent: 'flex-end',
						}}
					>
						<TouchableOpacity style={styles.pickImgBtn} onPress={pickImage}>
							<Text
								style={{
									...styles.btnTitle,
									color: '#ffffff',
								}}
							>
								Завантажити фото з галереї
							</Text>
						</TouchableOpacity>
						<View style={styles.inputWrapper}>
							<TextInput
								style={[
									styles.inputName,
									isFocused === 'name' && styles.activeField,
								]}
								placeholder="Введіть назву..."
								value={postData.description}
								onChangeText={value => handlePostData('description', value)}
								onFocus={() => setIsFocused('name')}
								onBlur={() => setIsFocused(null)}
							/>
							<TextInput
								style={[
									styles.inputPlace,
									isFocused === 'place' && styles.activeField,
								]}
								placeholder="Виберіть місце..."
								value={postData.place}
								onChangeText={value => handlePostData('place', value)}
								onFocus={() => setIsFocused('place')}
								onBlur={() => setIsFocused(null)}
							/>
							<Octicons
								name="location"
								size={24}
								style={{
									position: 'absolute',
									top: 71,
									color: '#CECDCD',
								}}
							/>
						</View>
						<View>
							<TouchableOpacity
								style={{
									...styles.sendBtn,
									backgroundColor: postData.photo ? '#FF6C00' : '#F6F6F6',
								}}
								activeOpacity={0.7}
								onPress={sendPost}
								disabled={!postData.photo}
							>
								<Text
									style={{
										...styles.btnTitle,
										color: postData.photo ? '#fff' : '#BDBDBD',
									}}
								>
									Опублікувати
								</Text>
							</TouchableOpacity>
						</View>

						<TouchableOpacity style={styles.removeButton} onPress={handleReset}>
							<Feather name="trash-2" size={24} color="#DADADA" />
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</TouchableWithoutFeedback>
	);
};

export default CreatePostsScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingVertical: 30,
		paddingHorizontal: 16,
		backgroundColor: '#ffffff',
	},
	cameraContainer: {
		height: 240,
		borderRadius: 8,
		borderWidth: 1,
		borderColor: '#E8E8E8',
		backgroundColor: '#f6f6f6',
		marginBottom: 8,
		overflow: 'hidden',
	},
	camera: {
		flex: 1,
	},
	inputWrapper: {
		marginTop: 22,
	},
	inputName: {
		marginBottom: 16,
		height: 45,
		borderBottomWidth: 1,
		borderBottomColor: '#E8E8E8',
		fontFamily: 'Roboto',
		fontSize: 16,
		color: '#212121',
	},
	inputPlace: {
		paddingLeft: 28,
		height: 45,
		borderBottomWidth: 1,
		borderBottomColor: '#E8E8E8',
		fontFamily: 'Roboto',
		fontSize: 16,
		color: '#212121',
	},
	pickImgBtn: {
		marginTop: 18,
		padding: 10,
		backgroundColor: '#BDBDBD',
		alignItems: 'center',
		borderRadius: 100,
	},
	sendBtn: {
		fontFamily: 'Roboto',
		fontSize: 16,
		justifyContent: 'center',
		alignItems: 'center',
		height: 50,
		marginTop: 32,
		borderRadius: 100,
	},
	btnTitle: {
		fontFamily: 'Roboto',
		fontSize: 16,
	},
	photoButton: {
		borderRadius: 30,
		width: 60,
		height: 60,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#ffffff55',
	},
	photoIcon: { color: '#ffffff' },
	photoView: {
		flex: 1,
		backgroundColor: 'transparent',
		justifyContent: 'center',
		alignItems: 'center',
	},
	flipContainer: {
		top: -60,
		alignSelf: 'flex-end',
		marginRight: 20,
	},
	removeButton: {
		width: 70,
		height: 40,
		borderRadius: 30,
		marginTop: 40,
		alignItems: 'center',
		justifyContent: 'center',
		alignSelf: 'center',
		backgroundColor: '#F6F6F6',
	},
	activeField: {
		borderBottomColor: '#FF6C00',
	},
});
