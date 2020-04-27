import React, { Component } from 'react'
import { Text, View, SafeAreaView, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, TextInput, Keyboard } from 'react-native'
import DialingCodePicker from '../components/DialingCodePicker'
import { PrimayColor } from './theme/Colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import Layout from './theme/Layout';
export default class FindMe extends Component {
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
                  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    <Text style={[styles.text,{fontSize:25}]}>Delivery Location</Text>
                    <TouchableOpacity style={styles.button}>
                    <Text style={[styles.buttonText,{fontSize:20}]}>Find Me</Text>
                    </TouchableOpacity>
                    <View  style={styles.field}>
                        <Text style={{ marginLeft: 5 }}>Additional</Text>
                    <TextInput
                            placeholder="enter something"
                            style={[styles.input]}
                            keyboardType={'default'}
                        />
                    </View>
                    <View style={styles.field}>
                        <Icon name="phone"
                            style={styles.icon} />
                        <TouchableWithoutFeedback
                            onPress={() => this.toggleModal()}>
                            <TextInput style={{ marginLeft: 5 }}>{`(${this.state.dialingCode})`}</TextInput>
                        </TouchableWithoutFeedback>
                        <TextInput
                            placeholder="enter your phone no"
                            style={[styles.input]}
                            keyboardType={'number-pad'}
                        />
                    </View>
                    <Text style={[styles.text,{fontSize:18}]}>Phone no will be if the driver have any questions</Text>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={()=>this.props.navigation.navigate('payment')}
                    >
                        <Text style={styles.buttonText}>Pay now</Text>
                    </TouchableOpacity>

                </View>
                </TouchableWithoutFeedback>
            </Layout>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // paddingTop: '20%',
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
        margin:10,
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
    text:{
        textAlign:'center',
        margin:10
    }
})
