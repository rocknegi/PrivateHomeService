import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, ScrollView, TextInput, Keyboard, Dimensions, Alert, Platform, Image, ActivityIndicator } from 'react-native'
import DatePicker from 'react-native-datepicker'
import { PrimayColor } from './theme/Colors';
import AsyncStorage from '@react-native-community/async-storage';
import Layout from './theme/Layout';
import Map from './map';
import Modal from 'react-native-modal';
import { connect } from 'react-redux'
import moment from 'moment';
import firebase, { Firebase } from 'react-native-firebase';
import { StackActions, NavigationActions } from 'react-navigation';

import images from '../assets/images';
import { payment } from '../utils/Payment';
import { clearState } from '../redux/actions';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const Manager = firebase.firestore().collection('Managers');
const User = firebase.firestore().collection('Users');

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
        date: moment().format('DD-MM-YYYY'),
        dateTo: moment().add(6, 'd').format('DD-MM-YYYY'),
        validLocation: false,
        loading: false,
        name: '',
        address: ''
    }
    componentDidMount() {
        // alert(JSON.stringify(this.props.items, undefined, 2))
        // const today = new Date();
        // const dd = today.getDate();
        // const mm = today.getMonth() + 1;
        // const yy = today.getFullYear();
        // this.setState({
        //     date: dd + '-' + mm + '-' + yy
        // })

        // let dateTo = moment().add(6, 'd').format('YYYY-MM-DD');
        // console.log(dateTo)

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
        // if (this.validate()) {
        const maxHH = 21;
        const minHH = 14;
        if (this.state.hours.length < 2 || this.state.minutes.length < 2 || this.state.minutes > 60)
            Alert.alert('Enter time in HH:MM format')
        else if (this.state.hours > maxHH || this.state.hours < minHH)
            Alert.alert('', "we only deliver between 14:00 (2pm) and 21:00 (9pm)")

        // else this.props.navigation.navigate('payment')
        // }
        // else Alert.alert('', 'Please enter your name and press Find me ')
    }
    isValidLocation = (bool) => {
        this.setState({ validLocation: bool })
    }
    mtn = async () => {
        if (!this.state.validLocation) {
            Alert.alert('No Service available in this area')
        }
        else {
            this.setState({ loading: true });

            const phone = await AsyncStorage.getItem('phoneNo')
            const response = await payment('MTN', `${'237' + phone}`);

            if (response.success) {

                const order = [];
                order.push(JSON.stringify(this.props.items));

                const service = this.props.items.find(item => item.category === 'service')

                console.log(this.props.items)
                Manager.doc(phone).collection('Orders').doc('order').set({
                    ...order,
                    lat: this.state.marker.latitude,
                    long: this.state.marker.longitude
                });
                if (this.props.selection === 'phs') {
                    Manager.doc(phone).set({
                        accepted: false,
                        balance: this.props.total - 10000,
                        deliveryTime: this.state.hours + this.state.minutes,
                        name: this.state.name,
                        orderNo: Math.floor(Math.random() * Math.floor(9999)),
                        // orders:,
                        phoneNo: phone,
                        serviceDuration: service['service'],
                        date: this.state.date,
                        address: this.state.address,
                        lat: this.state.marker.latitude,
                        long: this.state.marker.longitude,
                        completed: false,
                        confirmed: false
                    })
                }
                else {
                    Manager.doc(phone).set({
                        accepted: false,
                        balance: this.props.total - 10000,
                        deliveryTime: this.state.hours + this.state.minutes,
                        name: this.state.name,
                        orderNo: Math.floor(Math.random() * Math.floor(9999)),
                        phoneNo: phone,
                        serviceDuration: 0,
                        date: this.state.date,
                        address: this.state.address,
                        lat: this.state.marker.latitude,
                        long: this.state.marker.longitude,
                        completed: false,
                        confirmed: false
                    })
                }

                User.doc(phone).get().then(doc => {
                    if (!doc.exists) {
                        User.doc(phone).collection('Orders').doc('order1').set({
                            ...order,
                            balance: this.props.total - 10000,
                            lat: this.state.marker.latitude,
                            long: this.state.marker.longitude
                        });
                        User.doc(phone).set({
                            name: this.state.name,
                            orders: 1,
                            phoneNo: phone,
                            lat: this.state.marker.latitude,
                            long: this.state.marker.longitude,
                            dob: '',
                            username: ''
                        })
                    }
                    else {
                        let orders = doc.data().orders + 1;
                        User.doc(phone).collection('Orders').doc(`order${orders}`).set({
                            ...order,
                            balance: this.props.total - 10000,
                            lat: this.state.marker.latitude,
                            long: this.state.marker.longitude
                        });
                        User.doc(phone).update({
                            name: this.state.name,
                            orders,
                            phoneNo: phone,
                            lat: this.state.marker.latitude,
                            long: this.state.marker.longitud,
                        })
                    }

                })

                Alert.alert(
                    'Message',
                    'Payment was sucessfull',
                    [
                        {
                            text: 'OK', onPress: () => {
                                this.setState({ loading: false });
                                setTimeout(() => this.props.clearState(), 2000)
                                const resetAction = StackActions.reset({
                                    index: 0,
                                    actions: [NavigationActions.navigate({ routeName: 'Home' })],
                                });
                                this.props.navigation.dispatch(resetAction)
                            }
                        }
                    ],
                    { cancelable: false }
                );

            }
            else {
                Alert.alert(
                    'Message',
                    `${response.detail}`,
                    [
                        { text: 'OK', onPress: () => this.setState({ loading: false }) }
                    ],
                    { cancelable: false }
                );
            }
        }

    }
    orange = async () => {
        if (!this.state.validLocation) {
            Alert.alert('No Service available in this area')
        }
        else {
            this.setState({ loading: true });

            const phone = await AsyncStorage.getItem('phoneNo')
            const response = await payment('ORANGE', `${'237' + phone}`);

            try {
                if (response.success) {

                    const order = [];
                    order.push(JSON.stringify(this.props.items));
                    const service = this.props.items.find(item => item.category === 'service')

                    Manager.doc(phone).collection('Orders').doc('order').set({
                        ...order,
                        lat: this.state.marker.latitude,
                        long: this.state.marker.longitude
                    });
                    if (this.props.selection !== 'phs') {
                        Manager.doc(phone).set({
                            accepted: false,
                            balance: this.props.total - 10000,
                            deliveryTime: this.state.hours + this.state.minutes,
                            name: this.state.name,
                            orderNo: Math.floor(Math.random() * Math.floor(9999)),
                            phoneNo: phone,
                            serviceDuration: 0,
                            date: this.state.date,
                            address: this.state.address,
                            lat: this.state.marker.latitude,
                            long: this.state.marker.longitude,
                            completed: false,
                            confirmed: false
                        })
                    }
                    else {
                        Manager.doc(phone).set({
                            accepted: false,
                            balance: this.props.total - 10000,
                            deliveryTime: this.state.hours + this.state.minutes,
                            name: this.state.name,
                            orderNo: Math.floor(Math.random() * Math.floor(9999)),
                            // orders:,
                            phoneNo: phone,
                            serviceDuration: service['service'],
                            date: this.state.date,
                            address: this.state.address,
                            lat: this.state.marker.latitude,
                            long: this.state.marker.longitude,
                            completed: false,
                            confirmed: false
                        })
                    }

                    User.doc(phone).get().then(doc => {
                        if (!doc.exists) {
                            User.doc(phone).collection('Orders').doc('order1').set({
                                ...order,
                                balance: this.props.total - 10000,
                                lat: this.state.marker.latitude,
                                long: this.state.marker.longitude
                            });
                            User.doc(phone).set({
                                name: this.state.name,
                                orders: 1,
                                phoneNo: phone,
                                lat: this.state.marker.latitude,
                                long: this.state.marker.longitude,
                                dob: '',
                                username: ''
                            })
                        }
                        else {
                            let orders = doc.data().orders + 1;
                            User.doc(phone).collection('Orders').doc(`order${orders}`).set({
                                ...order,
                                balance: this.props.total - 10000,
                                lat: this.state.marker.latitude,
                                long: this.state.marker.longitude
                            });
                            User.doc(phone).update({
                                name: this.state.name,
                                orders,
                                phoneNo: phone,
                                lat: this.state.marker.latitude,
                                long: this.state.marker.longitude
                            })
                        }

                    })

                    Alert.alert(
                        'Message',
                        'Payment was sucessfull',
                        [
                            {
                                text: 'OK', onPress: () => {
                                    this.setState({ loading: false });
                                    setTimeout(() => this.props.clearState(), 2000)
                                    const resetAction = StackActions.reset({
                                        index: 0,
                                        actions: [NavigationActions.navigate({ routeName: 'Home' })],
                                    });
                                    this.props.navigation.dispatch(resetAction)
                                }
                            }
                        ],
                        { cancelable: false }
                    );

                }

                else Alert.alert(
                    'Message',
                    `${response.detail}`,
                    [
                        { text: 'OK', onPress: () => this.setState({ loading: false }) }
                    ],
                    { cancelable: false }
                );
            } catch (e) {
                Alert.alert(
                    'Message',
                    'Error with the phone no',
                    [
                        { text: 'OK', onPress: () => this.setState({ loading: false }) }
                    ],
                    { cancelable: false }
                );
            }
        }
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
                        <Map validLocation={this.isValidLocation} saveMarkerLocation={this.saveMarkerLocation} toggle={this.toggleModal} />
                    </Modal>
                    <Modal
                        style={{ paddingTop: '5%' }}
                        isVisible={this.state.loading}
                        useNativeDriver={true}
                    >
                        <ActivityIndicator animating={true} size="large" />
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
                                <Text style={[styles.buttonText, { fontSize: 18 }]}>{this.props.language.location}</Text>
                            </TouchableOpacity>
                            <Text style={{ fontSize: 13, flexWrap: 'wrap', fontFamily: Platform.OS === 'android' ? 'COMIC' : 'ComicSansMS', marginHorizontal: '15%', paddingBottom: 10, textAlign: 'center' }}>

                                {this.props.language.deliveryHeading}
                            </Text>
                            <View style={[styles.field, { marginHorizontal: '0%', }]}>
                                {/* <Text style={{}}>Adress Precision</Text> */}
                                <TextInput
                                    onFocus={() => Alert.alert('', this.props.language.addressModal)}
                                    placeholder={this.props.language.address}
                                    style={styles.input}
                                    onChangeText={(e) => this.setState({ address: e })}
                                />
                            </View>
                            {/* <Text style={{ flexWrap: 'wrap', marginHorizontal: '15%', textAlign: 'center' }}>Please describe the building Left and rigth from your building to help us Find you</Text> */}

                            <View style={[styles.field, { marginHorizontal: '0%', }]}>
                                {/* <Text style={{ marginLeft: 5 }}>Name,Surname</Text> */}
                                <TextInput
                                    placeholder={this.props.language.deliveryName}
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
                                {this.props.language.time}
                            </Text>

                            <View style={{ flexDirection: 'row', margin: '2%', width: width / 1.23, left: 15 }}>

                                <View style={{ flex: 1 }}>
                                    <DatePicker
                                        style={{ width: width / 3 }}
                                        date={this.state.date}
                                        mode="date"
                                        placeholder="select date"
                                        format="DD-MM-YYYY"
                                        minDate={this.state.date}
                                        maxDate={this.state.dateTo}
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
                                </View>

                                <View style={{ flexDirection: 'row', flex: 1 }}>

                                    <TextInput
                                        style={{ textAlign: 'center', fontSize: 20, borderWidth: 2, padding: 8, borderColor: PrimayColor, height: 40, }}
                                        placeholder="HH"
                                        keyboardType={'number-pad'}
                                        value={this.state.hours}
                                        onChange={(e) => this.setState({ hours: e.nativeEvent.text })}
                                    />
                                    <Text style={[styles.text, { fontSize: 20, margin: '8%', bottom: 8 }]}>:</Text>
                                    <TextInput
                                        onBlur={this.checkTime}
                                        style={{ textAlign: 'center', fontSize: 20, borderWidth: 2, padding: 5, borderColor: PrimayColor, height: 40, }}
                                        placeholder="MM"
                                        keyboardType={'number-pad'}
                                        value={this.state.minutes}
                                        onChange={(e) => this.setState({ minutes: e.nativeEvent.text })}
                                    />
                                </View>

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
                                        <Text style={[styles.text, { flex: 1 }]}>{this.props.language.orderTotal}</Text>
                                        <Text style={[styles.text, { flex: 1, borderLeftWidth: 1, margin: 0, padding: 8 }]}>FCFA {this.props.total}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'center', borderWidth: 1, BorderTopWidth: 0, width: '73%' }}>
                                        <Text style={[styles.text, { flex: 1, BorderTopWidth: 0, }]}>{this.props.language.account}</Text>
                                        <Text style={[styles.text, { flex: 1, borderLeftWidth: 1, margin: 0, padding: 8, fontSize: 13 }]}>FCFA 10.000</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'center', borderWidth: 1, borderTopWidth: 0, BorderTopWidth: 0, width: '73%' }}>
                                        <Text style={[styles.text, { flex: 1 }]}>{this.props.language.cod}</Text>
                                        <Text style={[styles.text, { flex: 1, borderLeftWidth: 1, margin: 0, padding: 8 }]}>FCFA {this.props.total - 10000}</Text>
                                    </View>
                                </>
                            }
                            <Text style={[styles.text, {
                                fontSize: 15, borderColor: PrimayColor, borderWidth: 2,
                                width: '73.2%', paddingVertical: '2%',
                                fontFamily: Platform.OS === 'android' ? 'COMIC' : 'ComicSansMS'
                            }]}>
                                {this.props.language.paymentMethod}{"\n"}
                                <Text style={{ fontSize: 9, textAlign: 'left' }}>*** Provided by Hachther MeSomb</Text>
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
                                <TouchableOpacity
                                    onPress={this.mtn}
                                    style={{ width: '33%', padding: 10, elevation: 5, backgroundColor: '#eee', margin: 10 }}>
                                    <Image
                                        style={{ flex: 1, height: 65, width: '100%', padding: 5 }}
                                        source={images.momo}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={this.orange}
                                    style={{ width: '33%', padding: 10, elevation: 5, backgroundColor: '#eee', margin: 10 }}>
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
        total: state.total,
        items: state.addedItems,
        selection: state.selection,
        language: state.language
    }
}
const mapDispatchToProps = (dispatch) => {

    return {
        clearState: () => dispatch(clearState())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(FindMe)

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
