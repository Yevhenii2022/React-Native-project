import { View, StyleSheet, FlatList } from 'react-native';
import UserTab from '../Components/UserTab';

const PostsScreen = () => {
	return (
		<View style={styles.container}>
			<UserTab />
			<FlatList
			// data={data}
			// renderItem={({ item }) => <Text>{item.title}</Text>}
			// keyExtractor={item => item.id}
			></FlatList>
		</View>
	);
};

export default PostsScreen;

const styles = StyleSheet.create({
	container: {
		width: '100%',
		flex: 1,
		display: 'flex',
		alignItems: 'flex-start',
		paddingHorizontal: 16,
		paddingVertical: 32,
		gap: 16,
		backgroundColor: '#FFFFFF',
	},
});
