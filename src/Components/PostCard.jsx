import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

const PostCard = ({
	description,
	place,
	location,
	photo,
	postId,
	commentsLength,
}) => {
	const navigation = useNavigation();

	//   видалення поста з профілю
	const deletePost = async postId => {
		await deleteDoc(doc(db, 'posts', postId));
	};

	return (
		<TouchableOpacity style={styles.container} disabled={true}>
			<View>
				<TouchableOpacity
					style={styles.deletePostBtn}
					onPress={() => deletePost(postId)}
				>
					<MaterialIcons name="close" size={26} color="#212121" />
				</TouchableOpacity>
				<Image src={photo} style={styles.photo} />
				<Text style={styles.title}>{description}</Text>
			</View>

			<View style={styles.bottomContainer}>
				<View style={styles.leftSideIcons}>
					<TouchableOpacity
						style={styles.barLeft}
						onPress={() =>
							navigation.navigate('Comments', {
								postId: postId,
								photo: photo,
							})
						}
					>
						<Feather
							name="message-circle"
							size={24}
							style={{
								...styles.messageIcon,
								color: commentsLength ? '#FF6C00' : '#BDBDBD',
							}}
						/>
						<Text style={styles.barLeftText}>{commentsLength || 0}</Text>
					</TouchableOpacity>
					<View style={styles.barLeft}>
						<Feather name="thumbs-up" size={24} style={styles.thumbUpIcon} />
						<Text style={styles.barLeftText}>0</Text>
					</View>
				</View>

				<TouchableOpacity
					style={styles.barRight}
					onPress={() => navigation.navigate('Map', { location: location })}
				>
					<Feather name="map-pin" size={24} style={styles.pinIcon} />
					<Text style={styles.barRightText}>{place}</Text>
				</TouchableOpacity>
			</View>
		</TouchableOpacity>
	);
};

export default PostCard;

const styles = StyleSheet.create({
	container: {
		width: '100%',
	},

	photo: {
		borderRadius: 8,
		width: '100%',
		height: 240,
	},
	deletePostBtn: {
		position: 'absolute',
		top: 10,
		right: 10,
		zIndex: 10,
		justifyContent: 'center',
		alignItems: 'center',
		width: 30,
		height: 30,
		backgroundColor: '#fff',
		borderRadius: 50,
		opacity: 0.3,
	},
	title: {
		marginTop: 8,
		fontWeight: '500',
		fontSize: 16,
		lineHeight: 19,
		color: '#212121',
	},
	leftSideIcons: {
		disply: 'flex',
		flexDirection: 'row',
		gap: 24,
	},

	bottomContainer: {
		marginTop: 8,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	barLeft: {
		flexDirection: 'row',
		alignItems: 'flex-end',
	},
	barLeftText: {
		color: '#BDBDBD',
		fontFamily: 'Roboto',
		fontWeight: '400',
		fontSize: 16,
		lineHeight: 19,
	},
	barRight: {
		flexDirection: 'row',
		alignItems: 'flex-end',
	},
	barRightText: {
		color: '#212121',
		fontFamily: 'Roboto',
		fontWeight: '400',
		fontSize: 16,
		lineHeight: 19,
		textDecorationLine: 'underline',
	},
	messageIcon: {
		marginRight: 4,
		transform: [{ rotateY: '-180deg' }],
	},
	thumbUpIcon: {
		marginRight: 6,
		color: '#BDBDBD',
	},
	pinIcon: {
		marginRight: 6,
		color: '#BDBDBD',
	},
});
