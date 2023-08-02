import { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/config';
import UserTab from '../Components/UserTab';
import PostCard from '../Components/PostCard';

const PostsScreen = () => {
	const [posts, setPosts] = useState([]);
	console.log(posts);

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
			{posts.length === 0 && <UserTab />}
			<FlatList
				data={posts}
				keyExtractor={posts.id}
				renderItem={({ item }) => (
					<>
						<View style={{ marginTop: 20, marginBottom: 10 }}>
							<UserTab />
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
		// flex: 1,
		// alignItems: 'flex-start',
		paddingHorizontal: 16,
		// marginBottomBottom: 12,
		// gap: 16,
		backgroundColor: '#FFFFFF',
	},
});
