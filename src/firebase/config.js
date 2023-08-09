import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth, initializeAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

import {
	API_KEY,
	AUTH_DOMAIN,
	PROJECT_ID,
	STORAGE_BUCKET,
	MESSAGING_SENDER_ID,
	APP_ID,
	MEASUREMENT_ID,
} from '@env';

// API_KEY = 'AIzaSyAmqIKCzTNuocftlZLlsMKN7ntNUvF8n58';
// AUTH_DOMAIN = 'react-native-project-20ba6.firebaseapp.com';
// PROJECT_ID = 'react-native-project-20ba6';
// STORAGE_BUCKET = 'react-native-project-20ba6.appspot.com';
// MESSAGING_SENDER_ID = '790050927949';
// APP_ID = '1:790050927949:web:9da5392215ff1b5c5cf304';
// MEASUREMENT_ID = 'G-HCPX2L1LZH';
// react-native-project-20ba6

const firebaseConfig = {
	apiKey: API_KEY,
	authDomain: AUTH_DOMAIN,
	projectId: PROJECT_ID,
	storageBucket: STORAGE_BUCKET,
	messagingSenderId: MESSAGING_SENDER_ID,
	appId: APP_ID,
	measurementId: MEASUREMENT_ID,
};

let app;
let auth;
if (getApps().length < 1) {
	app = initializeApp(firebaseConfig);
	auth = initializeAuth(app);
} else {
	app = getApp();
	auth = getAuth();
}
export { app, auth };
export const db = getFirestore(app);
