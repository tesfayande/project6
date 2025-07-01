import { User } from "./user.interface";

export interface Comment{
    id?: number,
    postId: number,
    user?: User,
    content:string,
    createdAt: Date,
    updatedAt: Date,
}