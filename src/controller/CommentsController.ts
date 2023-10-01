 import { GetCommentPostSchema } from "../dtos/comments/getComment.dto"
import { Request, Response } from "express"
import { ZodError } from "zod"
import { BaseError } from "../errors/BaseError"
import { CommentsBusiness } from "../business/CommentsBusiness"
import { CreateCommentSchema } from "../dtos/comments/createComment.dto"
import { LikeDislikeSchema } from "../dtos/comments/likeanddislike.dto"
import { EditCommentSchema } from "../dtos/comments/editComment.dto"

export class CommentsController {

    constructor(
        private commentsBusiness: CommentsBusiness

    ) { }
    public getPosts = async (req: Request, res: Response): Promise<void> => {

        try {const input = GetCommentPostSchema.parse({
            token: req.headers.authorization,
            id:req.params.id
            
        })
         
            const result = await this.commentsBusiness.getPosts(input)
            res.status(200).send(result)

        } catch (error: any) {
            if (error instanceof ZodError) {
                res.status(400).send(error.issues)
            } else if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado, verifique o Token")
            }
        }
    }
 

    public createPostComment = async (req: Request, res: Response): Promise<void> => {
        try {
            const input = CreateCommentSchema.parse({
                content: req.body.content,
                token: req.headers.authorization,
                post_id:req.params.id   
           })

           
            await this.commentsBusiness.createNewPost(input)
            res.status(201).send("Post criado com sucesso")
            
        } catch (error) {
            if (error instanceof ZodError) {
                res.status(400).send(error.issues)
            } else if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }

    public editPosts = async (req: Request, res: Response): Promise<void> => {
        try {
            const input = EditCommentSchema.parse({
                id:req.params.id,
                content:req.body.content,
                token: req.headers.authorization
            })

            await this.commentsBusiness.editNewPost(input)
            res.status(200).send("Post editado com sucesso!")
        } catch (error) {
            if (error instanceof ZodError) {
                res.status(400).send(error.issues)
            } else if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }


    public likeAndDislike = async (req:Request, res:Response)=>{
        try {
            const input = LikeDislikeSchema.parse({
                id:req.params.id,
                token:req.headers.authorization,
                like:req.body.like
            })
            this.commentsBusiness.likeAndDislikePosts(input)

            res.status(201).send("Reação alterada com sucesso!")
        } catch (error) {
            if (error instanceof ZodError) {
                res.status(400).send(error.issues)
            } else if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
            
        }
    }




}



 