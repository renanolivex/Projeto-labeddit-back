 import z from "zod"
import { GetCommentsModel } from "../../models/Comments"




export interface GetCommentDTO {
  id:string,
  token:string
  
  
}

 export type GetCommentOutputDTO = GetCommentsModel[] 



export const GetCommentPostSchema = z.object({
  id: z.string(),
  token: z.string(),
  
  

}).transform(data => data as GetCommentDTO) 
 