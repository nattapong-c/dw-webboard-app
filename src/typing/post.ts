import { Comment } from "./comment";
import { User } from "./user";

enum CommunityEnum {
    'History', 'Food', 'Pets', 'Health', 'Fashion', 'Exercise', 'Others'
}

export type CommunityType = keyof typeof CommunityEnum;

export interface Post {
    _id: string;
    community: CommunityType;
    topic: string;
    content: string;
    comment_count: number;
    user: User;
    comments?: Comment[];
    created_at: Date;
}

export interface PostPagination {
    posts: Post[];
    total_page: number;
    total_item: number;
}

export interface PostDto {
    topic: string,
    content: string,
    community: CommunityType,
}