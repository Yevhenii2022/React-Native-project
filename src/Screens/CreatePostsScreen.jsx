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
} from 'react-native';

const initialPostData = {
	photo: '',
	description: '',
	place: '',
};

const CreatePostsScreen = () => {
	const navigation = useNavigation();
	const [postData, setPostData] = useState(initialPostData);
	const [location, setLocation] = useState(null);
	const [hasPermission, setHasPermission] = useState(null);
	const [cameraRef, setCameraRef] = useState(null);
	const [type, setType] = useState(Camera.Constants.Type.back);

	useEffect(() => {
		(async () => {
			const { status } = await Camera.requestPermissionsAsync();
			await MediaLibrary.requestPermissionsAsync();

			setHasPermission(status === 'granted');
		})();
	}, []);

	if (hasPermission === null) {
		return <View />;
	}
	if (hasPermission === false) {
		return <Text>No access to camera</Text>;
	}

	//Search for  location
	const searchLocation = async () => {
		try {
			let { status } = await Location.requestPermissionsAsync();
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
			setImageToPostData(result.assets[0].uri);
		}
	};

	const handleInput = (type, value) => {
		setPostData(prevState => ({ ...prevState, [type]: value }));
	};

	const sendPost = () => {
		setPostData(initialPostData);
		navigation.replace('Home');
	};

	const handleReset = () => {
		setPostData(initialPostData);
	};

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<View style={styles.container}>
				<View>
					<View style={styles.cameraContainer}>
						<Camera style={styles.camera} type={type} ref={setCameraRef}>
							<View style={styles.photoView}>
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
									<Feather name="repeat" size={20} color="#BDBDBD" />
								</TouchableOpacity>
								<TouchableOpacity
									style={styles.photoButton}
									onPress={async () => {
										if (cameraRef) {
											const { uri } = await cameraRef.takePictureAsync();
											await MediaLibrary.createAssetAsync(uri);
										}
									}}
								>
									<Ionicons name="camera" size={24} style={styles.photoIcon} />
								</TouchableOpacity>
							</View>
						</Camera>
					</View>
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
							style={{ ...styles.input, marginBottom: 16 }}
							placeholder="Введіть назву..."
							value={postData.description}
							onChangeText={value => handleInput('description', value)}
						/>
						<TextInput
							style={{ ...styles.input, paddingLeft: 28 }}
							placeholder="Виберіть місце..."
							value={postData.place}
							onChangeText={value => handleInput('place', value)}
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
	input: {
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
});
