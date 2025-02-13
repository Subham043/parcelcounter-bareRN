import { Fragment, useState } from "react"
import { StyleSheet, Text, View } from "react-native"
import { Input, InputField, InputIcon, InputSlot } from "../ui/input"
import { Button, ButtonText } from "../ui/button"
import Icon from 'react-native-vector-icons/Ionicons';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from 'react-hook-form';
import { apiRoutes } from "@/constants/ApiRoutes"
import { api } from "@/utils/axios"
import { Spinner } from "../ui/spinner"
import colors from "tailwindcss/colors"
import { ErrorMessage } from "@hookform/error-message";
import { useToast } from "@/hooks/useToast";

const schema = yup
    .object({
        phone: yup
            .string()
            .required()
            .min(10, "Must be exactly 10 digits")
            .max(10, "Must be exactly 10 digits"),
        password: yup.string().required(),
    })
    .required();

const LoginWithPhone = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const handleState = () => setShowPassword((showState) => {
        return !showState
    })

    const { showSuccessToast, showErrorToast } = useToast()

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
            const response = await api.post(apiRoutes.login_phone_password, getValues());
            showSuccessToast('Logged in seccessfully.');
            reset({
                phone: "",
                password: "",
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
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <Controller
                    name="phone"
                    control={control}
                    render={({ field: { onChange, onBlur, value, }, formState: { errors } }) => (
                        <Fragment>
                            <Input
                                variant="underlined"
                                size="md"
                                isInvalid={errors.phone ? true : false}
                                style={styles.input}
                            >
                                <InputField placeholder="Enter Phone" inputMode="numeric" autoComplete="tel" textContentType="telephoneNumber" className="placeholder:text-gray-500" value={value} onBlur={onBlur} onChangeText={onChange} />
                            </Input>
                            <ErrorMessage
                                errors={errors}
                                name="phone"
                                as={<Text style={styles.errorText} />}
                            />
                        </Fragment>
                    )}
                />
            </View>
            <View style={styles.inputContainer}>
                <Controller
                    name="password"
                    control={control}
                    render={({ field: { onChange, onBlur, value, }, formState: { errors } }) => (
                        <Fragment>
                            <Input variant="underlined" size="md" style={styles.input} isInvalid={errors.phone ? true : false}>
                                <InputField placeholder="Enter Password" type={showPassword ? "text" : "password"} className="placeholder:text-gray-500" value={value} onBlur={onBlur} onChangeText={onChange} />
                                <InputSlot style={styles.inputIcon} onPress={handleState}>
                                    <InputIcon as={() => showPassword ? <Icon name="eye-off-outline" size={24} color="black" /> : <Icon name="eye-outline" size={24} color="black" />} />
                                </InputSlot>
                            </Input>
                            <ErrorMessage
                                errors={errors}
                                name="password"
                                as={<Text style={styles.errorText} />}
                            />
                        </Fragment>
                    )}
                />
            </View>
            <View style={styles.buttonContainer}>
                <Button size="md" variant="solid" action="secondary" style={styles.button} disabled={loading} onPress={handleSubmit(onSubmit)}>
                    {loading ? <Spinner size="small" color={colors.gray[100]} /> : <ButtonText style={styles.buttonText}>LOGIN</ButtonText>}
                </Button>
            </View>
        </View>
    )
}

export default LoginWithPhone

const styles = StyleSheet.create({
    container:{
        width: '100%',
        paddingHorizontal: 20
    },
    inputContainer:{
        width: '100%',
    },
    input:{
        marginTop: 20,
        borderColor: '#6b7280',
    },
    inputIcon:{
        paddingLeft: 12,
    },
    errorText:{
        color: 'red',
    },
    buttonContainer:{
        marginTop: 16,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    button:{
        width: '33.33%',
        backgroundColor: '#000',
    },
    buttonText:{
        color: '#fff',
    }
});