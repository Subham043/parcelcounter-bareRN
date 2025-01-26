import Toast from 'react-native-toast-message';

export const useToast = () => {

    const showSuccessToast = (msg: string) => {
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: msg,
        text1Style: { fontSize: 18, fontWeight: 'bold', fontStyle: 'italic' },
        text2Style: { fontSize: 14, fontWeight: 'normal', color: '#4d4d4d' },
      });
    }

    const showErrorToast = (msg: string) => {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: msg,
        text1Style: { fontSize: 18, fontWeight: 'bold', fontStyle: 'italic' },
        text2Style: { fontSize: 14, fontWeight: 'normal', color: '#4d4d4d' },
      });
    }

    return {
      showSuccessToast,
      showErrorToast
    }
}