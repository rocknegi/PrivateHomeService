import React, { Component } from 'react'
import { Text, View, Dimensions, PermissionsAndroid, Platform } from 'react-native'
import Layout from '../theme/Layout'
import MapView from 'react-native-maps'
import Geolocation from '@react-native-community/geolocation';
import { Marker } from 'react-native-maps';

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

export default class Map extends Component {
    state = {
        region: {
            latitude: 28.701624,
            longitude: 77.108458,
            latitudeDelta: 0.0012,
            longitudeDelta: 0.0021,
        },
        marker:{
            latitude: 28.701624,
            longitude: 77.108458,
        }
    }
    componentDidMount() {
        if (Platform.OS !== 'ios')
            this.requestStoragePermission()
        else
            Geolocation.getCurrentPosition(position => {
                // this.setState({latitude:position.coords.latitude,longitude:position.coords.longitude})
            });
    }
    requestStoragePermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: 'Private home services needs Location Permission',
                    message:
                        'Private home services needs Location Permission',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                Geolocation.getCurrentPosition(info => console.log(info));
            } else {
                Alert('');
            }
        } catch (err) {
            console.log(err);
        }
    }
    render() {
        return (
            <Layout>
                <MapView 
                style={{width,height}}
                initialRegion= {this.state.region}>
                    <Marker draggable
                        coordinate={this.state.marker}
                        onDragEnd={(e) => alert(JSON.stringify(e.nativeEvent.coordinate))}
                    />
                </MapView>
            </Layout>
        )
    }
}
// this.setState({ marker: e.nativeEvent.coordinate })