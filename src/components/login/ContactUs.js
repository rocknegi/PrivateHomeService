import React, { useEffect, useState } from 'react'
import { View, Text, SafeAreaView, StyleSheet, ScrollView, TouchableOpacity, ToastAndroid, TextInput, Linking, Platform } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import Whatsapp from 'react-native-vector-icons/MaterialCommunityIcons'

import { PrimayColor } from '../theme/Colors';

export default function ContactUs({ navigation }) {
    return (
        <SafeAreaView>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: PrimayColor, height: 50 }}>
                <Icon style={{ fontSize: 30, left: 5, }} name="menu" onPress={() => navigation.openDrawer()} />
            </View>
            <View style={{ justifyContent: 'flex-start' }}>
                <TouchableOpacity style={styles.buttonContainer} onPress={() => Platform.OS === 'android' ? Linking.openURL('tel:+237655427928') : Linking.openURL('tel:+237655427928')}>
                    <Icon style={{ fontSize: 25 }} name="phone-call" onPress={() => navigation.openDrawer()} />
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>
                            Order Issues
                </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonContainer} onPress={() => Linking.openURL(`https://api.whatsapp.com/send?phone=4917670130614`)}>
                    <Whatsapp style={{ fontSize: 30 }} name="whatsapp" />
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>
                            Suggestions
                </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonContainer} onPress={() => Linking.openURL(`https://api.whatsapp.com/send?phone=491725497085`)}>
                    <Whatsapp style={{ fontSize: 30 }} name="whatsapp" />
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>
                            Feedback
                </Text>
                    </View>
                </TouchableOpacity>

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
        margin: 10
    },
    buttonContainer: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-evenly',
        height: 50,
        backgroundColor: '#eee',
        marginHorizontal: '25%',
        borderRadius: 6,
        margin: 20
    },
    button: {
        justifyContent: 'center',
        alignSelf: 'center'
    },
    buttonText: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
    },
})