import React, { Component } from 'react'
import { Text, View, SafeAreaView, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, ScrollView, TextInput, Keyboard, Dimensions, Alert, Platform, Image } from 'react-native'
import DatePicker from 'react-native-datepicker'
import { PrimayColor } from './theme/Colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import Layout from './theme/Layout';
import Map from './map';
import Modal from 'react-native-modal';
import { connect } from 'react-redux'
import images from '../assets/images';

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

class FindMe extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: ''
        }
    }
    state = {
        isModalVisible: false,
        dialingCode: '+237',
        hours: '',
        minutes: '',
        name: '',
        marker: {
            latitude: 0,
            longitude: 0,
        },
        date: ''
    }
    componentDidMount() {
        const today = new Date();
        const dd = today.getDate();
        const mm = today.getMonth() + 1;
        const yy = today.getFullYear()
        this.setState({
            date: dd + '-' + mm + '-' + yy
        })
    }
    toggleModal = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
    };

    saveMarkerLocation = (location) => {
        this.setState({
            marker: {
                latitude: location.latitude,
                longitude: location.longitude
            }
        })
    }
    validate = () => {
        if (this.state.name.length < 1 || this.state.marker.latitude === 0)
            return false
        else
            return true
    }
    checkTime = () => {
        if (this.validate()) {
            const maxHH = 19;
            const minHH = 9;
            if (this.state.hours.length < 2 || this.state.minutes.length < 2 || this.state.minutes > 60)
                Alert.alert('Enter time in HH:MM format')
            else if (this.state.hours > maxHH || this.state.hours < minHH)
                Alert.alert('', "we only deliver between 9:00 and 20:00")

            else this.props.navigation.navigate('payment')
        }
        else Alert.alert('', 'Please enter your name and press Find me ')
    }

    render() {
        // Alert.alert('','Note: To catch you location with good accuracy please enable GPS and internet connection On your mobile phone')
        return (
            <Layout>
                <ScrollView>
                    <Modal
                        style={{ paddingTop: '5%' }}
                        isVisible={this.state.isModalVisible}
                        useNativeDriver={true}
                    >
                        <Map saveMarkerLocation={this.saveMarkerLocation} toggle={this.toggleModal} />
                    </Modal>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={styles.container}>
                            {/* <Text style={[styles.text, {
                            fontSize: 20, borderColor: PrimayColor, borderWidth: 2,
                            paddingHorizontal: '12%', paddingVertical: '2%'
                        }]}>
                            Delivery Location
                        </Text> */}
                            <Image
                                style={{ height: 150, width: 150 }}
                                source={images.map}
                            />

                            <TouchableOpacity style={styles.button} onPress={this.toggleModal}>
                                <Text style={[styles.buttonText, { fontSize: 18 }]}>Delivery location</Text>
                            </TouchableOpacity>
                            <Text style={{ fontSize: 13, flexWrap: 'wrap', fontFamily: Platform.OS === 'android' ? 'COMIC' : 'ComicSansMS', marginHorizontal: '15%', paddingBottom: 10, textAlign: 'center' }}>

                                Press find me and zoom into the map to check your delivery location, then confirm it
                                </Text>
                            <View style={[styles.field, { marginHorizontal: '0%', }]}>
                                {/* <Text style={{}}>Adress Precision</Text> */}
                                <TextInput
                                    onFocus={() => Alert.alert('', 'Please describe the building Left and right from your building to help us Find you')}
                                    placeholder="Adress Precision"
                                    style={styles.input}
                                />
                            </View>
                            {/* <Text style={{ flexWrap: 'wrap', marginHorizontal: '15%', textAlign: 'center' }}>Please describe the building Left and rigth from your building to help us Find you</Text> */}

                            <View style={[styles.field, { marginHorizontal: '0%', }]}>
                                {/* <Text style={{ marginLeft: 5 }}>Name,Surname</Text> */}
                                <TextInput
                                    placeholder="Name,Surname"
                                    style={[styles.input,]}
                                    keyboardType={'default'}
                                    value={this.state.name}
                                    onChangeText={(e) => this.setState({ name: e })}
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

                            <Text style={[styles.text, {
                                fontSize: 18, borderColor: PrimayColor, borderWidth: 2,
                                width: '73.2%', paddingVertical: '1%',
                                fontFamily: Platform.OS === 'android' ? 'COMIC' : 'ComicSansMS'
                            }]}>
                                Delivery Time
                        </Text>

                            <View style={{ flexDirection: 'row', justifyContent: 'center', padding: '2%' }}>
                                <DatePicker
                                    style={{ width: '39%', margin: 5, marginLeft: 0 }}
                                    date={this.state.date}
                                    mode="date"
                                    placeholder="select date"
                                    format="DD-MM-YYYY"
                                    minDate={this.state.date}
                                    // maxDate="2016-06-01"
                                    confirmBtnText="Confirm"
                                    cancelBtnText="Cancel"
                                    customStyles={{
                                        dateIcon: {
                                            position: 'absolute',
                                            left: 0,
                                            top: 4,
                                            marginLeft: 0
                                        },
                                        dateInput: {
                                            paddingLeft: 10,
                                            borderColor: PrimayColor,
                                            borderWidth: 2
                                        }
                                    }}
                                    onDateChange={(date) => { this.setState({ date: date }) }}
                                />
                                <TextInput
                                    onFocus={() => Alert.alert('', "delivery time can be selected only between 2pm and 9 PM.Please note that the Order should be passed at least 60 min before delivery time")
                                    }
                                    style={{ textAlign: 'center', fontSize: 20, borderWidth: 2, padding: 8, borderColor: PrimayColor }}
                                    placeholder="HH"
                                    keyboardType={'number-pad'}
                                    value={this.state.hours}
                                    onChange={(e) => this.setState({ hours: e.nativeEvent.text })}
                                />
                                <Text style={[styles.text, { fontSize: 20 }]}>:</Text>
                                <TextInput
                                    style={{ textAlign: 'center', fontSize: 20, borderWidth: 2, padding: 5, borderColor: PrimayColor }}
                                    placeholder="MM"
                                    keyboardType={'number-pad'}
                                    value={this.state.minutes}
                                    onChange={(e) => this.setState({ minutes: e.nativeEvent.text })}
                                />

                            </View>
                            {/* <Text style={{ flexWrap: 'wrap', marginHorizontal: '15%', textAlign: 'center' }}>Note: delivery time can be selected only between 2pm
                        and 9 PM.
                        Please note that the Order should be passed at least 60 min
before delivery time</Text> */}
                            {/* <TouchableOpacity
                            style={styles.button}
                            onPress={this.checkTime}
                        >
                            <Text style={styles.buttonText}>Pay now</Text>
                        </TouchableOpacity> */}
                            {this.props.total &&
                                <>
                                    <View style={{ flexDirection: 'row', justifyContent: 'center', borderWidth: 1, borderBottomWidth: 0, width: '73%' }}>
                                        <Text style={[styles.text, { flex: 1 }]}>Order Total</Text>
                                        <Text style={[styles.text, { flex: 1, borderLeftWidth: 1, margin: 0, padding: 8 }]}>Fcfa {this.props.total}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'center', borderWidth: 1, BorderTopWidth: 0, width: '73%' }}>
                                        <Text style={[styles.text, { flex: 1, BorderTopWidth: 0, }]}>Account</Text>
                                        <Text style={[styles.text, { flex: 1, borderLeftWidth: 1, margin: 0, padding: 8, fontSize: 13 }]}>Fcfa10.000</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'center', borderWidth: 1, borderTopWidth: 0, BorderTopWidth: 0, width: '73%' }}>
                                        <Text style={[styles.text, { flex: 1 }]}>Cash at delivery</Text>
                                        <Text style={[styles.text, { flex: 1, borderLeftWidth: 1, margin: 0, padding: 8 }]}>Fcfa {this.props.total - 10}</Text>
                                    </View>
                                </>
                            }
                            <Text style={[styles.text, {
                                fontSize: 15, borderColor: PrimayColor, borderWidth: 2,
                                width: '73.2%', paddingVertical: '2%',
                                fontFamily: Platform.OS === 'android' ? 'COMIC' : 'ComicSansMS'
                            }]}>
                                Select your payment method
                        </Text>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
                                {/* <TouchableWithoutFeedback style={{flex:0.5}}>
                                    <Image
                                        style={{ height: 65, width: '35%', margin: 5 }}
                                        source={images.momo}
                                    />
                                </TouchableWithoutFeedback>
                                <TouchableWithoutFeedback style={{flex:0.5}}>
                                    <Image
                                        style={{ height: 65, width: '35%', margin: 5 }}
                                        source={images.orange_money}
                                    />
                                </TouchableWithoutFeedback> */}
                                <TouchableOpacity style={{ width: '33%', padding: 10, elevation: 5, backgroundColor: '#eee', margin: 10 }}>
                                    <Image
                                        style={{ flex: 1, height: 65, width: '100%', padding: 5 }}
                                        source={images.momo}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity style={{ width: '33%', padding: 10, elevation: 5, backgroundColor: '#eee', margin: 10 }}>
                                    <Image
                                        style={{ flex: 1, height: 65, width: '100%', padding: 5 }}
                                        source={images.orange_money}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>

                    </TouchableWithoutFeedback>
                </ScrollView>
            </Layout>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        total: state.total
    }
}
export default connect(mapStateToProps)(FindMe)

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
        marginBottom: 10,
        marginHorizontal: '5%',
        borderColor: PrimayColor
    },
    icon: {
        color: '#999999', paddingLeft: 10, fontSize: 20
    },
    input: {
        height: 35,
        color: '#757575',
        paddingHorizontal: 20,
        width: '73.2%'
    },
    button: {
        backgroundColor: PrimayColor,
        borderRadius: 100,
        // margin: 10,
        // height: 35,
        justifyContent: 'center',
        marginBottom: 20
    },
    buttonText: {
        textAlign: 'center',
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
        padding: 10,
        fontFamily: Platform.OS === 'android' ? 'COMIC' : 'ComicSansMS'
    },
    signup: {
        flex: 1,
        justifyContent: 'flex-end',
        alignSelf: 'center',

    },
    text: {
        textAlign: 'center',
        margin: 10,
        fontFamily: Platform.OS === 'android' ? 'COMIC' : 'ComicSansMS'
    }
})
