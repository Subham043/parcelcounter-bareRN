import React from 'react'
import { StyleSheet, Text } from 'react-native'

type Props = {
    message?: string
}

function NoResult({message="No results found"}: Props) {
  return (
    <Text style={styles.text}>{message}</Text>
  )
}

export default NoResult

const styles = StyleSheet.create({
    text:{
        textAlign: 'center',
        fontSize: 18,
        lineHeight: 28,
    }
});