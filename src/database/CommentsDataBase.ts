 import { CommentPostsDB, POST_EXISTS_LIKE, likeDeslikeDB } from "../models/Comments"
import { BaseDatabase } from "./BaseDataBase"
import { PostsDataBase } from "./PostsDataBase"


export class CommentsDataBase extends BaseDatabase{
    private static POST = "post_comments"
    private static POST_TABLE_LIKES = "likes_dislikes"

    public getAllCommentsPosts = async(id:any) : Promise <CommentPostsDB[]> => {
        
    const result = await BaseDatabase.connection(CommentsDataBase.POST).where("post_id", "LIKE", `${id}`)
        return result
        
    } 

    public getAllComments = async() : Promise <CommentPostsDB[]> => {
        
        const result = await BaseDatabase.connection(CommentsDataBase.POST)
            return result
            
        } 


    public createNewPostComment = async (post:CommentPostsDB):Promise<void> =>{
        
        await BaseDatabase.connection(CommentsDataBase.POST).insert(post)

    }


    public editNewPost = async (input: CommentPostsDB):Promise<void> =>{
        await BaseDatabase.connection(CommentsDataBase.POST).update(input).where({id:input.id})
    }

    public findIfExistLikeDislike =async (inputLike:likeDeslikeDB): Promise <POST_EXISTS_LIKE | undefined> =>{

        const [existsOrNot]: Array<likeDeslikeDB> = await BaseDatabase.connection(CommentsDataBase.POST_TABLE_LIKES).select().where({user_id:inputLike.user_id, post_id: inputLike.post_id})

        if(existsOrNot === undefined){

            return undefined
            
        }else if (existsOrNot.like === 1){
            return POST_EXISTS_LIKE.LIKED
        }else if(existsOrNot.like === 0)return POST_EXISTS_LIKE.DISLIKED
    }

    public addLD = async(inputLike: likeDeslikeDB):Promise<void>=>{
        await BaseDatabase.connection(CommentsDataBase.POST_TABLE_LIKES).insert(inputLike)
    } 

    public removeLD = async (inputLike: likeDeslikeDB): Promise <void>=>{
        await BaseDatabase.connection(CommentsDataBase.POST_TABLE_LIKES).delete().where({user_id:inputLike.user_id, post_id:inputLike.post_id})
    }

    public updateLD = async(inputLike: likeDeslikeDB):Promise<void>=>{
        await BaseDatabase.connection(CommentsDataBase.POST_TABLE_LIKES).update(inputLike).where({user_id:inputLike.user_id, post_id: inputLike.post_id })
    }
     

}


 