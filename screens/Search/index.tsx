import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import Icon from 'react-native-vector-icons/Ionicons';
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
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


function SearchHeader({ searchHandler, backButtonHandler }: { searchHandler: (e: string) => void, backButtonHandler: () => void }) {
  return (
    <View style={styles.searchBarContainer} className="shadow">
      <TouchableOpacity onPressIn={backButtonHandler}>
        <Icon name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <Input style={styles.input}>
        <InputSlot style={styles.inputSlot}>
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
        style={styles.container}
      >
        <SearchHeader searchHandler={searchHandler} backButtonHandler={backButtonHandler} />
        <View style={styles.wrapper}>
          <FlatList
            data={data ? data.pages as GlobalSearchType[] : []}
            keyExtractor={(_, index) => index.toString()}
            removeClippedSubviews={true}
            onEndReached={loadMore}
            onEndReachedThreshold={5}
            contentContainerStyle={styles.contentContainerStyle}
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    wrapper:{
      flex: 1,
      paddingHorizontal: 16,
      paddingVertical: 8,
    },
    searchBarContainer: {
        flexDirection: 'row',
        gap: 20,
        paddingHorizontal: 16,
        paddingVertical: 8,
        width: '100%',
        backgroundColor: 'white',
        alignItems: 'center',
    },
    input:{
      flex: 1,
    },
    inputSlot:{
      paddingLeft: 12,
    },
    contentContainerStyle:{
      gap: 10,
    }
});