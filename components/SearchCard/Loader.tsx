import React from 'react'
import { View } from 'react-native'
import { Skeleton } from '../ui/skeleton'

function SearchCardLoader() {
  return (
    <View className="flex-1 gap-2">
        {
            Array.from({ length: 6 }).map((_, index) => (<Skeleton variant="sharp" className="h-[130px] rounded-lg" key={index} />))
        }
    </View>
  )
}

export default SearchCardLoader