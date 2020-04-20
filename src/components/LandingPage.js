import React from 'react'
import { View, Text, StyleSheet, Animated } from 'react-native'
import { TouchableOpacity, } from 'react-native-gesture-handler'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import Layout from './theme/Layout'

class ImageLoader extends React.Component {
    state = {
        opacity: new Animated.Value(0)
    }
    onLoad = () => {
        Animated.timing(this.state.opacity, {
            toValue: 1,
            duration: 1200,
            useNativeDriver: true
        }).start()
    }



    render() {
        return (
            <Animated.Image
                onLoad={this.onLoad}
                {...this.props}
                style={[
                    {
                        opacity: this.state.opacity,
                        transform: [
                            {
                                scale: this.state.opacity.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0.85, 1],
                                })
                            }
                        ]
                    },
                    this.props.style
                ]}
            />
        )
    }

}

class landingPage extends React.Component {
    static navigationOptions = () => {
        return {
            headerShown: false
        }
    }

    render() {
        const { navigation } = this.props
        return (
            <Layout>
                <Text style={styles.heading}>Private Home Service</Text>
                <View style={styles.container}>
                    <View style={{ flex: 1 }}>
                        <ImageLoader
                            source={require('../assets/images/Baileys.jpg')}
                            style={styles.images}
                        />
                    </View>
                    <View style={{ flex: 1 }}>
                        <ImageLoader
                            source={require('../assets/images/ChivasRegal.jpg')} style={styles.images}
                        />
                    </View>
                    <View style={{ flex: 1 }}>
                        <ImageLoader
                            source={require('../assets/images/RuinArt.jpg')} style={styles.images}
                        />
                    </View>
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 50, textAlign: 'center' }}>
                        VIDEO
                </Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Login')}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>Get Started</Text>
                    </TouchableOpacity>
                </View>
            </Layout>
        )
    }
}

export default landingPage
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        padding: 10,
    },
    heading: {
        textAlign: 'center',
        fontSize: 40,
        top: 10
    },
    images: {
        resizeMode: 'contain',
        height: 160,
        width: 180,
        padding: 5,
        top: 50,
        alignSelf: 'center'
    },
    button: {
        paddingVertical: 10,
        marginHorizontal: 10,
    },
    buttonText: {
        fontSize: 22,
        textAlign: 'center',
        padding: 10,
        elevation: 10,
        textDecorationLine: 'underline',

    },
})