import { POST_EXISTS_LIKE, Posts, PostsDB, likeDeslikeDB } from "../../src/models/Posts";
import { BaseDatabase } from "../../src/database/BaseDataBase";
import {DeletePostDTO} from "../../src/dtos/post/deletePost.dto"



const postsMock: PostsDB[] = [
  {
    id: "id-Teste-112",
    creator_id:"id-mock-fulano",
    content: "Post",
    likes: 10,
    dislikes: 5,
    comments: 2,
    created_at: "10/02/2022" ,
    updated_at: "10/02/2022"
  },
  {
    id: "teste123",
    creator_id:"id-mock-astrodev",
    content: "Post2",
    likes: 8,
    dislikes: 2,
    comments: 1,
    created_at: "10/02/2022" ,
    updated_at: "10/02/2022"
  },
]





export class PostDatabaseMock extends BaseDatabase {
  public static TABLE_USERS = "posts"

  public getAllPosts = async(): Promise<PostsDB[]> => {
   
      const result =  postsMock.filter(user => user)
      return result

  }

  public async findPost(input: string | undefined):Promise<PostsDB[]> {
    return postsMock.filter(user => user.id === input)
  }


  public createNewPost = async (input:PostsDB ):Promise<void> =>{
     
  }


  public editNewPost = async (input: PostsDB):Promise<void> =>{
   
    
}


public deletePost = async (input:DeletePostDTO):Promise<void>=>{
 
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

