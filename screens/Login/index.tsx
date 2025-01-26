import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from "react-native";
import { useState } from "react";
import LinearGradient from 'react-native-linear-gradient';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import LoginWithOtp from "@/components/Login/Otp";
import LoginWithPhone from "@/components/Login/Phone";
import LoginWithEmail from "@/components/Login/Email";
import { Spinner } from "@/components/ui/spinner"
import colors from "tailwindcss/colors"

const routesData = [
    { key: 'OTP', title: 'OTP' },
    { key: 'PHONE', title: 'PHONE' },
    { key: 'EMAIL', title: 'EMAIL' },
]

const renderScene = SceneMap({
    OTP: LoginWithOtp,
    PHONE: LoginWithPhone,
    EMAIL: LoginWithEmail,
});

export default function LoginScreen() {
    const layout = useWindowDimensions();

    const [index, setIndex] = useState(0);
    const [routes] = useState(routesData);


    return (
        <SafeAreaView className="flex-1">
            <Image source={require("@/assets/images/hero.png")} alt="Auth Background" style={styles.backgroundImage} />
            <View className="flex-1 justify-center items-center">
                <View style={styles.card}>
                    <LinearGradient
                        colors={['#f5f5f5', '#fafafa', '#ffffff']}
                        style={styles.linearGradient}
                    >
                        <Text style={styles.heading}>LOGIN</Text>
                        <View style={styles.tabContainer}>
                            <TabView
                                navigationState={{ index, routes }}
                                renderScene={renderScene}
                                renderTabBar={(props) => <TabBar {...props} indicatorStyle={{ backgroundColor: '#222222' }} style={{ backgroundColor: '#999999' }} />}
                                onIndexChange={setIndex}
                                initialLayout={{ width: layout.width }}
                                style={{ height: 250 }}
                                swipeEnabled={false}
                                lazy={true}
                                renderLazyPlaceholder={() => <Spinner size="small" color={colors.gray[500]} />}
                            />
                        </View>
                        <View style={styles.linkContainer}>
                            <TouchableOpacity><Text style={styles.link}>Register</Text></TouchableOpacity>
                            <TouchableOpacity><Text style={styles.link}>Forgot Password?</Text></TouchableOpacity>
                        </View>
                    </LinearGradient>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage:{ 
        width: '100%', 
        height: '100%',
        flex: 1, 
        resizeMode: 'cover', 
        position: 'absolute', 
        zIndex: -1, 
        objectFit: 'cover', 
        top: 0, 
        left: 0 
    },
    wrapper:{
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    card:{
        width: '90%',
        borderRadius: 8,
    },
    linearGradient:{ 
        paddingVertical: 20, 
        borderWidth: 1, 
        borderColor: '#cccccc', 
        borderRadius: 8, 
        width: '100%' 
    },
    heading:{
        fontSize: 24,
        lineHeight: 32,
        fontWeight: 600,
        textAlign: 'center',
        marginBottom: 10,
        paddingHorizontal: 20
    },
    tabContainer:{
        height: 250, 
        width: '100%'
    },
    linkContainer:{
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        paddingHorizontal: 20
    }, 
    link:{
        fontSize: 16, 
        lineHeight: 24,
        fontWeight: 600
    }
});