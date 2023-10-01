 import { GetPostsFromUser } from "./Users";

export interface GetCommentsModel {
    id: string;
    post_id:string;
    content: string;
    likes: number;
    dislikes: number;
    createdAt: string;
    updatedAt: string;
    creator: GetPostsFromUser;
  }


  
export class CommentPosts{
    constructor(
    private id: string,
    private postId:string,
    private creatorId:string, 
    private content: string,
    private likes: number,
    private dislikes: number,
    private comments:number,
    private createdAt :string,
    private updatedAt :string
   
    ){}

    public getId(): string {
        return this.id;
      }
    
      public getCreatorId(): string {
        return this.creatorId;
      }
    
      public getContent(): string {
        return this.content;
      }
    
      public getLikes(): number {
        return this.likes;
      }
      public getDeslike(): number {
        return this.dislikes;
      }
      public getCreatedAt(): string {
        return this.createdAt;
      }
    
      public getUpdatedAt(): string {
        return this.updatedAt;
      }
    
      public setId(value: string): void {
        this.id = value;
      }
      public setCreatorId(value: string): void {
        this.createdAt = value;
      }
    
      public setContent(value: string): void {
        this.content = value;
      }
    
      public setLike(value: number): void {
        this.likes = value;
      }

      public setComments(value: number): void {
        this.comments = value;
      }
    
      public setCreatedAt(value: string): void {
        this.createdAt = value;
      }
    
      public setUpdatedAt(value: string): void {
        this.updatedAt = value;
      }
      public addLike = (): void => {
        this.likes++
      }
    
      public removeLike = (): void => {
        this.likes--
      }
    
      public setDislikess(value: number): void {
        this.dislikes = value
      }
    
      public addDislikes = (): void => {
        this.dislikes++
      }
    
      public removeDislikes = (): void => {
        this.dislikes--
      }
 
      
    public toDBModel(): CommentPostsDB{
        return{
            id:this.id,
            post_id: this.postId,
            creator_id: this.creatorId,
            content: this.content,
            likes: this.likes,
            dislikes: this.dislikes,
            comments: this.comments,
            created_at :this.createdAt,
            updated_at: this.updatedAt
        }
    }



}

export interface CommentPostsDB {

    id: string,
    post_id:string,
    creator_id:string, 
    content: string,
    likes: number,
    dislikes: number,
    comments:number,
    created_at :string,
    updated_at :string
   } 

   
export enum POST_EXISTS_LIKE {
  LIKED = "LIKED",
  DISLIKED = "DISLIKED"
  
}

export interface likeDeslikeDB{
  user_id:string;
  post_id:string;
  like:number;
}
