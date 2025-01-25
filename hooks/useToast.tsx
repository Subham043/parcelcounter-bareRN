import {
    useToast as useToastHook,
    Toast,
    ToastTitle,
    ToastDescription,
  } from "@/components/ui/toast"
import { useState } from "react"

const getRandomId = () => Math.floor(Math.random() * 1000).toString()

export const useSuccessToast = () => {
    const toast = useToastHook()
    const [toastId, setToastId] = useState('')
    const [toastMessage, setToastMessage] = useState<string>('')
    const showSuccessToast = (message : string) => {
      if (!toast.isActive(toastId)) {
        setToastMessage(message)
        showNewToast()
      }
    }
    const showNewToast = () => {
      const newId = getRandomId()
      setToastId(newId)
      toast.show({
        id: newId,
        placement: "top",
        duration: 3000,
        render: ({ id }) => (
            <Toast nativeID={id} action="success" variant="solid">
              <ToastTitle>Success</ToastTitle>
              {toastMessage.length > 0 && <ToastDescription>
                {toastMessage}
              </ToastDescription>}
            </Toast>
        ),
      })
    }

    return {
      showSuccessToast
    }
}

export const useErrorToast = () => {
    const toast = useToastHook()
    const [toastId, setToastId] = useState('')
    const [toastMessage, setToastMessage] = useState<string>('')
    const showErrorToast = (message : string) => {
      if (!toast.isActive(toastId)) {
        setToastMessage(message)
        showNewToast()
      }
    }
    const showNewToast = () => {
      const newId = getRandomId()
      setToastId(newId)
      toast.show({
        id: newId,
        placement: "top",
        duration: 3000,
        render: ({ id }) => (
            <Toast nativeID={id} action="error" variant="solid">
              <ToastTitle>Error</ToastTitle>
              {toastMessage.length > 0 && <ToastDescription>
                {toastMessage}
              </ToastDescription>}
            </Toast>
        ),
      })
    }
    
    return {
      showErrorToast
    }
}