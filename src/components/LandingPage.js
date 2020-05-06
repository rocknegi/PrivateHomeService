import React from 'react'
import { View, Text, StyleSheet, Animated, Dimensions,SafeAreaView } from 'react-native'
import { TouchableOpacity, } from 'react-native-gesture-handler'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import Layout from './theme/Layout'
import { PrimayColor } from './theme/Colors';

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
               <SafeAreaView style={{backgroundColor:'#fd9a50',flex:1}}>
               {/* <Text style={styles.heading}>Private Home Service</Text> */}
                <View style={styles.container}>
                    <View style={{ flex: 1 }}>
                        <ImageLoader
                            source={require('../assets/images/logo_white.png')}
                            style={styles.images}
                        />
                    <Text style={{ fontSize: 18, textAlign: 'center',transform: [{ rotate: '-5deg'}] }}>
                    Vos besoins sont nos Services
                    </Text>
                    </View>
                </View>


                {/* <View style={{ flex: 0.5 }}>
                    <Text style={{ fontSize: 50, textAlign: 'center' }}>
                        VIDEO
                </Text>
                </View> */}
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Login')}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>Get Started</Text>
                    </TouchableOpacity>
                </View>
               </SafeAreaView>
        )
    }
}

export default landingPage
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent:'center',
        alignItems:'center'
    },
    heading: {
        textAlign: 'center',
        fontSize: 40,
        top: 10
    },
    images: {
        resizeMode: 'contain',
        height: Dimensions.get('window').width/1.8,
        width: Dimensions.get('window').width/1.8,
        paddingLeft: 0,
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