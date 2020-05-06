import React, { Component } from 'react'
import { Text, View, SafeAreaView, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, TextInput, Keyboard, Dimensions, Alert } from 'react-native'
import DialingCodePicker from '../components/DialingCodePicker'
import { PrimayColor } from './theme/Colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import Layout from './theme/Layout';
import Map from './map';
import Modal from 'react-native-modal';

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

export default class FindMe extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: ''
        }
    }
    state = {
        isModalVisible: false,
        dialingCode: '+237',
        hours:'',
        minutes:'',
        name:'',
        marker:{
            latitude: 0,
            longitude: 0,
        }
    }
    toggleModal = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
    };

    saveMarkerLocation = (location)=>{
        this.setState({marker:{
            latitude:location.latitude,
            longitude:location.longitude
        }})
    }
    validate=()=>{
        if(this.state.name.length<1||this.state.marker.latitude===0)
        return false
        else 
        return true
    }
    checkTime = ()=>{
        if(this.validate())
        {const maxHH = 19;
        const minHH = 9; 
        if(this.state.hours.length<2 || this.state.minutes.length<2 || this.state.minutes>60)
        Alert.alert('Enter time in HH:MM format')
        else if(this.state.hours>maxHH || this.state.hours < minHH )
            Alert.alert("we only deliver between 9:00 and 20:00")

       else this.props.navigation.navigate('payment')}
       else Alert.alert('Please enter your name and press Find me ')
    }

    render() {
        return (
            <Layout>
                <Modal 
                style={{ paddingTop: '50%' }}
                isVisible={this.state.isModalVisible}
                >
                    <Map saveMarkerLocation={this.saveMarkerLocation}  toggle = {this.toggleModal}/>
                </Modal>
                  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    <Text style={[styles.text,{
                        fontSize:25,borderColor:PrimayColor,borderWidth:2,
                        paddingHorizontal:'12%',paddingVertical:'2%'
                        }]}>
                        Delivery Location
                        </Text>

                    <TouchableOpacity style={styles.button} onPress={this.toggleModal}>
                    <Text style={[styles.buttonText,{fontSize:20}]}>Find Me</Text>
                    </TouchableOpacity>
                    <TextInput 
                        multiline = {true}
                        numberOfLines = {10}
                        placeholder="Precise Address"
                        style={[styles.text,{
                            height:'12%',
                        fontSize:25,borderColor:PrimayColor,borderWidth:2,
                        paddingHorizontal:'12%',paddingVertical:'2%',
                        }]}
                        />

                    <View  style={[styles.field,{marginTop:10}]}>
                        <Text style={{ marginLeft: 5 }}>Name</Text>
                    <TextInput
                            placeholder=""
                            style={[styles.input,]}
                            keyboardType={'default'}
                            value={this.state.name}
                            onChangeText={(e)=>this.setState({name:e})}
                        />
                    </View>
                    {/* <View style={[styles.field,]}>
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
                    </View> */}
                    {/* <Text style={[styles.text,{fontSize:18}]}>Phone no will be if the driver have any questions</Text> */}
                    
                    <Text style={[styles.text,{
                        fontSize:25,borderColor:PrimayColor,borderWidth:2,
                        paddingHorizontal:'12%',paddingVertical:'2%'
                        }]}>
                        Delivery Time 
                        </Text>

                        <View style={{flexDirection:'row',justifyContent:'center',padding:'2%'}}>
                            <TextInput
                            style={{fontSize:25,borderWidth:2,padding:5,borderColor:PrimayColor}} 
                            placeholder="HH"
                            keyboardType={'number-pad'}
                            value={this.state.hours}
                            onChange={(e)=>this.setState({hours:e.nativeEvent.text})}
                            />
                            <Text style={[styles.text,{fontSize:20}]}>:</Text>
                             <TextInput 
                            style={{fontSize:25,borderWidth:2,padding:5,borderColor:PrimayColor}} 
                            placeholder="MM"
                            keyboardType={'number-pad'}
                            value={this.state.minutes}
                            onChange={(e)=>this.setState({minutes:e.nativeEvent.text})}
                            />

                        </View>
                    
                    <TouchableOpacity
                        style={styles.button}
                        onPress={this.checkTime}
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
