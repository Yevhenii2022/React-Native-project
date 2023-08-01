import { useState, useEffect } from 'react';
import {
	View,
	StyleSheet,
	ImageBackground,
	SafeAreaView,
	ScrollView,
	Text,
	TouchableOpacity,
} from 'react-native';
import { collection, where, query, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { authSignOutUser } from '../redux/auth/authOperations';
import image from '../../assets/photo_BG2x.png';
import UserPhoto from '../Components/UserPhoto';
import PostCard from '../Components/PostCard';
import { selectUserData } from '../redux/auth/selectors';

const ProfileScreen = () => {
	const navigation = useNavigation();
	const { userId, name } = useSelector(selectUserData);
	const [posts, setPosts] = useState([]);
	// const dispatch = useDispatch();

	//   відмальовує всі пости на сторінці
	useEffect(() => {
		getUserPost();
	}, []);

	//   шукаємо всі пости одного юзера по userId
	const getUserPost = async () => {
		const postRef = collection(db, 'posts');
		const q = query(postRef, where('userId', '==', userId));
		onSnapshot(q, docSnap =>
			setPosts(docSnap.docs.map(doc => ({ ...doc.data(), id: doc.id }))),
		);
	};

	return (
		<SafeAreaView>
			<ImageBackground source={image} style={styles.image} />

			<ScrollView showsVerticalScrollIndicator={false}>
				<View style={styles.view}>
					<View>
						<View style={styles.viewUserPhoto}>
							<UserPhoto />
						</View>
						<ExitBtn />
						<Text style={styles.Name}>{name}</Text>
					</View>

					{posts.length === 0 && (
						<View style={{ flex: 1, marginTop: 10, paddingHorizontal: 20 }}>
							<Text style={{ textAlign: 'center' }}>
								Зараз у тебе немає публікацій, але ти можеш їх створити - тисни
								на цю кнопку
							</Text>

							<TouchableOpacity
								style={styles.buttonCapture}
								onPress={() => navigation.navigate('Create')}
							>
								<MaterialIcons name="add" size={24} color={'#FFFFFF'} />
							</TouchableOpacity>
						</View>
					)}

					{posts.map(item => (
						<PostCard
							key={item.id}
							description={item.description}
							place={item.place}
							location={item.location}
							photo={item.photo.uri}
							postId={item.id}
							commentsLength={item.comments}
						/>
					))}
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

function ExitBtn() {
	const dispatch = useDispatch();

	const signOut = () => {
		dispatch(authSignOutUser());
	};

	return (
		<TouchableOpacity>
			<Feather
				name="log-out"
				size={24}
				style={styles.exitBtn}
				onPress={signOut}
			/>
		</TouchableOpacity>
	);
}

export default ProfileScreen;

const styles = StyleSheet.create({
	image: {
		resizeMode: 'cover',
		height: 750,
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
		minHeight: 570,
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
	buttonCapture: {
		marginTop: 30,
		height: 60,
		width: 60,
		alignItems: 'center',
		justifyContent: 'center',
		alignSelf: 'center',
		borderRadius: 50,
		backgroundColor: '#FF6C00',
	},
	viewUserPhoto: { alignItems: 'center' },
	exitBtn: {
		position: 'absolute',
		right: 0,
		top: -100,
		color: '#BDBDBD',
	},
});
