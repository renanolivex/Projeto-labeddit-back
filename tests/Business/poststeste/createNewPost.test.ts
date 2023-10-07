import { PostsBusiness} from "../../../src/business/PostsBusiness"
import { CommentsDataBase } from "../../../src/database/CommentsDataBase"
import { CreatePostDTO } from "../../../src/dtos/post/createPost.dto"
import { GetPostDTO, GetPostSchema } from "../../../src/dtos/post/getPost.dto"
import { BadRequestError } from "../../../src/errors/BadRequestError"
import { CommentsDatabaseMock } from "../../mocks/CommentsDatabaseMock"
import { HashManagerMock } from "../../mocks/HashManagerMock"
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock"
import { PostDatabaseMock } from "../../mocks/PostDatabaseMock"
import { TokenManagerMock } from "../../mocks/TokenManagerMock"
import { UserDatabaseMock } from "../../mocks/UserDatabaseMock"

const postsBusiness = new PostsBusiness(
    new PostDatabaseMock(),
    new IdGeneratorMock(),
    new TokenManagerMock(),
    new UserDatabaseMock(),
    new CommentsDatabaseMock()
)



describe("Testes de createNewPost", () => {
    test("Caso de erro undefined!", async () => {
        const input: CreatePostDTO ={
            content:"Teste",
            token:"token-mock-fulano"
        }

        
       const output= await postsBusiness.createNewPost(input)
       expect(output).toBe(undefined)
    
     
    })



}) 

