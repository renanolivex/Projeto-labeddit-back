 import { CommentPostsDB } from "../models/Comments"
import { BaseDatabase } from "./BaseDataBase"
import { PostsDataBase } from "./PostsDataBase"

export class CommentsDataBase extends BaseDatabase{
    private static POST = "post_comments"
    private static POST_POST = "posts"
    private static POST_TABLE_LIKES = "likes_dislikes"

    public getAllCommentsPosts = async (): Promise <CommentPostsDB[]> => {
        const result = await BaseDatabase.connection(CommentsDataBase.POST)
        return result
        
    } 

    public createNewPostComment = async (post:CommentPostsDB):Promise<void> =>{
        
        await BaseDatabase.connection(CommentsDataBase.POST).insert(post)

       
       
    }

     

}


 