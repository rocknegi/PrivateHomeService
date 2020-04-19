import React, { Component } from 'react'
import { SafeAreaView, Text, View, KeyboardAvoidingView, StyleSheet, TextInput, TouchableOpacity, Image, TouchableWithoutFeedback, Keyboard, FlatList, ColorPropType } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { PrimayColor } from '../theme/Colors';
import DialingCodePicker from '../DialingCodePicker';

export default class index extends Component {
    state = {
        isModalVisible: false,
        dialingCode: '+237'
    }
    toggleModal = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
    };
    setDialCode = (dialingCode)=>{
        this.setState({dialingCode})
        this.toggleModal()
    }

    render() {
        return (
            <KeyboardAvoidingView
                behavior={Platform.OS == "ios" ? "padding" : "height"}
                style={styles.container}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <SafeAreaView style={styles.container}>
                        <Image
                            style={styles.logo}
                            source={{ uri: 'https://i.pinimg.com/originals/23/84/5e/23845e70632989a1ea71d2c5ca88af00.png' }}
                        />

                        <View>
                        </View>
                        <DialingCodePicker 
                        isModalVisible={this.state.isModalVisible}
                        setDialCode={(dialingCode)=>this.setDialCode(dialingCode)}
                        toggleModal={this.toggleModal}
                        />

                        <View style={styles.field}>
                            <Icon name="phone"
                                style={styles.icon} />
                            <TouchableWithoutFeedback
                                onPress={() => this.toggleModal()}>
                                <Text style={{ marginLeft: 5 }}>{`(${this.state.dialingCode})`}</Text>
                            </TouchableWithoutFeedback>
                            <TextInput
                                placeholder="enter your phone no"
                                style={[styles.input]}
                            />
                        </View>
                        <View style={styles.field}>
                            <Icon name="key"
                                style={styles.icon} />
                            <TextInput
                                placeholder="enter your password"
                                secureTextEntry={true}
                                style={styles.input}
                            />
                        </View>

                        <Text onPress={() => this.props.navigation.navigate('Reset')}
                            style={{ color: PrimayColor, right: "-70%", fontSize: 12 }}>
                            Forgot Password?
                     </Text>
                        <TouchableOpacity style={styles.buttonContainer}>
                            <Text style={styles.buttonText}>Login</Text>
                        </TouchableOpacity>

                        <View style={styles.signup}>
                            <TouchableOpacity style={{ width: "100%" }} onPress={() => this.props.navigation.navigate('Register')}>
                                <Text style={{ color: '#757575', fontSize: 12 }}>
                                    Don't have an account ?  <Text style={{ color: PrimayColor, fontSize: 12 }}>Sign Up</Text>
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </SafeAreaView>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fafafa',
        justifyContent: 'center'
    },
    logo: {
        resizeMode: 'contain',
        alignSelf: 'center',
        height: 300,
        width: 300,
        marginBottom: 30
    },
    field: {
        flexDirection: 'row',
        borderColor: '#cccccc',
        borderWidth: 1,
        borderRadius: 6,
        alignItems: "center",
        backgroundColor: '#fafafa',
        marginBottom: 20,
        marginHorizontal: 15,
        borderColor: PrimayColor
    },
    icon: {
        color: '#999999', paddingLeft: 10, fontSize: 20
    },
    input: {
        height: 50,
        color: '#757575',
        paddingHorizontal: 20,
        width: '100%'
    },
    buttonContainer: {
        backgroundColor: PrimayColor,
        borderRadius: 100,
        marginHorizontal: '32%',
        height: 50,
        justifyContent: 'center',
        marginBottom: 20
    },
    buttonText: {
        textAlign: 'center',
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
    },
    signup: {
        flex: 1,
        justifyContent: 'flex-end',
        alignSelf: 'center',

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