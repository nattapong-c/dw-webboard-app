"use server"
import { Post, PostDto, PostPagination } from "@/typing/post";
import axios, { AxiosError, AxiosResponse } from "axios"

export const list = async (community?: string, topic?: string, token?: string): Promise<Post[] | undefined> => {
    try {
        const params: any = {
            page: 1,
            size: 600
        };
        if (community) {
            params['community'] = community;
        }
        if (topic) {
            params['topic'] = topic;
        }

        const headers: any = {};
        if (token) {
            headers['Authorization'] = `Bearer ${token}`
        }

        const result = await axios.get<AxiosResponse<PostPagination>>(`${process.env.NEXT_PUBLIC_SERVICE_URL}/post`, {
            params,
            headers
        });

        return result.data.data.posts;
    } catch (error) {
        console.log((error as AxiosError).response?.data)
        // TODO handle error
    }
}

export const create = async (payload: PostDto, token: string) => {
    try {
        await axios.post(`${process.env.NEXT_PUBLIC_SERVICE_URL}/post`, payload, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    } catch (error) {
        console.log((error as AxiosError).response?.data)
        // TODO handle error
    }
}