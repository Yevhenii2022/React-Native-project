import React, { useState, useEffect } from 'react';
import {
	View,
	StyleSheet,
	Dimensions,
	TouchableOpacity,
	Text,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { MaterialIcons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';

const MapScreen = data => {
	const [mapType, setMapStyle] = useState('standard');

	// const { params } = data.route;
	// console.log(data);
	console.log(data);
	const params = useRoute();
	console.log(params);

	return (
		<View style={styles.container}>
			<MapView
				style={styles.mapStyle}
				region={{
					latitude: 44.5934276,
					longitude: 33.5519664,
					latitudeDelta: 0.04,
					longitudeDelta: 0.05,
				}}
				showsUserLocation={true}
				mapType={mapType}
				provider="google"
				minZoomLevel={1}
				onMapReady={() => console.log('Map is ready')}
				onRegionChange={() => console.log('Region change')}
			>
				<Marker
					title="I am here"
					coordinate={{ latitude: 44.5934276, longitude: 33.5519664 }}
					description="Hello"
				/>
			</MapView>
			<TouchableOpacity
				style={styles.mapType}
				onPress={() =>
					setMapStyle(prev => (prev === 'hybrid' ? 'standard' : 'hybrid'))
				}
			>
				<Text style={styles.mapTypeText}>CHANGE MAP TYPE</Text>
				<MaterialIcons name="satellite" size={35} style={styles.mapIcon} />
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	mapStyle: {
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').height,
		flex: 1,
	},
	mapType: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 10,
		paddingVertical: 12,
		justifyContent: 'flex-start',
	},
	mapTypeText: {
		textDecorationLine: 'underline',
	},
	mapIcon: {
		color: '#BDBDBD',
	},
});

export default MapScreen;
