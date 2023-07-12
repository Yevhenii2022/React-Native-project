import {
	View,
	StyleSheet,
	ImageBackground,
	SafeAreaView,
	ScrollView,
	Text,
	TouchableOpacity,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import image from '../../assets/photo_BG2x.png';
import UserPhoto from '../Components/UserPhoto';
import StoryCard from '../Components/StoryCard';

const ProfileScreen = () => {
	return (
		<SafeAreaView>
			<ImageBackground source={image} style={styles.image} />
			<View>
				<ScrollView>
					<View style={styles.view}>
						<View>
							<View style={styles.viewUserPhoto}>
								<UserPhoto />
							</View>
							<ExitBtn />
							<Text style={styles.Name}>Natali Romanova</Text>
						</View>
						<StoryCard />
						<StoryCard />
						<StoryCard />
						<StoryCard />
					</View>
				</ScrollView>
			</View>
		</SafeAreaView>
	);
};

function ExitBtn() {
	const navigation = useNavigation();
	return (
		<TouchableOpacity>
			<Feather
				name="log-out"
				size={24}
				style={styles.exitBtn}
				onPress={() => navigation.navigate('Login')}
			/>
		</TouchableOpacity>
	);
}

export default ProfileScreen;

const styles = StyleSheet.create({
	image: {
		resizeMode: 'cover',
		height: 900,
		flex: 1,
	},
	Name: {
		fontFamily: 'Roboto',
		fontWeight: 500,
		fontSize: 30,
		lineHeight: 35,
		textAlign: 'center',
		letterSpacing: 0.01,
		color: '#212121',
		marginTop: -32,
	},
	view: {
		marginTop: 163,
		minHeight: 450,
		backgroundColor: '#ffffff',
		borderColor: '#ffffff',
		borderWidth: 5,
		borderTopLeftRadius: 25,
		borderTopRightRadius: 25,
		paddingTop: 0,
		paddingLeft: 16,
		paddingRight: 16,
		paddingBottom: 43,
		gap: 32,
	},
	viewUserPhoto: { alignItems: 'center' },
	exitBtn: {
		position: 'absolute',
		right: 0,
		top: -100,
		color: '#BDBDBD',
	},
});
