import { DeletePostDTO } from "../dtos/post/deletePost.dto"
import { POST_EXISTS_LIKE, PostsDB, likeDeslikeDB }  from "../models/Posts"
import { BaseDatabase } from "./BaseDataBase"


export class PostsDataBase extends BaseDatabase{
    private static POST_TABLE = "posts"
    private static POST_TABLE_LIKES = "likes_dislikes"

    public getAllPosts = async (): Promise <PostsDB[]> => {
        const result: PostsDB[] = await BaseDatabase.connection(PostsDataBase.POST_TABLE)
        return result
        

    }

    public async findPost(input: string | undefined): Promise<PostsDB[]> {
        let postsDB
    
        if (input) {
          const result: PostsDB[] = await BaseDatabase
            .connection(PostsDataBase.POST_TABLE)
            .where("id", "LIKE", `%${input}%`)
    
          postsDB = result
        } else {
          const result: PostsDB[] = await BaseDatabase
            .connection(PostsDataBase.POST_TABLE)
    
          postsDB = result
        }
    
        return postsDB
      }

    
 
    public createNewPost = async (input:PostsDB ):Promise<void> =>{

        await BaseDatabase.connection(PostsDataBase.POST_TABLE).insert(input)

    }


    public editNewPost = async (input: PostsDB):Promise<void> =>{
        await BaseDatabase.connection(PostsDataBase.POST_TABLE).update(input).where({id:input.id})
    }

    public deletePost = async (input:DeletePostDTO)=>{
        await BaseDatabase.connection(PostsDataBase.POST_TABLE).del().where({id:input.id})
    }

    public findIfExistLikeDislike =async (inputLike:likeDeslikeDB): Promise <POST_EXISTS_LIKE | undefined> =>{

        const [existsOrNot]: Array<likeDeslikeDB> = await BaseDatabase.connection(PostsDataBase.POST_TABLE_LIKES).select().where({user_id:inputLike.user_id, post_id: inputLike.post_id})

        if(existsOrNot === undefined){

            return undefined
            
        }else if (existsOrNot.like === 1){
            return POST_EXISTS_LIKE.LIKED
        }else if(existsOrNot.like === 0)return POST_EXISTS_LIKE.DISLIKED
    }

    public addLD = async(inputLike: likeDeslikeDB):Promise<void>=>{
        await BaseDatabase.connection(PostsDataBase.POST_TABLE_LIKES).insert(inputLike)
    } 

    public removeLD = async (inputLike: likeDeslikeDB): Promise <void>=>{
        await BaseDatabase.connection(PostsDataBase.POST_TABLE_LIKES).delete().where({user_id:inputLike.user_id, post_id:inputLike.post_id})
    }

    public updateLD = async(inputLike: likeDeslikeDB):Promise<void>=>{
        await BaseDatabase.connection(PostsDataBase.POST_TABLE_LIKES).update(inputLike).where({user_id:inputLike.user_id, post_id: inputLike.post_id })
    }

    

  
} 


  