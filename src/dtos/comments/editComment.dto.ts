import z from "zod"

export interface EditCommentDTO {
  id:string,
  content:string,
  token:string
}


export const EditCommentSchema = z.object({
    id:z.string(),
  content: z.string(),
  token: z.string()
}).transform(data => data as EditCommentDTO)