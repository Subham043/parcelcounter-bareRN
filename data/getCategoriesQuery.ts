import { apiRoutes } from "@/constants/ApiRoutes";
import { getQueryInitialPageParam, getQueryNextPageParam, getQuerySelect, getQueryTotalCount } from "@/constants/QueryClientOptions";
import { api } from "@/utils/axios";
import { CategoryResponseType } from "@/utils/types";
import { InfiniteData } from "@tanstack/react-query";

const getCategoriesQueryKey = ["categories"];
const getCategoriesInfiniteQueryKey = ["categories_infinite"];
const getCategoriesQueryInitialPageParam = getQueryInitialPageParam;

const getCategoriesQueryFn: (params: {
    pageParam?: any
})=>Promise<CategoryResponseType> = async ({
    pageParam = 1
}: {
    pageParam?: any
}) => {
    const response = await api.get(
        apiRoutes.categories +
        `?page=${pageParam}&total=${getQueryTotalCount}&sort=name`
    );
    return response.data as CategoryResponseType;
}

const getCategoriesQueryNextPageParam = (lastPage:CategoryResponseType, allPages:CategoryResponseType[]) => getQueryNextPageParam<CategoryResponseType>(lastPage, allPages)

const getCategoriesQuerySelect = (data:InfiniteData<CategoryResponseType, number>) => getQuerySelect<InfiniteData<CategoryResponseType, number>>(data)

export const getCategoriesQueryOptions = {
    getCategoriesQueryKey,
    getCategoriesInfiniteQueryKey,
    getCategoriesQueryInitialPageParam,
    getCategoriesQueryFn,
    getCategoriesQueryNextPageParam,
    getCategoriesQuerySelect
}