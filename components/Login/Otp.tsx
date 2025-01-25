import { Text, TouchableOpacity, View } from "react-native"
import { Input, InputField, InputSlot } from "../ui/input"
import { Button, ButtonText } from "../ui/button"
import { Fragment, useEffect, useState } from "react"
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from 'react-hook-form';
import { apiRoutes } from "@/constants/ApiRoutes"
import { api } from "@/utils/axios"
import { Spinner } from "../ui/spinner"
import colors from "tailwindcss/colors"
import { ErrorMessage } from "@hookform/error-message";
import { useToast } from "@/hooks/useToast";
import {
    getHash,
    useOtpVerify,
    requestHint
} from 'react-native-otp-verify';

const schema = yup
    .object({
        phone: yup
            .string()
            .required()
            .min(10, "Must be exactly 10 digits")
            .max(10, "Must be exactly 10 digits"),
        otp: yup
            .string()
            .required()
            .min(4, "Must be exactly 4 digits")
            .max(4, "Must be exactly 4 digits"),
    })
    .required();

const phoneSchema = yup
    .object({
        phone: yup
            .string()
            .required()
            .min(10, "Must be exactly 10 digits")
            .max(10, "Must be exactly 10 digits"),
    })
    .required();


const LoginWithOtp = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [otpLoading, setOtpLoading] = useState<boolean>(false);
    const { showSuccessToast, showErrorToast } = useToast()
    const { otp, timeoutError, stopListener, startListener } = useOtpVerify({numberOfDigits: 4});

    const {
        control,
        handleSubmit,
        getValues,
        reset,
        setError,
        setValue: setOtp,
    } = useForm({
        resolver: yupResolver(schema),
    });
    
    const {
        handleSubmit: otpHandleSubmit,
        setValue,
        formState: { errors: otpErrors },
    } = useForm({
        resolver: yupResolver(phoneSchema),
    });

    const onSendOtp = async () => {
        setOtpLoading(true);
        try {
            const hash = await getHash();
            if(hash.length > 0){
                await api.post(apiRoutes.login_phone_otp_auto_read, { phone: getValues().phone, hash: hash[0] });
            }else{
                await api.post(apiRoutes.login_phone_otp, { phone: getValues().phone });
            }
            showSuccessToast("Otp sent successfully.");
            startListener();
          
        } catch (error: any) {
          if (error?.response?.data?.message) {
            showErrorToast(error?.response?.data?.message);
          }
          if (error?.response?.data?.errors?.phone) {
            setError("phone", {
              type: "server",
              message: error?.response?.data?.errors?.phone[0],
            });
          }
        } finally {
          setOtpLoading(false);
        }
    }

    const onSubmit = async () => {
        setLoading(true);
        try {
            const response = await api.post(apiRoutes.login_phone, getValues());
            showSuccessToast('Logged in seccessfully.');
            reset({
                phone: "",
                otp: "",
            });
        } catch (error: any) {
            if (error?.response?.data?.message) {
                showErrorToast(error?.response?.data?.message);
            }
            if (error?.response?.data?.errors?.phone) {
                setError("phone", {
                    type: "server",
                    message: error?.response?.data?.errors?.phone[0],
                });
            }
            if (error?.response?.data?.errors?.otp) {
                setError("otp", {
                    type: "server",
                    message: error?.response?.data?.errors?.otp[0],
                });
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (timeoutError) {
            stopListener();
        }
    }, [timeoutError]);

    useEffect(() => {
        return () => {
            stopListener();
        };
    }, []);

    useEffect(() => {
        if (otp) {
            setOtp('otp', otp);
            stopListener();
        }
    }, [otp]);

    const requestPhoneNumber = async () => {
        try {
            const phone = await requestHint();
            setOtp('phone', phone);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        requestPhoneNumber();
    }, []);

    return (
        <View className="w-full px-5">
            <View className="w-full">
                <Controller
                    name="phone"
                    control={control}
                    render={({ field: { onChange, onBlur, value, }, formState: { errors } }) => (
                        <Fragment>
                            <Input
                                variant="underlined"
                                size="md"
                                isInvalid={errors.phone ? true : false}
                                className="mt-5 border-gray-500"
                            >
                                <InputField
                                    placeholder="Enter Phone" 
                                    inputMode="numeric" 
                                    autoComplete="tel" 
                                    textContentType="telephoneNumber" 
                                    className="placeholder:text-gray-500" 
                                    value={value} 
                                    onBlur={onBlur} 
                                    onChangeText={(val) => {onChange(val); setValue('phone', val)}} 
                                />
                                <InputSlot className="pl-3">
                                    <TouchableOpacity className="w-auto bg-black px-2 py-1 rounded-lg" disabled={otpLoading} onPress={otpHandleSubmit(onSendOtp)}>
                                        {otpLoading ? <Spinner size="small" color={colors.gray[100]} /> : <Text className="text-white">Send OTP</Text>}
                                    </TouchableOpacity>
                                </InputSlot>
                            </Input>
                            <ErrorMessage
                                errors={errors}
                                name="phone"
                                as={<Text className="text-red-500" />}
                            />
                            <ErrorMessage
                                errors={otpErrors}
                                name="phone"
                                as={<Text className="text-red-500" />}
                            />
                        </Fragment>
                    )}
                />
            </View>
            <View className="w-full">
                <Controller
                    name="otp"
                    control={control}
                    render={({ field: { onChange, onBlur, value, }, formState: { errors } }) => (
                        <Fragment>
                            <Input
                                variant="underlined"
                                size="md"
                                isInvalid={errors.otp ? true : false}
                                className="mt-5 border-gray-500"
                            >
                                <InputField placeholder="Enter OTP" inputMode="numeric" className="placeholder:text-gray-500" autoComplete="sms-otp" textContentType="oneTimeCode" value={value} onBlur={onBlur} onChangeText={onChange} />
                            </Input>
                            <ErrorMessage
                                errors={errors}
                                name="otp"
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

export default LoginWithOtp