import React, { useEffect, useState } from 'react'
import { View, Text, SafeAreaView, StyleSheet, ScrollView, TouchableOpacity, ToastAndroid, TextInput, ActivityIndicator } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import firebase from 'react-native-firebase';
import Icon from 'react-native-vector-icons/Feather'
import Modal from 'react-native-modal';
import { PrimayColor } from '../theme/Colors'
import OrderSummary from './OrderSummary';

export default function Orders({ navigation }) {

    const orders = firebase.firestore().collection('Users');
    const [data, setData] = useState([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [isModalVisible, setModalVisible] = useState(false);
    const [currentOrderData, setCurrentOrderData] = useState([]);
    const [currentOrder, setCurrentOrder] = useState('')
    const [phoneNo, setPhoneNo] = useState('');

    const getStoredData = async () => {
        const phoneNo = await AsyncStorage.getItem('phoneNo');
        setPhoneNo(phoneNo);
    }
    useEffect(() => {
        getStoredData();
    }, []);

    useEffect(() => {
        return orders.doc(phoneNo).collection('Orders').onSnapshot(doc => {
            let data = [];
            doc.forEach(e => {
                data.push(e.id)
            });
            setData(data);
        })
    }, [phoneNo]);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    const openOrderModal = (item) => {
        setCurrentOrder(item);
        toggleModal();
    }
    const afterModalOpen = async () => {

        let tdata = [];

        orders.doc(phoneNo).collection('Orders').doc(currentOrder).get().then(doc => {
            tdata.push(({ ...doc.data(), id: doc.id }));
            setCurrentOrderData(JSON.parse(tdata[0][0]));
            setTotal(doc.data().balance);
            setLoading(false)
        });
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: PrimayColor, height: 50 }}>
                <Icon style={{ fontSize: 30, left: 5, }} name="menu" onPress={() => navigation.openDrawer()} />
            </View>
            <Modal
                isVisible={isModalVisible}
                onModalShow={afterModalOpen}
                style={{
                    justifyContent: 'center',
                    paddingTop: 20,
                }}
                onBackdropPress={toggleModal}
                swipeDirection={['up', 'down']}
                propagateSwipe={true}
                useNativeDriver={true}
            >
                {loading ?
                    <ActivityIndicator size="large" animating={true} />
                    : <View style={{ backgroundColor: '#fafafa' }}>
                        <OrderSummary items={currentOrderData} total={total} />
                        <TouchableOpacity onPress={toggleModal} style={[styles.button, { margin: 10, padding: 10 }]}>
                            <Text style={styles.text}>
                                Close
                            </Text>
                        </TouchableOpacity>
                    </View>}
            </Modal>
            <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
                <View>
                    {data.map(item => (
                        <TouchableOpacity key={item} style={styles.list} onPress={() => openOrderModal(item)}>
                            <Text style={{ fontSize: 15 }}>{item}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    list: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        backgroundColor: '#eee',
        height: 40,
        elevation: 6,
        borderRadius: 6
    },
    button: {
        backgroundColor: PrimayColor,
        alignSelf: 'center',
        marginHorizontal: 5,
        paddingHorizontal: '3%',
        borderRadius: 6,
    },
    buttonText: {
        color: '#fafafa',
        textAlign: 'center'
    }
})