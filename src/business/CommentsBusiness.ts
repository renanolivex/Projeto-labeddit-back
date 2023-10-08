
import { PostsDataBase } from "../database/PostsDataBase"
import { UsersDatabase } from "../database/UsersDataBase"

import { PostsDB, likeDeslikeDB } from "../models/Posts"
import {  IdGeneratorPost } from "../services/IdGenerator"
import { TokenManager } from "../services/TokenManager"
import { BadRequestError } from "../errors/BadRequestError"
import { NotFoundError } from "../errors/NotFoundError"
import { CommentsDataBase } from "../database/CommentsDataBase"
import { GetCommentDTO, GetCommentOutputDTO } from "../dtos/comments/getComment.dto"
import { CommentPosts, CommentPostsDB, POST_EXISTS_LIKE } from "../models/Comments"
import { CreateCommentDTO } from "../dtos/comments/createComment.dto"
import { UserDB } from "../models/Users"
import { LikeDislikeOutputDTO, LikeDislikeinputDTO } from "../dtos/comments/likeanddislike.dto"
import { EditCommentDTO } from "../dtos/comments/editComment.dto"


export class CommentsBusiness{

  constructor(
      private commentsDatabase: CommentsDataBase,
      private IdGenerator: IdGeneratorPost,
      private tokenManager: TokenManager,
      private usersDatabase: UsersDatabase,
      private postsDatabase: PostsDataBase  

  ){}

   public getPosts = async (input:GetCommentDTO):Promise<GetCommentOutputDTO>=> {
      const {token, id} = input

  
      const payload = this.tokenManager.getPayLoad(token)

      if(!payload){
          throw new BadRequestError ("Não foi adicionado um token válido")
      }
      

      const allPosts:PostsDB[] = await this.postsDatabase.getAllPosts()
     
      const postIdExists = allPosts.find(element => element.id ===id)
      console.log(postIdExists,"ESSE")

      if(!postIdExists?.id){
          throw new NotFoundError ("Id do post não encontrado")
      }

      const postsData = await this.commentsDatabase.getAllCommentsPosts(id)

      
      


      const getUsers = await this.usersDatabase.findAllUsers()

           

    
   
  
      const postFound = allPosts.find(element => element.id === id)

      console.log(postFound, "AQUI")
      const post_comment_id = postFound?.id as string
  


  const getUsersId = getUsers.map((found)=>found.id)


      
      
   const getPost = postsData.map((postsDB) => {
      const post = new CommentPosts(
        postsDB.id,
        postsDB.post_id,
        postsDB.creator_id,
        postsDB.content,
        postsDB.likes,
        postsDB.dislikes,
        postsDB.comments,
        postsDB.created_at,
        postsDB.updated_at
      );
  
      
      return post.toDBModel();
    
    });
    

    const getPostCreatorId = getPost.map((posts)=>posts.creator_id)

    const userName: any = []

  for (let i = 0; i < getPostCreatorId.length; i++) {
    const result = await this.usersDatabase.returnUserName(
      getPostCreatorId[i]
    );

    console.log(result)
    userName.push(result);
  }

      const getPosts = postsData.map((post, index) => {
          const newPost = {
            id: post.id,
            post_id:post.post_id, 
            content: post.content,
            likes: post.likes,
            dislikes: post.dislikes,
            comments:post.comments,
            createdAt: post.created_at,
            updatedAt: post.updated_at,
            creator: {
              id: post.creator_id,
              name:userName[index],
            }

          
            
          }
        
      
        
          return newPost
       
        
          
      }
      
      )


     const output:any = getPosts
      return output
  }
 

  public createNewPost = async (input: CreateCommentDTO):Promise<void> => {
    const {post_id, content, token} = input
  
    if(!content) {
        throw new BadRequestError ("Não foi adicionado um post válido")
    }

    if(content.length ===null && content.length ===undefined && content.length ===0){
        throw new BadRequestError ("Não foi adicionado um post válido")
        }

    const payload = this.tokenManager.getPayLoad(token)
    if(!payload){
        throw new BadRequestError ("Não foi adicionado um token válido")
    }
    const id = this.IdGenerator.generateId()


    const allUsers = new UsersDatabase()
    const searchCreator:UserDB[]= await allUsers.findAllUsers()

    const creatorFound = searchCreator.find(element => element.id === payload?.id) 

    const creator_id = creatorFound?.id as string



    const allPosts = new PostsDataBase()
    const searchPost:PostsDB[]= await allPosts.getAllPosts()

    const postFound = searchPost.find(element => element.id === post_id)
    console.log(postFound)
    const post_comment_id = postFound?.id as string
   
    console.log(post_comment_id, "ID PROCURADO")
  
     
    const today = new Date().toISOString()

    let comments = 0
    let likes = 0
    let dislikes = 0
  

    const post = new CommentPosts(id, post_comment_id, creator_id, content, likes, dislikes, comments, today, today )
    console.log(post)
 

    await this.commentsDatabase.createNewPostComment(post.toDBModel())

}

public editNewPost = async(input:EditCommentDTO):Promise<void> =>{

  const {id, content, token} = input

  const payload = this.tokenManager.getPayLoad(token)
  if(!payload){
      throw new BadRequestError ("Não foi adicionado um token válido")
  }

  const allPosts: CommentPostsDB[] = await this.commentsDatabase.getAllComments()
  
  const postIdExists = allPosts.find(element => element.id ===id)

  if(!postIdExists?.id){
      throw new NotFoundError ("Id do post não encontrado")
  }

  const today = new Date().toISOString()
  const allCreator = new UsersDatabase()
  const searchCreator:UserDB[]= await allCreator.findAllUsers()
  const creatorFound = searchCreator.find(element => element.id === payload?.id) 




 
  if(creatorFound?.id != postIdExists.creator_id ){
      throw new BadRequestError("Você não consegue alterar uma mensagem criada por outra pessoa")
  }
  const postUpdate = new CommentPosts(
      postIdExists.id,
      postIdExists.post_id,
      postIdExists.creator_id,
      content|| postIdExists.content,
      postIdExists.likes,
      postIdExists.dislikes,
      postIdExists.comments,
      postIdExists.created_at,
      today

  )

  await this.commentsDatabase.editNewPost(postUpdate.toDBModel())
}





public likeAndDislikePosts = async (input:LikeDislikeinputDTO):Promise<LikeDislikeOutputDTO>=>{
  const {id, token , like}= input

  const payload = this.tokenManager.getPayLoad(token)

  console.log(payload)

  if(!payload) {
      throw new BadRequestError ("Token Inválido")
  }

  const allPosts: CommentPostsDB[] = await this.commentsDatabase.getAllComments()
  const postIdExists = allPosts.find(element => element.id ===id)
  if(!postIdExists?.id){
      throw new NotFoundError ("Id do post não encontrado")
  }

  const likeOrDislike = like? 1:0

  const postDB = new CommentPosts(
      postIdExists.id,
      postIdExists.post_id,
      postIdExists.creator_id,
      postIdExists.content,
      postIdExists.likes,
      postIdExists.dislikes,
      postIdExists.comments,
      postIdExists.created_at,
      postIdExists.updated_at
  )

     
 


 
  const inputLike:likeDeslikeDB={
      user_id:payload.id,
      post_id:id,
      like: likeOrDislike
  }

  const likeDislikeExists = await this.commentsDatabase.findIfExistLikeDislike(inputLike)     
  console.log(likeDislikeExists)
  
  

  if(likeDislikeExists === POST_EXISTS_LIKE.LIKED){
       if(like){
          await this.commentsDatabase.removeLD(inputLike)
          postDB.removeLike()
      }else{
          await this.commentsDatabase.updateLD(inputLike)
          postDB.removeLike()
          postDB.addDislikes()
      } }

      else if (likeDislikeExists===POST_EXISTS_LIKE.DISLIKED) {
          if(like===false){
             
              await this.commentsDatabase.removeLD(inputLike)
              postDB.removeDislikes()
              
          }
          else{
              await this.commentsDatabase.updateLD(inputLike)
              postDB.removeDislikes()
              postDB.addLike()
          }

      }else{
          await this.commentsDatabase.addLD(inputLike)
          like? postDB.addLike() : postDB.addDislikes()
      }

      const updateLikeDislike = postDB.toDBModel()
      await this.commentsDatabase.editNewPost(updateLikeDislike)
  }



} 