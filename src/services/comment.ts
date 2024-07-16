'use server';

import { CommentDto } from "@/typing/comment";
import axios, { AxiosError, AxiosResponse } from "axios"

export const create = async (payload: CommentDto, token: string) => {
    try {
        await axios.post(`${process.env.NEXT_PUBLIC_SERVICE_URL}/comment`, payload, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    } catch (error) {
        console.log((error as AxiosError).response?.data)
        // TODO handle error
    }
}

export const deleteComment = async (id: string, token: string) => {
    try {
        await axios.delete(`${process.env.NEXT_PUBLIC_SERVICE_URL}/comment/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    } catch (error) {
        console.log((error as AxiosError).response?.data)
        // TODO handle error
    }
}