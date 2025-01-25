import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import Icon from 'react-native-vector-icons/Ionicons';
import { FlatList, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import debounce from 'lodash.debounce'
import { useInfiniteQuery } from "@tanstack/react-query";
import { getGlobalSearchQueryOptions } from "@/data/getGlobalSearchQuery";
import { GlobalSearchType } from "@/utils/types";
import SearchCard from "@/components/SearchCard";
import SearchCardLoader from "@/components/SearchCard/Loader";
import NoResult from "@/components/NoResult";
import { useNavigation } from "@react-navigation/native";
import { Text } from "react-native-gesture-handler";


function SearchHeader({ searchHandler, backButtonHandler }: { searchHandler: (e: string) => void, backButtonHandler: () => void }) {
  return (
    <View className="flex-row gap-4 px-4 py-2 w-full bg-white items-center shadow">
      <TouchableOpacity onPressIn={backButtonHandler}>
        <Icon name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <Input className="flex-1">
        <InputSlot className="pl-3">
          <InputIcon as={()=> <Icon name="search" size={24} color="black" />} />
        </InputSlot>
        <InputField placeholder="Search..." onChangeText={searchHandler} autoFocus={true} />
      </Input>
    </View>
  )
}


export default function SearchScreen() {
    const [search, setSearch] = useState<string>('')
    const navigation = useNavigation();

    const {
      fetchNextPage,
      hasNextPage,
      isFetchingNextPage,
      isFetching,
      data
  } = useInfiniteQuery({
      queryKey: getGlobalSearchQueryOptions.getGlobalSearchQueryKey(search),
      queryFn: (param) => getGlobalSearchQueryOptions.getGlobalSearchQueryFn({pageParam: param.pageParam, search}),
      initialPageParam: getGlobalSearchQueryOptions.getGlobalSearchQueryInitialPageParam,
      enabled: search.length>0,
      getNextPageParam: (lastPage, allPages) => getGlobalSearchQueryOptions.getGlobalSearchQueryNextPageParam(lastPage, allPages),
      select: (data) => getGlobalSearchQueryOptions.getGlobalSearchQuerySelect(data),
  })

  const loadMore = () => (!isFetchingNextPage && !isFetching && search.length>0 && hasNextPage) && fetchNextPage({
      cancelRefetch: true,
  })

  const searchHandler = debounce(async (e: string) => {
      setSearch(e);
  }, 500);

  const backButtonHandler = () => navigation.goBack();

    return (
      <SafeAreaView
        style={{
          flex: 1,
        }}
      >
        <SearchHeader searchHandler={searchHandler} backButtonHandler={backButtonHandler} />
        <View className="flex-1 px-4 py-2">
          <FlatList
            data={data ? data.pages as GlobalSearchType[] : []}
            keyExtractor={(_, index) => index.toString()}
            removeClippedSubviews={true}
            onEndReached={loadMore}
            onEndReachedThreshold={5}
            contentContainerStyle={{ gap: 10 }}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => <SearchCard item={item} index={index} />}
            initialNumToRender={8}
            ListEmptyComponent={() => (!isFetchingNextPage && !isFetching && search.length>0) && <NoResult />}
            ListFooterComponent={() => (isFetchingNextPage || isFetching) && <SearchCardLoader />}
          />
        </View>
      </SafeAreaView>
    );
  }