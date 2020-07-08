import React, { useEffect, useState } from 'react'
import { View, Text, SafeAreaView, StyleSheet, ScrollView, TouchableOpacity, ToastAndroid, TextInput } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/Feather'
import firebase from 'react-native-firebase';
import DatePicker from 'react-native-datepicker'
import moment from 'moment';

import { PrimayColor } from '../theme/Colors'

export default function Profile({ navigation }) {

    const [data, setData] = useState({
        phoneNo: '',
        username: '',
        dob: ''
    });
    const [date, setDate] = useState(moment().format('DD-MM-YYYY'),)

    const getStoredData = async () => {
        const phoneNo = await AsyncStorage.getItem('phoneNo');
        const username = await AsyncStorage.getItem('username');
        setData({ ...data, phoneNo, username });
        // if (username) {
        //     setData({ ...data, username })
        // }
    }

    const update = async () => {

        AsyncStorage.setItem('phoneNo', data.phoneNo);
        AsyncStorage.setItem('username', data.username);
        ToastAndroid.showWithGravity("Updated", ToastAndroid.SHORT, ToastAndroid.BOTTOM);

        firebase.firestore().collection('Users').doc(data.phoneNo).update({
            dob: date,
            username: data.username
        })
    }

    useEffect(() => {
        getStoredData();
    }, []);

    useEffect(() => {
        firebase.firestore().collection('Users').doc(data.phoneNo).get().then(doc => {
            if (doc.exists) {
                setDate(doc.data()['dob']);
                setData({ ...data, username: doc.data()['username'] })
            }
        });
    }, [data.phoneNo])

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: PrimayColor, height: 50 }}>
                <Icon style={{ fontSize: 30, left: 5, }} name="menu" onPress={() => navigation.openDrawer()} />
            </View>
            <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
                <View style={{ flex: 1, justifyContent: 'center', marginTop: '30%' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={[styles.textContainer, { backgroundColor: '#fafafa', flex: 1, marginHorizontal: 0 }]}>
                            <Text style={{ fontSize: 15, fontWeight: '100' }}>Phone No</Text>
                        </View>
                        <View style={styles.textContainer}>
                            <Text>+237</Text>
                            <TextInput
                                value={data.phoneNo}
                                onChangeText={value => setData({ ...data, phoneNo: value })}
                                keyboardType={'numeric'}
                            />
                        </View>

                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={[styles.textContainer, { backgroundColor: '#fafafa', flex: 1, marginHorizontal: 0 }]}>
                            <Text style={{ fontSize: 15, fontWeight: '100' }}>Username</Text>
                        </View>
                        <View style={styles.textContainer}>
                            <TextInput
                                value={data.username}
                                onChangeText={value => setData({ ...data, username: value })}
                            />
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                        <View style={[styles.textContainer, { backgroundColor: '#fafafa', flex: 0.73, marginHorizontal: 0 }]}>
                            <Text style={{ fontSize: 15, fontWeight: '100' }}>Date of birth</Text>
                        </View>
                        <DatePicker
                            style={{ marginTop: 10, left: 15 }}
                            date={date}
                            mode="date"
                            placeholder="select date"
                            format="DD-MM-YYYY"
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
                            onDateChange={(date) => setDate(date)}
                        />
                    </View>
                    <TouchableOpacity style={styles.button} onPress={update}>
                        <Text style={styles.buttonText}>Update</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    textContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#eee',
        height: 40,
        marginHorizontal: '8%',
        flex: 1,
        margin: 10
    },
    button: {
        marginTop: 20,
        backgroundColor: PrimayColor,
        borderRadius: 100,
        marginHorizontal: '30%',
        height: 45,
        justifyContent: 'center',
        marginBottom: 20
    },
    buttonText: {
        textAlign: 'center',
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
})