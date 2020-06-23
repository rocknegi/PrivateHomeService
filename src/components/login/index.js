import React, { Component } from 'react'
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Image, TouchableWithoutFeedback, Keyboard, FlatList, ColorPropType, KeyboardAvoidingView, Dimensions, Platform, SafeAreaView } from 'react-native'
import { PrimayColor, TextColorWhite } from '../theme/Colors';
import images from '../../assets/images';
import LinearGradient from 'react-native-linear-gradient';
import { LoginButton, AccessToken } from 'react-native-fbsdk';

export default class index extends Component {
    state = {
        isModalVisible: false,
        dialingCode: '+237'
    }
    toggleModal = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
    };
    setDialCode = (dialingCode) => {
        this.setState({ dialingCode })
        this.toggleModal()
    }
    static navigationOptions = () => {
        return {
            headerShown: false
        }
    }
    render() {
        return (
            <SafeAreaView style={styles.container}>

                <Image
                    style={styles.logo}
                    source={images.logoBlack}
                />
                <Text style={{ fontSize: Platform.OS === 'android' ? 25 : 16, fontFamily: Platform.OS === 'android' ? 'HT Gelateria W01 Regular' : 'ComicSansMS', textAlign: 'center', marginBottom: 10 }}>
                    Vos besoins sont nos Services
                    </Text>
                <Text style={{ fontStyle: 'italic', fontWeight: 'bold', fontSize: Platform.OS === 'android' ? 20 : 16, fontFamily: Platform.OS === 'android' ? 'HT Gelateria W01 Regular' : 'ComicSansMS', textAlign: 'center', marginBottom: 10 }}>
                    Wel<Text style={{ fontStyle: 'italic', color: PrimayColor, fontWeight: 'bold', fontSize: Platform.OS === 'android' ? 20 : 16, fontFamily: Platform.OS === 'android' ? 'HT Gelateria W01 Regular' : 'ComicSansMS', textAlign: 'center', marginBottom: 10 }}>
                        come
                    </Text>
                </Text>

                {/* <DialingCodePicker
                    isModalVisible={this.state.isModalVisible}
                    setDialCode={(dialingCode) => this.setDialCode(dialingCode)}
                    toggleModal={this.toggleModal}
                /> */}
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={{ flex: 1 }}>
                        <View style={styles.field}>
                            {/* <Icon name="phone"
                        style={styles.icon} /> */}
                            <TextInput style={{ marginLeft: 5 }}>{`${this.state.dialingCode}`}</TextInput>
                            <TextInput
                                placeholder="Telefon no is Obligatory"
                                style={[styles.input]}
                                keyboardType={'number-pad'}
                            />
                        </View>
                        {/* <View style={styles.field}>
                    <Icon name="key"
                        style={styles.icon} />
                    <TextInput
                        placeholder="enter your password"
                        secureTextEntry={true}
                        style={styles.input}
                    />
                </View> */}
                        {/* 
                <Text onPress={() => this.props.navigation.navigate('Reset')}
                    style={{ right: "-70%", fontSize: 12 }}>
                    Forgot Password?
                     </Text> */}
                      <LoginButton
          onLoginFinished={
            (error, result) => {
              if (error) {
                console.log("login has error: " + result.error);
              } else if (result.isCancelled) {
                console.log("login is cancelled.");
              } else {
                AccessToken.getCurrentAccessToken().then(
                  (data) => {
                    console.log(data.accessToken.toString())
                  }
                )
              }
            }
          }
          onLogoutFinished={() => console.log("logout.")}/>
                        <TouchableOpacity style={[styles.buttonContainer, { backgroundColor: '#4267b1' }]} onPress={() => this.props.navigation.navigate('Home')}>
                            <Text style={styles.buttonText}>Login with Facebook</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonContainer} onPress={() => this.props.navigation.navigate('Home')}>
                            <Text style={styles.buttonText}>Continue as Guest</Text>
                        </TouchableOpacity>

                        {/* <View style={styles.signup}>
                    <TouchableOpacity style={{ width: "100%" }} onPress={() => this.props.navigation.navigate('Register')}>
                        <Text style={{fontSize: 15,color: '#000' }}>
                            Don't have an account ?  <Text style={{fontSize: 15,color:TextColorWhite}}>Sign Up</Text>
                        </Text>
                    </TouchableOpacity>
                </View> */}
                        <View style={{ flex: 1,justifyContent:'flex-end' }}>
                            <LinearGradient colors={['#F1E1D4', '#F47211', '#F47211', '#f4b788', '#F1E1D4']} style={{ height: 1, marginHorizontal: '15%' }}></LinearGradient>
                            <View style={{ justifyContent: 'space-evenly', flexDirection: 'row', alignItems: 'flex-end', paddingBottom: 10 }}>

                                <Image
                                    style={{ height: 100, width: Dimensions.get('screen').width / 4, resizeMode: 'contain' }}
                                    source={images.seesha}
                                />
                                <Image
                                    style={{ height: 100, width: Dimensions.get('screen').width / 4, resizeMode: 'contain' }}
                                    source={images.champagne}
                                />
                                <Image
                                    style={{ height: 140, width: Dimensions.get('screen').width / 3.5, resizeMode: 'contain', top: '5%' }}
                                    source={images.ludo}
                                />
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>

            </SafeAreaView>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        backgroundColor: '#fafafa'
    },
    logo: {
        resizeMode: 'contain',
        alignSelf: 'center',
        height: 150,
        width: 150,
        // marginBottom: 5
    },
    field: {
        flexDirection: 'row',
        borderWidth: 1,
        borderRadius: 100,
        alignItems: "center",
        backgroundColor: '#fafafa',
        marginBottom: 20,
        marginTop: 10,
        marginHorizontal: '18%',
        borderColor: PrimayColor
    },
    icon: {
        color: '#999999', paddingLeft: 10, fontSize: 20
    },
    input: {
        height: 50,
        color: '#757575',
        paddingHorizontal: 10,
        width: '100%'
    },
    buttonContainer: {
        backgroundColor: PrimayColor,
        borderRadius: 100,
        marginHorizontal: '18%',
        height: 50,
        justifyContent: 'center',
        marginBottom: 20
    },
    buttonText: {
        textAlign: 'center',
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    signup: {
        flex: 1,
        justifyContent: 'flex-end',
        alignSelf: 'center',
        paddingBottom: 10
    },
    modal: {
        flexDirection: 'row', justifyContent: 'space-between'
    },
    modalText: {
        fontSize: 22,
        flexWrap: 'wrap',
        textAlign: 'center'
    }
})