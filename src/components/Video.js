import React from 'react'
import { View, Dimensions, Text } from 'react-native'
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/Feather'
import { WebView } from 'react-native-webview';

import { PrimayColor } from './theme/Colors';

export default function VideoScreen({ navigation }) {
    return (
        <>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: PrimayColor, height: 50 }}>
                <Icon style={{ fontSize: 30, left: 5, }} name="menu" onPress={() => navigation.openDrawer()} />
            </View>
            <WebView
                style={{
                    width: 1,
                    width: Dimensions.get('window').width * 1.6,
                    height: Dimensions.get('window').height,
                    marginTop: '40%'
                }}
                allowsFullscreenVideo={true}
                startInLoadingState={true}
                javaScriptEnabled={true}
                mediaPlaybackRequiresUserAction={false}
                source={{
                    html: `<div align="justify"><iframe height=340 width=600 frameBorder='0 'allowFullScreen src="https://www.youtube.com/embed/2olUfG5VNwY"></iframe></div>`,
                }}
            />
        </>

    )
}
