import type { Author } from "./Author"
export interface Post{
    id?: Number,
    title: String,
    body: String,
    authorId: Number,
    userId: Number,
    created_at: Date | String,
    updated_at: Date | String,
    author?: Author
}