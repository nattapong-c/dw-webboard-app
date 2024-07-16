import { User } from "./user";

export interface Comment {
    _id: string;
    message: string;
    user: User;
    post_id: string;
    created_at: Date;
}

export interface CommentDto {
    message: string;
    post_id: string;
}