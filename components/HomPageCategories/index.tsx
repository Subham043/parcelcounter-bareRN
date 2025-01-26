import { getCategoriesQueryOptions } from '@/data/getCategoriesQuery'
import { CategoryType } from '@/utils/types'
import { useInfiniteQuery } from '@tanstack/react-query'
import React from 'react'
import { FlatList, Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import NoResult from '../NoResult'
import CategoryCard from './CategoryCard'
import CategoryCardLoader from './Loader'
import Carousel from "@/components/Carousel";
import Icon from 'react-native-vector-icons/AntDesign';


const ListHeaderComponent = () => (
  <>
    <Carousel />
    <View style={styles.headingContainer}>
      <Text style={styles.heading}>What are you looking for?</Text>
      <TouchableOpacity style={styles.button}><Text style={styles.buttonText}>Show More</Text></TouchableOpacity>
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
      columnWrapperStyle={styles.columnWrapperStyle}
      ListHeaderComponent={ListHeaderComponent}
      ListEmptyComponent={() => (!isFetchingNextPage && !isFetching) && <View className='flex-1 px-4 py-3'><NoResult /></View>}
      ListFooterComponent={() => (isFetchingNextPage && isFetching) && <View className='flex-1 px-4 py-2'><CategoryCardLoader /></View>}
    />
  )
}

export default HomPageCategories

const styles = StyleSheet.create({
  columnWrapperStyle: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 12
  },
  headingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 20
  },
  heading:{
    fontSize: 20,
    lineHeight: 28,
    fontWeight: 500,
    fontStyle: 'italic'
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2
  },
  buttonText: {
    textDecorationLine: 'underline'
  }
});