import { CategoryType } from '@/utils/types'
import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'

type Props = {
    item: CategoryType,
    index: number
}

function CategoryCard({item, index}: Props) {
  return (
    <TouchableOpacity className="flex-1 rounded-lg" style={{ borderRadius: 10 }} key={index}>
        <Image
            src={item.image}
            alt="Logo"
            style={{ resizeMode: 'cover', objectFit: 'cover', borderRadius: 10, width: '100%', height: 128 }}
        />
        <View className="flex-1">
            <Text className="text-base text-center">{item.name}</Text>
        </View>
    </TouchableOpacity>
  )
}

export default CategoryCard