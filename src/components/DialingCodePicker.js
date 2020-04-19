import React from 'react'
import { SafeAreaView, Text, View, StyleSheet, TouchableWithoutFeedback, FlatList } from 'react-native'
import Modal from 'react-native-modal';
import data from '../utils/Countries'

export default DialingCodePicker = (props) => {
    renderList = (item) => {
        return (
            <View>
                <View style={styles.modal}>
                    <Text style={[styles.modalText, { fontSize: 30 }]} key={item.code}>{item.flag}</Text>
                    <TouchableWithoutFeedback onPress={() => props.setDialCode(item.dial_code)}><Text style={[styles.modalText]} key={item.name}>{item.name}</Text></TouchableWithoutFeedback>
                    <Text style={[styles.modalText], { fontSize: 20 }} key={item.dial_code}>{item.dial_code}</Text>
                </View>
            </View>
        )
    }
    return (
        <SafeAreaView>
            <Modal
                isVisible={props.isModalVisible}
                scrollHorizontal={true}
                hasBackdrop={true}
                backdropColor='#FFF'
                style={{ marginTop: 350 }}
                onBackdropPress={() => props.toggleModal()}
            >
                <FlatList
                    data={data}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => this.renderList(item)}
                />
            </Modal>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    modal: {
        flexDirection: 'row', justifyContent: 'space-between'
    },
    modalText: {
        fontSize: 22,
        flexWrap: 'wrap',
        textAlign: 'center'
    }
})