import React, { Component } from 'react'
import { Text, StyleSheet, Dimensions, PermissionsAndroid, Platform, TouchableOpacity, View, Alert, Linking } from 'react-native'
import Layout from '../theme/Layout'
import MapView from 'react-native-maps'
import Geolocation from '@react-native-community/geolocation';
import { Marker } from 'react-native-maps';
import { PrimayColor } from '../theme/Colors';
import haversine from 'haversine';
import { connect } from 'react-redux';

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

class Map extends Component {
    state = {
        region: {
            latitude: 0,
            longitude: 0,
            latitudeDelta: 1,
            longitudeDelta: 1,
        },
        marker: {
            latitude: 0,
            longitude: 0,
        },
        lat: 4.087386,
        long: 9.736632
    }

    setMarkerLocation = (location) => {
        this.setState({
            marker: {
                latitude: location.latitude,
                longitude: location.longitude
            }
        })
    }
    componentDidMount() {
        if (Platform.OS === 'android')
            this.requestStoragePermission()
        else
            Geolocation.getCurrentPosition(position => {
                this.setState({
                    region: {
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421, latitude: position.coords.latitude, longitude: position.coords.longitude
                    }, marker: {
                        latitude: position.coords.latitude, longitude: position.coords.longitude
                    }
                })
                const start = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                }

                const end = {
                    latitude: this.state.lat,
                    longitude: this.state.long
                }

                const distance = haversine(start, end, { unit: 'km' })
                if (distance > 20) {
                    Alert.alert('No Service available in this area')
                    this.props.validLocation(false)
                }
                else {
                    this.props.validLocation(true)
                }
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
                Geolocation.getCurrentPosition(position => {
                    this.setState({
                        region: {
                            latitudeDelta: 0.003,
                            longitudeDelta: 0.003,
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude
                        }, marker: {
                            latitude: position.coords.latitude, longitude: position.coords.longitude
                        }
                    });
                    console.log(position.coords.latitude, position.coords.longitude)
                    const start = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    }

                    const end = {
                        latitude: this.state.lat,
                        longitude: this.state.long
                    }

                    const distance = haversine(start, end, { unit: 'km' })
                    console.log(distance)
                    if (distance > 20) {
                        Alert.alert('No Service available in this area')
                        this.props.validLocation(false)
                    }
                    else {
                        this.props.validLocation(true)
                    }
                });
            } else {
                Alert('Please grant location permission');
            }
        } catch (err) {
            alert(err);
        }
    }

    confirmLocation = () => {
        this.props.saveMarkerLocation(this.state.marker)
        this.props.toggle()
    }

    render() {
        return (
            <Layout>
                <MapView
                    style={{ height }}
                    region={this.state.region}>
                    <Marker draggable
                        coordinate={this.state.marker}
                        onDragEnd={(e) => this.setMarkerLocation(e.nativeEvent.coordinate)}
                    />
                </MapView>
                <View style={{
                    position: 'absolute',
                    top: 0,
                    backgroundColor: '#eee',
                    alignItems: 'center',
                    padding: 5,
                    alignSelf: 'center'
                }}>
                    <Text
                        style={{ fontSize: 13, textAlign: 'center', color: '#000' }}
                    >{this.props.language.locationContact}
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText} onPress={this.confirmLocation}>{this.props.language.locationConfirm}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}
                            onPress={() => Platform.OS === 'android' ? Linking.openURL('tel:+237698111713') : Linking.openURL('tel:+237655427928')}
                        >{this.props.language.contactUs}</Text>
                    </TouchableOpacity>
                </View>
            </Layout>
        )
    }
}
const mapStateToProps = state => {
    return {
        language: state.language
    }
}


export default connect(mapStateToProps, null)(Map)
const styles = StyleSheet.create({
    button: {
        // position: 'absolute',
        backgroundColor: PrimayColor,
        borderRadius: 6,
        height: 50,
        justifyContent: 'center',
        padding: 8,
        bottom: '20%',
        margin: 10,
        width: '40%'
    },
    buttonText: {
        textAlign: 'center',
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 15,
    },
})
// this.setState({ marker: e.nativeEvent.coordinate })