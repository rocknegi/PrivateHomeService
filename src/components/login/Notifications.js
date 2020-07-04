import React, { useEffect, useState } from 'react'
import { View, Text, SafeAreaView, StyleSheet, ScrollView, TouchableOpacity, ToastAndroid, TextInput } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/Feather'
import firebase from 'react-native-firebase';

import { PrimayColor } from '../theme/Colors'

export default function Notifications({ navigation }) {
    const order = firebase.firestore().collection('Managers');
    const [data, setData] = useState(false);
    const [phoneNo, setPhoneNo] = useState([]);

    const getStoredData = async () => {
        const phoneNo = '123456789'
        // await AsyncStorage.getItem('phoneNo');
        setPhoneNo(phoneNo);
    }

    useEffect(() => {
        getStoredData();
    }, []);

    useEffect(() => {
        return order.onSnapshot(snapshot => {
            snapshot.forEach(doc => {
                if (doc.data().phoneNo == phoneNo) {
                    setData(doc.data().confirmed)
                }
            })
        })
    }, [phoneNo])

    const clearNotification = () => {
        order.doc(phoneNo).update({
            confirmed: false
        })
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: PrimayColor, height: 50 }}>
                <Icon style={{ fontSize: 30, left: 5, }} name="menu" onPress={() => navigation.openDrawer()} />
            </View>
            <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
                {data && <View style={styles.card}>
                    <Text style={{ textAlign: 'center', fontSize: 18 }}>
                        Your order has been confirmed
                    </Text>
                    <TouchableOpacity style={styles.button} onPress={clearNotification}>
                        <Text style={styles.buttonText}>Clear</Text>
                    </TouchableOpacity>
                </View>}

            </ScrollView>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    button: {
        marginTop: 20,
        backgroundColor: PrimayColor,
        borderRadius: 100,
        marginHorizontal: '35%',
        height: 30,
        justifyContent: 'center',
        marginBottom: 20
    },
    buttonText: {
        textAlign: 'center',
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    card: {
        backgroundColor: '#fafafa',
        elevation: 6,
        margin: 10,
        width: '95%',
        borderRadius: 6
    }
})