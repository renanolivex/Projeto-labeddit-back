 import express from "express"

import { IdGeneratorPost } from "../services/IdGenerator"
import { TokenManager } from "../services/TokenManager"
import { UsersDatabase } from "../database/UsersDataBase"
import { CommentsController } from "../controller/CommentsController"
import { CommentsBusiness } from "../business/CommentsBusiness"
import { CommentsDataBase } from "../database/CommentsDataBase"
import { PostsDataBase } from "../database/PostsDataBase"

export const commentsRouter = express.Router()

const commentController = new CommentsController(
    new CommentsBusiness(
        new CommentsDataBase(),
        new IdGeneratorPost(),
        new TokenManager(),
        new UsersDatabase,
        new PostsDataBase
    )
)

 commentsRouter.get("/:id", commentController.getPosts) 
commentsRouter.post("/:id", commentController.createPostComment)
commentsRouter.put("/:id",commentController.editPosts)
commentsRouter.put("/:id/like", commentController.likeAndDislike)


 