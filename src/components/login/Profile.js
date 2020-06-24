import React, { useEffect, useState } from 'react'
import { View, Text, SafeAreaView, AsyncStorage, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'

import { PrimayColor } from '../theme/Colors'

export default function Profile({ navigation }) {

    const [data, setData] = useState({
        phoneNo: '',
        username: ''
    });

    const getStoredData = async () => {
        const phoneNo = await AsyncStorage.getItem('phoneNo');
        const username = await AsyncStorage.getItem('username');

        setData({ phoneNo, username })
    }

    useEffect(() => {
        getStoredData()
    }, []);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: PrimayColor, height: 50 }}>
                <Icon style={{ fontSize: 30, left: 5, }} name="menu" onPress={() => navigation.openDrawer()} />
            </View>

            <View style={{ flex: 1, justifyContent: 'center',bottom:'20%' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={[styles.textContainer, { backgroundColor: '#fafafa', flex: 1, marginHorizontal: 0 }]}>
                        <Text style={{ fontSize: 15, fontWeight: '100' }}>Phone No</Text>
                    </View>
                    <View style={styles.textContainer}>
                        <Text>+237 {data.phoneNo}</Text>
                    </View>

                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={[styles.textContainer, { backgroundColor: '#fafafa', flex: 1, marginHorizontal: 0 }]}>
                        <Text style={{ fontSize: 15, fontWeight: '100' }}>Username</Text>
                    </View>
                    <View style={styles.textContainer}>
                        <Text>{data.username}</Text>
                    </View>

                </View>
            </View>
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
    }
})