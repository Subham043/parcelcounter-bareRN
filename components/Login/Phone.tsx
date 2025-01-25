import { useState } from "react"
import { View } from "react-native"
import { Input, InputField, InputIcon, InputSlot } from "../ui/input"
import { Button, ButtonText } from "../ui/button"
import Icon from 'react-native-vector-icons/Ionicons';


const LoginWithPhone = () => {
    const [showPassword, setShowPassword] = useState(false)
    const handleState = () => {
        setShowPassword((showState) => {
            return !showState
        })
    }
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
                <InputField placeholder="Enter Phone" inputMode="numeric" autoComplete="tel" textContentType="telephoneNumber" className="placeholder:text-gray-500" />
            </Input>
            <Input variant="underlined" size="md" className="mt-5 border-gray-500">
                <InputField placeholder="Enter Password" type={showPassword ? "text" : "password"} className="placeholder:text-gray-500" />
                <InputSlot className="pr-3" onPress={handleState}>
                    <InputIcon as={()=> showPassword ? <Icon name="eye-off-outline" size={24} color="black" /> : <Icon name="eye-outline" size={24} color="black" />} />
                </InputSlot>
            </Input>
            <View className="mt-4 flex-row justify-center">
                <Button size="md" variant="solid" action="secondary" className="w-1/3 bg-black">
                    <ButtonText className="text-white">LOGIN</ButtonText>
                </Button>
            </View>
        </View>
    )
}

export default LoginWithPhone