import React, { Component } from 'react'
import { Text, View, SafeAreaView, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, TextInput } from 'react-native'
import DialingCodePicker from '../components/DialingCodePicker'
import { PrimayColor } from './theme/Colors';
import Icon from 'react-native-vector-icons/FontAwesome';
export default class ForgotPassword extends Component {
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
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.container}>
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
                    <TouchableOpacity
                        style={styles.button}

                    >
                        <Text style={styles.buttonText}>Get Reset Code</Text>
                    </TouchableOpacity>
                    <View style={styles.signup}>
                            <TouchableOpacity style={{ width: "100%" }} onPress={() => this.props.navigation.navigate('Login')}>
                                <Text style={{ color: '#757575', fontSize: 12 }}>
                                    Remember your paaword ?  <Text style={{ color: PrimayColor, fontSize: 12 }}>Login</Text>
                                </Text>
                            </TouchableOpacity>
                        </View>
                </View>
            </SafeAreaView>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: '20%',
        backgroundColor: '#fafafa',
        alignItems: 'center'
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
        width: '83%'
    },
    button: {
        backgroundColor: PrimayColor,
        borderRadius: 6,
        // marginHorizontal: '32%',
        height: 50,
        justifyContent: 'center',
        marginBottom: 20
    },
    buttonText: {
        textAlign: 'center',
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
        padding:10
    },
    signup: {
        flex: 1,
        justifyContent: 'flex-end',
        alignSelf: 'center',

    },
})
