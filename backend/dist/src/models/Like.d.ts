import { Post } from './Post';
import { User } from './User';
export declare class Like {
    id: number;
    post: Post;
    user: User;
    created_at: Date;
}
