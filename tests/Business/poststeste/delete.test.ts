import { PostsBusiness} from "../../../src/business/PostsBusiness"
import { CommentsDataBase } from "../../../src/database/CommentsDataBase"
import { CreatePostDTO } from "../../../src/dtos/post/createPost.dto"
import { DeletePostDTO, DeletePostSchema } from "../../../src/dtos/post/deletePost.dto"
import { EditPostDTO } from "../../../src/dtos/post/editPost.dto"
import { GetPostDTO, GetPostSchema } from "../../../src/dtos/post/getPost.dto"
import { BadRequestError } from "../../../src/errors/BadRequestError"
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


describe("Testes de delete", () => {

    test("Caso de erro!", async () => {
        
        expect.assertions(3)

        try {

            const input: DeletePostDTO ={
                id: "id-Teste-112",
                token: "token incorreto"
            }
            await postsBusiness.delete(input)
        } catch (error) {
            expect(error).toBeDefined()
            expect(error instanceof BadRequestError).toBe(true)
            if(error instanceof BadRequestError){
              expect(error.message).toBe("Não foi adicionado um token válido")
        
            }
        }
     
       
      })



    test("Caso de undefined!", async () => {
        const input = DeletePostSchema.parse({
            id:"id-Teste-112",
           token:"token-mock-fulano"
        })

       const output= await postsBusiness.delete(input)
       expect(output).toBe(undefined)
      
    })
}) 

