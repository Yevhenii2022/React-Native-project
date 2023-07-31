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

			dispatch(
				updateUserProfile({
					userId: uid,
					name: displayName,
					email,
					avatar: photoURL,
					isCurrentUser: true,
				}),
			);
			Alert.alert(`Welcome to app "${displayName}"`);
		} catch (error) {
			Alert.alert(error.message);
			console.log('error.message', error.message);
		}
	};

export const authSignInUser =
	({ email, password }) =>
	async dispatch => {
		try {
			const { user } = await signInWithEmailAndPassword(auth, email, password);

			const { displayName, photoURL, uid } = user;

			dispatch(
				updateUserProfile({
					userId: uid,
					name: displayName,
					email,
					avatar: photoURL,
					isCurrentUser: true,
				}),
			);

			Alert.alert(`Welcome to app "${displayName}"`);
		} catch (error) {
			Alert.alert(error.message);
			console.log('error.message', error.message);
		}
	};

export const authSignOutUser = () => async dispatch => {
	try {
		await signOut(auth);
		dispatch(authSignOut());
		Alert.alert(`Sign-out successful`);
	} catch (error) {
		Alert.alert(error.message);
		console.log('error', error.message);
	}
};

export const authStateChangeUser = () => async dispatch => {
	onAuthStateChanged(auth, user => {
		if (user) {
			const { uid, displayName, email, photoURL } = user;
			dispatch(
				updateUserProfile({
					userId: uid,
					name: displayName,
					email: email,
					avatar: photoURL,
					isCurrentUser: true,
				}),
			);
			dispatch(authStateChange({ stateChange: true }));
		}
	});
};
