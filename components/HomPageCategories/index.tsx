import { getCategoriesQueryOptions } from '@/data/getCategoriesQuery'
import { CategoryType } from '@/utils/types'
import { useInfiniteQuery } from '@tanstack/react-query'
import React from 'react'
import { FlatList, Text, View, TouchableOpacity } from 'react-native'
import NoResult from '../NoResult'
import CategoryCard from './CategoryCard'
import CategoryCardLoader from './Loader'
import Carousel from "@/components/Carousel";
import Icon from 'react-native-vector-icons/AntDesign';


const ListHeaderComponent = () => (
  <>
    <Carousel />
    <View className='flex-row items-center justify-between px-4 pt-5'>
      <Text className="text-xl italic font-medium">What are you looking for?</Text>
      <TouchableOpacity className='gap-2 flex-row'><Text className='underline'>Show More</Text><Icon name="right" size={12} color="black" /></TouchableOpacity>
    </View>
  </>
)

function HomPageCategories() {
  const {
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
    data
  } = useInfiniteQuery({
    queryKey: getCategoriesQueryOptions.getCategoriesInfiniteQueryKey,
    queryFn: (param) => getCategoriesQueryOptions.getCategoriesQueryFn({ pageParam: param.pageParam }),
    initialPageParam: getCategoriesQueryOptions.getCategoriesQueryInitialPageParam,
    getNextPageParam: (lastPage, allPages) => getCategoriesQueryOptions.getCategoriesQueryNextPageParam(lastPage, allPages),
    select: (data) => getCategoriesQueryOptions.getCategoriesQuerySelect(data),
  })

  const loadMore = () => (!isFetchingNextPage && !isFetching && hasNextPage) && fetchNextPage({
    cancelRefetch: true
  });

  return (
    <FlatList
      data={data ? data.pages as CategoryType[] : []}
      keyExtractor={(_, index) => index.toString()}
      removeClippedSubviews={true}
      onEndReached={loadMore}
      onEndReachedThreshold={5}
      showsVerticalScrollIndicator={false}
      renderItem={({ item, index }) => <CategoryCard item={item} index={index} />}
      initialNumToRender={16}
      numColumns={4}
      columnWrapperClassName='px-4 py-2 gap-3'
      ListHeaderComponent={ListHeaderComponent}
      ListEmptyComponent={() => (!isFetchingNextPage && !isFetching) && <View className='flex-1 px-4 py-3'><NoResult /></View>}
      ListFooterComponent={() => (isFetchingNextPage && isFetching) && <View className='flex-1 px-4 py-2'><CategoryCardLoader /></View>}
    />
  )
}

export default HomPageCategories