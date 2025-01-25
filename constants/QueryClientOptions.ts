import { focusManager, InfiniteData, QueryClient, QueryClientConfig } from "@tanstack/react-query";
import { AppStateStatus, Platform } from "react-native";

export const QueryClientOptions: QueryClientConfig = {
  defaultOptions: {
    queries: {
      // With SSR, we usually want to set some default staleTime
      // above 0 to avoid refetching immediately on the client
      // see https://tanstack.com/query/v4/docs/guides/ssr#react
      staleTime: undefined,
      refetchOnWindowFocus: false,
      refetchIntervalInBackground: false,
      refetchInterval: false,
      retry: 2,
      retryDelay: 3000,
    },
  },
};

export const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: 2 } },
})

export function onAppStateChange(status: AppStateStatus) {
    // React Query already supports in web browser refetch on window focus by default
    if (Platform.OS !== 'web') {
        focusManager.setFocused(status === 'active')
    }
}


export const getQueryInitialPageParam = 1;

export const getQueryTotalCount = 20;

export const getQuerySelect = <T>(data:InfiniteData<T|any, number>) => {
  return {
      ...data,
      pages: data.pages.flatMap((page) => page.data),
  }
}

export const getQueryNextPageParam = <T>(lastPage:T|any, allPages:T[]|any[]) => {
  const morePagesExist =
      allPages.flatMap((page) => page.data).length !==
      lastPage.meta.total;
  if (morePagesExist) {
      return allPages.length + 1;
  }
  return undefined;
}