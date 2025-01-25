import { apiRoutes } from "@/constants/ApiRoutes";
import { getQueryInitialPageParam, getQueryNextPageParam, getQuerySelect, getQueryTotalCount } from "@/constants/QueryClientOptions";
import { api } from "@/utils/axios";
import { GlobalSearchResponseType } from "@/utils/types";
import { InfiniteData } from "@tanstack/react-query";


const getGlobalSearchQueryKey = (search: string) => ["global_search", search];
const getGlobalSearchQueryInitialPageParam = getQueryInitialPageParam;

export const getGlobalSearchQueryFn: (params: {
    pageParam?: any;
    search: string;
})=>Promise<GlobalSearchResponseType> = async ({
    pageParam = 1,
    search
}: {
    pageParam?: any;
    search: string;
}) => {
    const response = await api.get(
        apiRoutes.global_search +
        `?page=${pageParam}&total=${getQueryTotalCount}${search === "" ? "" : "&filter[search]=" + search}`
    );
    return response.data as GlobalSearchResponseType;
}

const getGlobalSearchQueryNextPageParam = (lastPage:GlobalSearchResponseType, allPages:GlobalSearchResponseType[]) => getQueryNextPageParam<GlobalSearchResponseType>(lastPage, allPages)

const getGlobalSearchQuerySelect = (data:InfiniteData<GlobalSearchResponseType, number>) => getQuerySelect<InfiniteData<GlobalSearchResponseType, number>>(data)

export const getGlobalSearchQueryOptions = {
    getGlobalSearchQueryKey,
    getGlobalSearchQueryInitialPageParam,
    getGlobalSearchQueryFn,
    getGlobalSearchQueryNextPageParam,
    getGlobalSearchQuerySelect
}