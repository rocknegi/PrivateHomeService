import React, { Component } from 'react'
import { Text, View,StyleSheet } from 'react-native'
import {connect} from 'react-redux'

import Layout from './theme/Layout'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { PrimayColor } from './theme/Colors'

class Payments extends Component {
    render() {
        return (
            <Layout>
                <View style={styles.container}>
                    <Text style={styles.text}>
                        Total amount to be paid is {"\n"}€{this.props.total}
                    </Text>
                    <Text style={[styles.text,{marginTop:'20%'}]}>Select a Payment option</Text>
                    <View style={{marginTop:20}}>
                    <TouchableOpacity
                        style={styles.button}
                        // onPress={()=>this.props.navigation.navigate('payment')}
                    >
                        <Text style={styles.buttonText}>PayPal</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        // onPress={()=>this.props.navigation.navigate('payment')}
                    >
                        <Text style={styles.buttonText}>Orange Money</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        // onPress={()=>this.props.navigation.navigate('payment')}
                    >
                        <Text style={styles.buttonText}>MTN Mobile Money</Text>
                    </TouchableOpacity>
                    </View>
                    <View style={{flexDirection:'row',justifyContent:'center',marginTop:'10%'}}>
                    <TouchableOpacity
                        style={styles.button}
                        // onPress={()=>this.props.navigation.navigate('payment')}
                    >
                        <Text style={styles.buttonText}>Save     </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        // onPress={()=>this.props.navigation.navigate('payment')}
                    >
                        <Text style={styles.buttonText}>Cancel</Text>
                    </TouchableOpacity>
                    </View>
                </View>
            </Layout>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        total: state.total
    }
}

export default connect(mapStateToProps)(Payments)


const styles = StyleSheet.create({
    container:{
        flex:1,
        marginTop:'20%'
    },
    text:{
        fontSize:25,
        textAlign:'center'
    },
    button: {
        backgroundColor: PrimayColor,
        borderRadius: 6,
        margin:10,
        height: 50,
        justifyContent: 'center',
        marginBottom: 20
    },
    buttonText: {
        textAlign: 'center',
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
        padding:10
    },
})