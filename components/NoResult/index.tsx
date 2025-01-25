import React from 'react'
import { Text } from 'react-native'

type Props = {
    message?: string
}

function NoResult({message="No results found"}: Props) {
  return (
    <Text className="text-center text-lg">{message}</Text>
  )
}

export default NoResult