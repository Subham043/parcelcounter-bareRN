import Toast from 'react-native-toast-message';

export const useToast = () => {

    const showSuccessToast = (msg: string) => {
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: msg
      });
    }

    const showErrorToast = (msg: string) => {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: msg
      });
    }

    return {
      showSuccessToast,
      showErrorToast
    }
}