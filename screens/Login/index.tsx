import { Image, SafeAreaView, Text, TouchableOpacity, useWindowDimensions, View } from "react-native";
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
            <Image source={require("@/assets/images/hero.png")} alt="Auth Background" style={{ width: '100%', height: '100%', resizeMode: 'cover', position: 'absolute', zIndex: -1, objectFit: 'cover', top: 0, left: 0 }} />
            <View className="flex-1 justify-center items-center">
                <View className=" rounded-lg" style={{ width: '90%' }}>
                    <LinearGradient
                        colors={['#f5f5f5', '#fafafa', '#ffffff']}
                        className="w-full rounded-lg"
                        style={{ paddingVertical: 20, borderWidth: 1, borderColor: '#cccccc', borderRadius: 5 }}
                    >
                        <Text className="text-2xl text-center font-semibold px-5 mb-10" style={{ paddingHorizontal: 20, marginBottom: 10 }}>LOGIN</Text>
                        <View className="w-full" style={{ height: 250, width: '100%' }}>
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
                        <View className="flex-row justify-between items-center px-5">
                            <TouchableOpacity><Text className="text-base font-bold">Register</Text></TouchableOpacity>
                            <TouchableOpacity><Text className="text-base font-bold">Forgot Password?</Text></TouchableOpacity>
                        </View>
                    </LinearGradient>
                </View>
            </View>
        </SafeAreaView>
    );
}