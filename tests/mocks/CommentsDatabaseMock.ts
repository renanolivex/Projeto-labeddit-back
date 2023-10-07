import { POST_EXISTS_LIKE, Posts, PostsDB, likeDeslikeDB } from "../../src/models/Posts";
import { BaseDatabase } from "../../src/database/BaseDataBase";
import {DeletePostDTO} from "../../src/dtos/post/deletePost.dto"
import { CommentPostsDB } from "../../src/models/Comments";



const commentsMock : CommentPostsDB[]=
[
    {
        id: "idcomments",
        post_id:"id-Teste-112",
        creator_id:"id-mock-fulano", 
        content: "Apenas um comentário",
        likes: 0,
        dislikes: 2,
        comments:0,
        created_at :"20/10/2023",
        updated_at :"20/10/2023"
    },

    {
        id: "idcomments2",
        post_id:"teste123",
        creator_id:"id-mock-astrodev", 
        content: "Segundo comentário",
        likes: 5,
        dislikes: 2,
        comments:0,
        created_at :"20/10/2023",
        updated_at :"20/10/2023"
    }
    
]


export class CommentsDatabaseMock extends BaseDatabase {

public getAllCommentsPosts = async(id:any) : Promise <CommentPostsDB[]> => {
   
    return commentsMock.filter(user => user.post_id === id) 

  }

  public getAllComments = async() : Promise <CommentPostsDB[]> => {
        
   
    const result =  commentsMock.filter(user => user)
    return result
  }


  public createNewPostComment = async (post:CommentPostsDB):Promise<void> =>{
     
  }


  public editNewPost = async (input: CommentPostsDB):Promise<void> =>{
   
    
}


public findIfExistLikeDislike =async (inputLike:likeDeslikeDB): Promise <POST_EXISTS_LIKE| undefined> =>{

  let postFind = inputLike

  if(postFind === undefined){
    return undefined
  }

  else if (postFind.like === 1 ) {
    return POST_EXISTS_LIKE.LIKED
    
  }else if (postFind.like ===0)return POST_EXISTS_LIKE.DISLIKED
 


}

public addLD = async(inputLike: likeDeslikeDB):Promise<void>=>{


}

public removeLD = async (inputLike: likeDeslikeDB): Promise <void>=>{

}

public updateLD = async(inputLike: likeDeslikeDB):Promise<void>=>{
  
}

}

