import { PostsBusiness} from "../../../src/business/PostsBusiness"
import { CommentsDataBase } from "../../../src/database/CommentsDataBase"
import { GetPostSchema } from "../../../src/dtos/post/getPost.dto"
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
    new CommentsDataBase()
)




describe("Testes de getAllPosts", () => {
    test("Caso de sucesso!", async () => {
        const input = GetPostSchema.parse({
           token:"token-mock-astrodev"
        })

       const output= await postsBusiness.getAllPosts(input)
       expect(output).toHaveLength(2)
      
    })
}) 