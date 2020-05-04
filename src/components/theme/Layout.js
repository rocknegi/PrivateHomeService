import React from 'react'
import { StyleSheet, SafeAreaView, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
const Layout = (props) => {
    return (
        <View  style={styles.linearGradient}>
            <KeyboardAvoidingView
                behavior={Platform.OS == "ios" ? "padding" : "height"}
                style={styles.container}
            >

                {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}
                    <SafeAreaView style={styles.container}>
                        {props.children}
                    </SafeAreaView>
                {/* </TouchableWithoutFeedback> */}

            </KeyboardAvoidingView>
        </View>
    )
}

export default Layout
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor:'#fafafa'
    },
    linearGradient: {
        flex: 1,
        paddingLeft: 5,
        paddingRight: 5,
        borderRadius: 5
    },
})
