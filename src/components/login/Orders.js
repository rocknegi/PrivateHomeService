import React, { useEffect, useState } from 'react'
import { View, Text, SafeAreaView, StyleSheet, ScrollView, TouchableOpacity, ToastAndroid, TextInput } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import firebase from 'react-native-firebase';
import Icon from 'react-native-vector-icons/Feather'

import { PrimayColor } from '../theme/Colors'

export default function Orders({ navigation }) {

    const orders = firebase.firestore().collection('Users');
    const [data, setData] = useState([]);

    useEffect(() => {
        orders.doc('123456789').collection('Orders').get().then(doc => {
            doc.forEach(e => console.log(e.id))
        })
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: PrimayColor, height: 50 }}>
                <Icon style={{ fontSize: 30, left: 5, }} name="menu" onPress={() => navigation.openDrawer()} />
            </View>
            <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
                <View style={{ flex: 1, justifyContent: 'center', marginTop: '30%' }}>

                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({

})