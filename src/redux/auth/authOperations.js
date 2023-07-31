import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	updateProfile,
	onAuthStateChanged,
	signOut,
} from 'firebase/auth';
import { Alert } from 'react-native';
import { auth } from '../../firebase/config';
import { authSlice } from './authSlice';
const { updateUserProfile, authStateChange, authSignOut } = authSlice.actions;

export const authSignUpUser =
	({ name, email, password, avatar }) =>
	async dispatch => {
		try {
			await createUserWithEmailAndPassword(auth, email, password);

			await updateProfile(auth.currentUser, {
				displayName: name,
				photoURL: avatar,
			});

			const { uid, displayName, photoURL } = await auth.currentUser;
			console.log(auth);
			console.log(auth.currentUser);
			dispatch(
				updateUserProfile({
					userId: uid,
					name: displayName,
					email,
					avatar: photoURL,
				}),
			);
			Alert.alert(`Welcome to app "${displayName}"`);
		} catch (error) {
			Alert.alert(error.message);
			console.log('error.message', error.message);
		}
	};
