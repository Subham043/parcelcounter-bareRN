import { View } from "react-native"
import { Input, InputField } from "../ui/input"
import { Button, ButtonText } from "../ui/button"
import {
    getHash,
    startOtpListener,
    useOtpVerify,
    requestHint
  } from 'react-native-otp-verify';


const LoginWithOtp = () => {
    return (
        <View className="w-full px-5">
            <Input
                variant="underlined"
                size="md"
                isDisabled={false}
                isInvalid={false}
                isReadOnly={false}
                className="mt-5 border-gray-500"
            >
                <InputField placeholder="Enter Phone" autoFocus={true} inputMode="numeric" autoComplete="tel" textContentType="telephoneNumber" className="placeholder:text-gray-500" />
            </Input>
            <Input
                variant="underlined"
                size="md"
                isDisabled={false}
                isInvalid={false}
                isReadOnly={false}
                className="mt-5 border-gray-500"
            >
                <InputField placeholder="Enter OTP" inputMode="numeric" className="placeholder:text-gray-500" autoComplete="sms-otp" textContentType="oneTimeCode" />
            </Input>
            <View className="mt-4 flex-row justify-center">
                <Button size="md" variant="solid" action="secondary" className="w-1/3 bg-black">
                    <ButtonText className="text-white">LOGIN</ButtonText>
                </Button>
            </View>
        </View>
    )
}

export default LoginWithOtp