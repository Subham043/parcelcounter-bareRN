import { Fragment, useState } from "react"
import { View, Text } from "react-native"
import { Input, InputField, InputIcon, InputSlot } from "../ui/input"
import Icon from 'react-native-vector-icons/Ionicons';
import { Button, ButtonText } from "../ui/button"
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from 'react-hook-form';
import { apiRoutes } from "@/constants/ApiRoutes"
import { api } from "@/utils/axios"
import { Spinner } from "../ui/spinner"
import colors from "tailwindcss/colors"
import { ErrorMessage } from "@hookform/error-message";
import { useErrorToast, useSuccessToast } from "@/hooks/useToast"

const schema = yup
 .object({
  email: yup.string().email().required(),
  password: yup.string().required(),
 })
 .required();


const LoginWithEmail = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const handleState = () => setShowPassword((showState) => {
        return !showState
    })

    const {showSuccessToast} = useSuccessToast()
    const {showErrorToast} = useErrorToast()

    const {
        control,
        handleSubmit,
        getValues,
        reset,
        setError,
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async () => {
        setLoading(true);
        try {
         const response = await api.post(apiRoutes.login, getValues());
         showSuccessToast('Logged in seccessfully.');
         reset({
          email: "",
          password: "",
         });
        } catch (error: any) {
         if (error?.response?.data?.message) {
            showErrorToast(error?.response?.data?.message);
         }
         if (error?.response?.data?.errors?.email) {
          setError("email", {
           type: "server",
           message: error?.response?.data?.errors?.email[0],
          });
         }
         if (error?.response?.data?.errors?.password) {
          setError("password", {
           type: "server",
           message: error?.response?.data?.errors?.password[0],
          });
         }
        } finally {
         setLoading(false);
        }
       };
    
    return (
        <View className="w-full px-5">
            <View className="w-full">
                <Controller
                    name="email"
                    control={control}
                    render={({ field: { onChange, onBlur, value,  }, formState: { errors } }) => (
                        <Fragment>
                            <Input
                                variant="underlined"
                                size="md"
                                isInvalid={errors.email ? true : false}
                                className="mt-5 border-gray-500"
                            >
                                <InputField placeholder="Enter Email" inputMode="email" className="placeholder:text-gray-500" autoComplete="email" textContentType="emailAddress" value={value} onBlur={onBlur} onChangeText={onChange} />
                            </Input>
                            <ErrorMessage
                                errors={errors}
                                name="email"
                                as={<Text className="text-red-500" />}
                            />
                        </Fragment>        
                    )}
                />
            </View>
            <View className="w-full">
            <Controller
                    name="password"
                    control={control}
                    render={({ field: { onChange, onBlur, value,  }, formState: { errors } }) => (
                        <Fragment>
                            <Input variant="underlined" size="md" className="mt-5 border-gray-500" isInvalid={errors.email ? true : false}>
                                <InputField placeholder="Enter Password" type={showPassword ? "text" : "password"} className="placeholder:text-gray-500" value={value} onBlur={onBlur} onChangeText={onChange} />
                                <InputSlot className="pr-3" onPress={handleState}>
                                    <InputIcon as={()=> showPassword ? <Icon name="eye-off-outline" size={24} color="black" /> : <Icon name="eye-outline" size={24} color="black" />} />
                                </InputSlot>
                            </Input>
                            <ErrorMessage
                                errors={errors}
                                name="password"
                                as={<Text className="text-red-500" />}
                            />
                        </Fragment>        
                    )}
                />
            </View>
            <View className="mt-4 flex-row justify-center">
                <Button size="md" variant="solid" action="secondary" className="w-1/3 bg-black" disabled={loading} onPress={handleSubmit(onSubmit)}>
                    {loading ? <Spinner size="small" color={colors.gray[100]} /> : <ButtonText className="text-white">LOGIN</ButtonText>}
                </Button>
            </View>
        </View>
    )
}

export default LoginWithEmail