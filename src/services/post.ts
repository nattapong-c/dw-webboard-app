"use server"
import { Post, PostDto, PostPagination } from "@/typing/post";
import { responseError } from "@/utils/error";
import axios, { AxiosResponse } from "axios"
import { z } from 'zod';

export const list = async (community?: string, topic?: string, token?: string, isPrivate?: boolean): Promise<Post[] | undefined> => {
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
        if (isPrivate) {
            params['private'] = isPrivate
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
        throw new Error(responseError(error));
    }
}

export const create = async (payload: PostDto, token: string) => {
    try {
        const schema = z.object({
            topic: z.string().trim().min(1, { message: "required title." }),
            content: z.string().trim().min(1, { message: "required content." }),
            community: z.string({ message: "required community." })
        });

        schema.parse({ ...payload })

        await axios.post(`${process.env.NEXT_PUBLIC_SERVICE_URL}/post`, payload, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    } catch (error: any) {
        throw new Error(responseError(error));
    }
}

export const update = async (id: string, payload: PostDto, token: string) => {
    try {
        const schema = z.object({
            topic: z.string().trim().min(1, { message: "required title." }),
            content: z.string().trim().min(1, { message: "required content." }),
            community: z.string({ message: "required community." })
        });

        schema.parse({ ...payload })

        await axios.put(`${process.env.NEXT_PUBLIC_SERVICE_URL}/post/${id}`, payload, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    } catch (error) {
        throw new Error(responseError(error));
    }
}

export const deletePost = async (id: string, token: string) => {
    try {
        await axios.delete(`${process.env.NEXT_PUBLIC_SERVICE_URL}/post/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    } catch (error) {
        throw new Error(responseError(error));
    }
}

export const get = async (id: string): Promise<Post | undefined> => {
    try {
        const result = await axios.get<AxiosResponse<Post>>(`${process.env.NEXT_PUBLIC_SERVICE_URL}/post/${id}`)
        return result.data.data;
    } catch (error) {
        throw new Error(responseError(error));
    }
}