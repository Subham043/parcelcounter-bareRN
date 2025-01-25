import { GlobalSearchType } from '@/utils/types'
import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'

type Props = {
    item: GlobalSearchType,
    index: number
}

function SearchCard({item, index}: Props) {
  return (
    <TouchableOpacity className="flex-row items-center justify-between gap-2 bg-white rounded-lg shadow" key={index}>
        <View className="w-40 h-32">
        <Image
            src={item.image}
            alt="Logo"
            style={{ resizeMode: 'cover', objectFit: 'cover', width: '100%', height: '100%' }}
        />
        </View>
        <View className="flex-1">
        <Text className="text-lg font-bold" numberOfLines={1}>{item.name}</Text>
        <Text className="text-sm text-green-600" numberOfLines={1}>{item.search_type}</Text>
        </View>
    </TouchableOpacity>
  )
}

export default SearchCard