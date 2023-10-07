import { CommentsBusiness} from "../../../src/business/CommentsBusiness"
import { CreateCommentDTO } from "../../../src/dtos/comments/createComment.dto"
import { GetCommentPostSchema } from "../../../src/dtos/comments/getComment.dto"
import { CommentsDatabaseMock } from "../../mocks/CommentsDatabaseMock"
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock"
import { PostDatabaseMock } from "../../mocks/PostDatabaseMock"
import { TokenManagerMock } from "../../mocks/TokenManagerMock"
import { UserDatabaseMock } from "../../mocks/UserDatabaseMock"

const commentBusiness = new CommentsBusiness(
    new CommentsDatabaseMock(),
    new IdGeneratorMock(),
    new TokenManagerMock(),
    new UserDatabaseMock(),
    new PostDatabaseMock()
)
describe("Testes de createNewPost", () => {
    test("Caso de erro undefined!", async () => {
        const input: CreateCommentDTO ={
            content: "Novo post",
            token: "token-mock-astrodev",
            post_id: "teste123"
        }

        
       const output= await commentBusiness.createNewPost(input)
       console.log(output)
     
    })



}) 

