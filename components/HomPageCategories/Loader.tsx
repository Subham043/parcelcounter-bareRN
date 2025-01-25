import React from 'react'
import { View } from 'react-native'
import { Skeleton } from '../ui/skeleton'

function CategoryCardLoader() {
  return (
    <View className="flex-1 flex-row flex-wrap justify-around items-center gap-1">
        {
            Array.from({ length: 12 }).map((_, index) => (<Skeleton variant="sharp" className="h-[130px] w-[80px] rounded-lg" key={index} />))
        }
    </View>
  )
}

export default CategoryCardLoader