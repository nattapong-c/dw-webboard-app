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

export const removeUserLocal = () => {
    localStorage.removeItem("x-access");
    localStorage.removeItem("x-user-id");
    localStorage.removeItem("x-user-username");
    localStorage.removeItem("x-user-picture");
}