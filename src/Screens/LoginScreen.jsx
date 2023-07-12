import {
	View,
	StyleSheet,
	TextInput,
	Text,
	SafeAreaView,
	Platform,
	ImageBackground,
	TouchableOpacity,
	TouchableWithoutFeedback,
	KeyboardAvoidingView,
	Keyboard,
	Alert,
} from 'react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import image from '../../assets/photo_BG2x.png';

const LoginScreen = () => {
	const navigation = useNavigation();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isShownPasword, setIsShownPasword] = useState(true);
	const [isFocused, setIsFocused] = useState(null);

	const showPassword = () => {
		setIsShownPasword(prev => !prev);
	};

	const [fontsLoaded] = useFonts({
		Roboto: require('../../assets/fonts/Roboto-Regular.ttf'),
	});
	if (!fontsLoaded) {
		return null;
	}

	const onLogin = () => {
		Alert.alert('FormData: ', `pass:  ${password}  email:  ${email}`);
		setEmail('');
		setPassword('');
		navigation.replace('Home');
	};

	return (
		<ImageBackground source={image} style={styles.image}>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<SafeAreaView>
					<View style={styles.box}>
						<View style={styles.view}>
							<KeyboardAvoidingView
								behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
								keyboardVerticalOffset={0}
							>
								<Text style={styles.title}>Увійти</Text>
								<TextInput
									onFocus={() => setIsFocused('email')}
									onBlur={() => setIsFocused(null)}
									placeholder="Адреса електронної пошти"
									style={[styles.input, isFocused === 'email' && styles.active]}
									onChangeText={setEmail}
									value={email}
									inputMode="email"
									placeholderTextColor="#BDBDBD"
								/>
								<View>
									<TextInput
										onFocus={() => setIsFocused('password')}
										onBlur={() => setIsFocused(null)}
										placeholder="Пароль"
										style={[
											styles.input,
											isFocused === 'password' && styles.active,
										]}
										onChangeText={setPassword}
										value={password}
										textContentType="password"
										placeholderTextColor="#BDBDBD"
										secureTextEntry={isShownPasword}
									/>
									<TouchableOpacity
										onPress={showPassword}
										style={styles.passwordInputBtn}
									>
										<Text style={styles.showPassText}>
											{isShownPasword ? 'Показати' : 'Приховати'}
										</Text>
									</TouchableOpacity>
								</View>
							</KeyboardAvoidingView>
							<TouchableOpacity style={styles.btn} onPress={onLogin}>
								<Text style={styles.btnText}>Увійти</Text>
							</TouchableOpacity>
							<TouchableOpacity style={styles.bottomTextContainer}>
								<Text
									style={styles.bottomText}
									onPress={() => navigation.replace('Registration')}
								>
									Немає акаунту?{' '}
									<Text style={styles.underlinedText}>Зареєструватися</Text>
								</Text>
							</TouchableOpacity>
						</View>
					</View>
				</SafeAreaView>
			</TouchableWithoutFeedback>
		</ImageBackground>
	);
};

export default LoginScreen;

const styles = StyleSheet.create({
	image: {
		resizeMode: 'cover',
		flex: 1,
	},
	box: {
		height: '100%',
		justifyContent: 'flex-end',
		textAlign: 'center',
		position: 'relative',
		flexDirection: 'column',
	},
	view: {
		backgroundColor: '#ffffff',
		borderTopLeftRadius: 25,
		borderTopRightRadius: 25,
		paddingTop: 32,
		paddingHorizontal: 16,
		paddingBottom: 144,
	},
	title: {
		fontStyle: 'normal',
		fontWeight: '500',
		fontSize: 30,
		lineHeight: 35,
		textAlign: 'center',
		letterSpacing: 0.01,
		color: '#212121',
		marginBottom: 16,
		fontFamily: 'Roboto',
	},
	input: {
		height: 50,
		marginTop: 16,
		padding: 15,
		fontSize: 16,
		backgroundColor: '#F6F6F6',
		borderWidth: 1,
		borderColor: '#E8E8E8',
		borderStyle: 'solid',
		borderRadius: 8,
		position: 'relative',
		fontWeight: '400',
	},
	active: {
		backgroundColor: '#FFFFFF',
		borderColor: '#FF6C00',
		color: '#212121',
	},
	showPassText: {
		fontFamily: 'Roboto',
		fontSize: 16,
		color: '#1B4371',
	},
	passwordInputBtn: {
		height: 50,
		width: 100,
		position: 'absolute',
		top: 16,
		right: 0,
		textAlign: 'center',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	btn: {
		backgroundColor: '#FF6C00',
		borderRadius: 100,
		paddingVertical: 16,
		paddingHorizontal: 32,
		marginTop: 43,
		display: 'flex',
		alignItems: 'center',
	},
	btnText: {
		fontWeight: '400',
		fontSize: 16,
		lineHeight: 19,
		color: '#FFFFFF',
	},

	bottomText: {
		paddingTop: 16,
		color: '#1B4371',
		fontStyle: 'normal',
		fontWeight: '400',
		fontSize: 16,
		lineHeight: 19,
		textAlign: 'center',
		fontFamily: 'Roboto',
	},
	underlinedText: {
		textDecorationLine: 'underline',
	},
});
