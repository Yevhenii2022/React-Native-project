import { useState } from 'react';
import {
	Image,
	View,
	Text,
	StyleSheet,
	TextInput,
	TouchableOpacity,
	TouchableWithoutFeedback,
	Keyboard,
	ImageBackground,
	FlatList,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import photo from '../../assets/userPhoto.png';

const commentItem = {
	id: '1',
	comment: 'Really cool photo of nature.',
	date: '09 червня, 2020',
	time: '08:40',
};

const commentItem2 = {
	name: 'Anna',
	comment: 'Really cool photo of nature.',
	date: '09 червня, 2020',
	time: '08:40',
};

const CommentsScreen = () => {
	const [comment, setComment] = useState('');
	const [allComments, setAllComments] = useState([
		commentItem,
		commentItem2,
		commentItem,
	]);

	const createComment = () => {
		// setComment('');
	};

	const renderItem = ({ item }) => {
		const currentUser = item.id;

		return (
			<View
				style={{
					marginTop: 32,
					flexDirection: currentUser ? 'row' : 'row-reverse',
				}}
			>
				<Image
					source={photo}
					style={{
						...styles.avatarIcon,
						marginLeft: currentUser ? 0 : 15,
					}}
				/>
				<View style={styles.comment}>
					<Text
						style={{
							...styles.commentAuthor,
							textAlign: currentUser ? 'left' : 'right',
						}}
					>
						{currentUser ? 'You' : item.name}
					</Text>
					<Text
						style={{
							...styles.commentMessage,
							textAlign: currentUser ? 'left' : 'right',
						}}
					>
						{item.comment}
					</Text>
					<Text
						style={{
							...styles.commentDate,
							textAlign: currentUser ? 'left' : 'right',
						}}
					>
						{item.date} | {item.time}
					</Text>
				</View>
			</View>
		);
	};

	return (
		<View style={{ flex: 1 }}>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<View style={styles.container}>
					<FlatList
						ListHeaderComponent={
							<ImageBackground
								source={require('../../assets/UserRect1.png')}
								style={styles.imageBackground}
							/>
						}
						data={allComments}
						keyExtractor={allComments.id}
						renderItem={renderItem}
						showsVerticalScrollIndicator={false}
					/>
					<View>
						<TextInput
							value={comment}
							onChangeText={setComment}
							placeholder="Коментувати..."
							style={{
								...styles.submitBtn,
								fontFamily: 'Roboto',
							}}
						/>

						<TouchableOpacity
							style={styles.addCommentBtn}
							activeOpacity={0.7}
							onPress={createComment}
						>
							<AntDesign name="arrowup" size={24} color="#FFFFFF" />
						</TouchableOpacity>
					</View>
				</View>
			</TouchableWithoutFeedback>
		</View>
	);
};

export default CommentsScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'space-between',
		paddingHorizontal: 16,
		paddingTop: 32,
		paddingBottom: 16,
	},
	imageBackground: {
		height: 240,
		borderRadius: 8,
		paddingRight: 10,
		overflow: 'hidden',
	},
	avatarIcon: {
		height: 40,
		width: 40,
		borderRadius: 40,
	},
	comment: {
		marginLeft: 16,
		padding: 14,
		width: 272,
		borderRadius: 6,
		backgroundColor: 'rgba(0, 0, 0, 0.03)',
	},
	commentMessage: {
		marginBottom: 5,
		fontFamily: 'Roboto',
		fontSize: 14,
		color: '#212121',
	},
	commentDate: {
		fontFamily: 'Roboto',
		fontSize: 10,
		color: '#BDBDBD',
	},
	submitBtn: {
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 16,
		padding: 16,
		height: 50,
		borderWidth: 1,
		borderRadius: 100,
		borderColor: 'rgba(189, 189, 189, 1)',
		backgroundColor: '#E8E8E8',
	},
	addCommentBtn: {
		position: 'absolute',
		right: 6,
		bottom: 5,
		justifyContent: 'center',
		alignItems: 'center',
		width: 40,
		height: 40,
		backgroundColor: '#FF6C00',
		borderRadius: 50,
	},
	commentAuthor: {
		marginBottom: 5,
		fontFamily: 'Roboto',
		fontSize: 11,
		color: '#656565',
	},
});
