import {API_ENDPOINT} from "@env"
import axios, { AxiosInstance } from 'axios';


export const api:AxiosInstance = axios.create({
    baseURL: API_ENDPOINT,
    headers: {
        post: {
            Accept: 'application/json'
        },
        get: {
            Accept: 'application/json'
        }
    },
    withCredentials: false,
})