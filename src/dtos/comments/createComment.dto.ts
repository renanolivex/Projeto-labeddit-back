 import z from "zod"


export interface CreateCommentDTO {
  content:string,
  token:string,
  post_id:string
}




export const CreateCommentSchema = z.object({
  content: z.string().min(2),
  token: z.string(),
  post_id:z.string()

}).transform(data => data as CreateCommentDTO)

 