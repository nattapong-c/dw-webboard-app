import { User } from "@/typing/user";

export const getUserLocal = (): User => {
    const userId = localStorage.getItem("x-user-id") as string;
    const username = localStorage.getItem("x-user-username") as string;
    const picture = localStorage.getItem("x-user-picture") as string;
    return {
        _id: userId,
        username,
        picture
    }
}