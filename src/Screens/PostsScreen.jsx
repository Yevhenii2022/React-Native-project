import { useEffect, useState } from 'react';
import {
	View,
	StyleSheet,
	FlatList,
	TouchableOpacity,
	Image,
	Text,
} from 'react-native';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/config';
import UserTab from '../Components/UserTab';
import PostCard from '../Components/PostCard';

const PostsScreen = () => {
	const [posts, setPosts] = useState([]);

	//get запрос на firebase всіх постів
	const getAllPosts = async () => {
		const dbRef = collection(db, 'posts');
		onSnapshot(dbRef, docSnap =>
			setPosts(docSnap.docs.map(doc => ({ ...doc.data(), id: doc.id }))),
		);
	};

	//відмальовуваємо всі пости на сторінці
	useEffect(() => {
		getAllPosts();
	}, []);

	return (
		<View style={styles.container}>
			{posts.length === 0 && (
				<View style={styles.userTabContainer}>
					<UserTab />
				</View>
			)}
			<FlatList
				data={posts}
				keyExtractor={posts.id}
				renderItem={({ item }) => (
					<>
						<View style={{ marginTop: 18, marginBottom: 8 }}>
							<TouchableOpacity style={styles.wrapper} disabled={true}>
								<Image
									src={
										item.avatar
											? item.avatar
											: 'https://firebasestorage.googleapis.com/v0/b/first-react-native-proje-98226.appspot.com/o/userAvatars%2FDefault_pfp.svg.png?alt=media&token=7cafd3a4-f9a4-40f2-9115-9067f5a15f57'
									}
									style={styles.photo}
								/>
								<View>
									<Text style={styles.title}>{item.name}</Text>
								</View>
							</TouchableOpacity>
						</View>
						<View style={{ marginBottom: 10 }}>
							<PostCard
								key={item.id}
								description={item.description}
								place={item.place}
								location={item.location}
								photo={item.photo.uri}
								postId={item.id}
								commentsLength={item.comments}
							/>
						</View>
					</>
				)}
				showsVerticalScrollIndicator={false}
			></FlatList>
		</View>
	);
};

export default PostsScreen;

const styles = StyleSheet.create({
	container: {
		width: '100%',
		height: '100%',
		paddingHorizontal: 16,
		backgroundColor: '#FFFFFF',
	},
	userTabContainer: {
		marginTop: 32,
	},

	wrapper: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
	},
	photo: {
		width: 50,
		height: 50,
		borderRadius: 50,
	},
	title: {
		color: '#212121',
		fontFamily: 'Roboto',
		fontWeight: '700',
		fontSize: 13,
		lineHeight: 15,
	},
});
