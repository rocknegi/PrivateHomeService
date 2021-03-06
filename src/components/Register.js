import React, { Component } from 'react'
import { SafeAreaView, Text, Button, View, KeyboardAvoidingView, StyleSheet, TextInput, TouchableOpacity, Image, TouchableWithoutFeedback, Keyboard, FlatList, ColorPropType } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { PrimayColor, TextColorWhite } from './theme/Colors';
import DialingCodePicker from './DialingCodePicker';
import Layout from './theme/Layout'
export default class Register extends Component {
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

    render() {
        return (
            <Layout>
                <Image
                    style={styles.logo}
                    source={{ uri: 'https://i.pinimg.com/originals/23/84/5e/23845e70632989a1ea71d2c5ca88af00.png' }}
                />

                <View>
                </View>
                <DialingCodePicker
                    isModalVisible={this.state.isModalVisible}
                    setDialCode={(dialingCode) => this.setDialCode(dialingCode)}
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
                        keyboardType={'number-pad'}
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

                <TouchableOpacity style={styles.buttonContainer}>
                    <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>

                <View style={styles.signup}>
                    <TouchableOpacity style={{ width: "100%" }} onPress={() => this.props.navigation.navigate('Login')}>
                        <Text style={{ color: '#000', fontSize: 15 }}>
                            Already have an account ?  <Text style={{ color: TextColorWhite, fontSize: 15 }}>Login</Text>
                        </Text>
                    </TouchableOpacity>
                </View>
            </Layout>
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