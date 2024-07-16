'use server';

import { CommentDto } from "@/typing/comment";
import { responseError } from "@/utils/error";
import axios from "axios"
import { z } from 'zod';

export const create = async (payload: CommentDto, token: string) => {
    try {
        const schema = z.object({
            message: z.string().trim().min(1, { message: "required message." }),
            post_id: z.string(),
        });

        schema.parse({ ...payload })

        await axios.post(`${process.env.NEXT_PUBLIC_SERVICE_URL}/comment`, payload, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    } catch (error) {
        throw new Error(responseError(error));
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
        throw new Error(responseError(error));
    }
}