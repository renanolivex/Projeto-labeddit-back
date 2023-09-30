
import { PostsDataBase } from "../database/PostsDataBase"
import { UsersDatabase } from "../database/UsersDataBase"

import { PostsDB } from "../models/Posts"
import {  IdGeneratorPost } from "../services/IdGenerator"
import { TokenManager } from "../services/TokenManager"
import { BadRequestError } from "../errors/BadRequestError"
import { NotFoundError } from "../errors/NotFoundError"
import { CommentsDataBase } from "../database/CommentsDataBase"
import { GetCommentDTO, GetCommentOutputDTO } from "../dtos/comments/getComment.dto"
import { CommentPosts } from "../models/Comments"
import { CreateCommentDTO } from "../dtos/comments/createComment.dto"
import { UserDB } from "../models/Users"


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

      console.log(id)


      const payload = this.tokenManager.getPayLoad(token)

      if(!payload){
          throw new BadRequestError ("Não foi adicionado um token válido")
      }
      

      const allPosts:PostsDB[] = await this.postsDatabase.getAllPosts()
     
      const postIdExists = allPosts.find(element => element.id ===id)

      if(!postIdExists?.id){
          throw new NotFoundError ("Id do post não encontrado")
      }


      const postsData = await this.commentsDatabase.getAllCommentsPosts()

      const getUsers = await this.usersDatabase.findAllUsers()

  

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
      console.log(post)
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
            post_id:post.id,
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
      })
     const output:GetCommentOutputDTO = getPosts
      return output
  }
 

  public createNewPost = async (input: CreateCommentDTO):Promise<void> => {
    const {post_id, content, token} = input
  
    if(!content) {
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
    const post_comment_id = postFound?.id as string
   
    console.log(postFound)
  
     
    const today = new Date().toISOString()
    let comments = 0
    let likes = 0
    let dislikes = 0
  

    const post = new CommentPosts(id, post_comment_id, creator_id, content, likes, dislikes, comments, today, today )
    console.log(post)
 

    await this.commentsDatabase.createNewPostComment(post.toDBModel())

}






} 