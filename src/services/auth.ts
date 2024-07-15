"use server"
import axios, { AxiosError, AxiosResponse } from "axios"

import { TokenResponse } from "@/typing/auth";
import { User } from "@/typing/user";

export const login = async (username: string): Promise<TokenResponse | undefined> => {
    try {
        const result = await axios.post<AxiosResponse<TokenResponse>>(`${process.env.NEXT_PUBLIC_SERVICE_URL}/auth/login`, {
            username
        });

        return result.data.data;
    } catch (error) {
        console.log((error as AxiosError).response?.data)
        // TODO handle error
    }
}

export const getMe = async (token: string): Promise<User | undefined> => {
    try {
        const result = await axios.get<AxiosResponse<User>>(`${process.env.NEXT_PUBLIC_SERVICE_URL}/auth/me`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        return result.data.data;
    } catch (error) {
        console.log((error as AxiosError).response?.data)
        // TODO handle error
    }
}