import { CategoryType } from '@/utils/types'
import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

type Props = {
    item: CategoryType,
    index: number
}

function CategoryCard({item, index}: Props) {
  return (
    <TouchableOpacity style={styles.container}>
        <Image
            src={item.image}
            alt="Logo"
            style={styles.image}
        />
        <View style={styles.textContainer}>
            <Text style={styles.text}>{item.name}</Text>
        </View>
    </TouchableOpacity>
  )
}

export default CategoryCard

const styles  = StyleSheet.create({
    container: {
        borderRadius: 10,
        flex: 1
    },
    image: {
        objectFit: 'cover',
        borderRadius: 10,
        width: '100%',
        height: 120
    },
    textContainer: {
        flex: 1
    },
    text: {
        textAlign: 'center'
    }
});