import type { Post } from "./Post"
import type { Author } from "./Author"
import type { User } from "./User"
export interface apiRequest{
    error: boolean,
    message: String,
    code: Number | String,
    data: Post[] | Author[] | Post | User | Author,
    dataCount?: Number
    token?: String
}


