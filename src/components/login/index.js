import React, { Component } from 'react'
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Image, TouchableWithoutFeedback, Keyboard, FlatList, ColorPropType, KeyboardAvoidingView, Dimensions, Platform, SafeAreaView, Alert } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import { PrimayColor, TextColorWhite } from '../theme/Colors';
import images from '../../assets/images';
import LinearGradient from 'react-native-linear-gradient';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import firebase from 'react-native-firebase';
import { Picker } from '@react-native-community/picker';
import Feather from 'react-native-vector-icons/Feather';
import { connect } from 'react-redux';
import { getCurrentLanguage } from '../../redux/actions';

class index extends Component {
    state = {
        isModalVisible: false,
        dialingCode: '+237',
        phoneNo: '',
        language: 'EN'
    }

    componentDidMount() {
        this.props.getCurrentLanguage('EN')
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

    _validate = () => {
        if (this.state.phoneNo === '') {
            Alert.alert('Enter your phone number first')
            return false
        }
        else if (this.state.phoneNo.length !== 9) {
            Alert.alert('Phone number must be of 9 digits')
            return false
        }
        else return true
    }

    _guestLogin = () => {
        if (this._validate()) {
            AsyncStorage.setItem('phoneNo', this.state.phoneNo)
            this.props.navigation.navigate('InitialSelectionScreen')

        }
    }
    _showError = (e) => {
        switch (e.code) {
            case 'auth/invalid-email':
                ToastAndroid.show('Invalid email', ToastAndroid.SHORT)
                break;
            case 'auth/user-disabled':
                ToastAndroid.show('Your email is disabled', ToastAndroid.SHORT)
                break;
            case 'auth/user-not-found':
                ToastAndroid.show('User not found', ToastAndroid.SHORT)
                break;
            case 'auth/wrong-password':
                ToastAndroid.show('Wrong password', ToastAndroid.SHORT)
                break;
            default: Alert.alert('he' + e)
        }
    }
    _fbSignIn = async () => {
        if (this._validate()) {
            try {
                const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
                if (result.isCancelled) {
                    Alert.alert('User cancelled the request');
                }
                const data = await AccessToken.getCurrentAccessToken();
                if (!data) {
                    Alert.alert('Something went wrong');
                }

                else {
                    const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
                    const userCredentials = await firebase.auth().signInWithCredential(credential);
                    // console.log(userCredentials.user.displayName)
                    // firebase.firestore().collection('Users').doc(this.state.phoneNo).set({
                    //     username: userCredentials.user.displayName
                    // });
                    AsyncStorage.setItem('username', userCredentials.user.displayName)
                    AsyncStorage.setItem('phoneNo', this.state.phoneNo)
                    this.props.navigation.navigate('InitialSelectionScreen')
                }


            } catch (error) {
                console.log(error)
                this._showError(error);
            }
        }
    }

    changeLanguage = (language) => {
        this.setState({ language })
        this.props.getCurrentLanguage(language)
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
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <TouchableOpacity
                        onPress={() => this.changeLanguage('EN')}
                        style={[styles.buttonContainer, { marginRight: 10, marginHorizontal: 0, width: '30%', backgroundColor: this.state.language === 'EN' ? PrimayColor : '#fafafa', borderRadius: 6, borderColor: '#eee', borderWidth: 1 }]}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                            <Feather name="globe" size={20} />
                            <Text>English</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => this.changeLanguage('FR')}
                        style={[styles.buttonContainer, { marginHorizontal: 0, width: '30%', borderRadius: 6, borderColor: '#eee', borderWidth: 1, backgroundColor: this.state.language === 'FR' ? PrimayColor : '#fafafa' }]}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                            <Feather name="globe" size={20} />
                            <Text>French</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={{ flex: 1 }}>
                        <View style={styles.field}>
                            {/* <Icon name="phone"
                        style={styles.icon} /> */}
                            <Text style={{ marginLeft: 10 }}>{`${this.state.dialingCode}`}</Text>
                            <TextInput
                                placeholder={this.props.language.phonePlaceholder}
                                style={[styles.input]}
                                keyboardType={'number-pad'}
                                onChangeText={(value) => this.setState({ phoneNo: value })}
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

                        <TouchableOpacity
                            style={[styles.buttonContainer, { backgroundColor: '#4267b1' }]}
                            onPress={this._fbSignIn}>
                            <Text style={styles.buttonText}>{this.props.language.fbLogin}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonContainer} onPress={this._guestLogin}>
                            <Text style={styles.buttonText}>{this.props.language.guestLogin}</Text>
                        </TouchableOpacity>

                        {/* <View style={styles.signup}>
                    <TouchableOpacity style={{ width: "100%" }} onPress={() => this.props.navigation.navigate('Register')}>
                        <Text style={{fontSize: 15,color: '#000' }}>
                            Don't have an account ?  <Text style={{fontSize: 15,color:TextColorWhite}}>Sign Up</Text>
                        </Text>
                    </TouchableOpacity>
                </View> */}
                        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
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

const mapStateToProps = (state) => {
    return {
        language: state.language
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getCurrentLanguage: (id) => { dispatch(getCurrentLanguage(id)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(index)
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
        marginHorizontal: '13%',
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
        marginHorizontal: '13%',
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