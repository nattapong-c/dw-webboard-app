import { User } from "./user";

export interface Comment {
    _id: string;
    message: string;
    user: User;
    created_at: Date;
}