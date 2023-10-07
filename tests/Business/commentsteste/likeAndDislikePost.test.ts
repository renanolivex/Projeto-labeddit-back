import { CommentsBusiness} from "../../../src/business/CommentsBusiness"
import { GetCommentPostSchema } from "../../../src/dtos/comments/getComment.dto"
import { LikeDislikeinputDTO } from "../../../src/dtos/comments/likeanddislike.dto"
import { BadRequestError } from "../../../src/errors/BadRequestError"
import { NotFoundError } from "../../../src/errors/NotFoundError"
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




describe("Testes de likeAndDislike", () => {
    test("Caso de sucesso! ", async () => {
        const input :LikeDislikeinputDTO={
            id: "idcomments",
            token: "token-mock-fulano",
            like: false
        }
      

       const output= await commentBusiness.likeAndDislikePosts(input)
       console.log(output)    
       

     
    })

    test("Caso de erro! Token incorreto", async () => {
        
        expect.assertions(3)

        try {

            const input: LikeDislikeinputDTO ={
                id: "idcomments",
                token: "Incorreto",
                like: false
            }
            await commentBusiness.likeAndDislikePosts(input)
        } catch (error) {
            expect(error).toBeDefined()
            expect(error instanceof BadRequestError).toBe(true)
            if(error instanceof BadRequestError){
              expect(error.message).toBe("Token Inválido")
        
            }
        }
     
       
      })

      test("Caso de erro! Id Incorreto", async () => {
        
        expect.assertions(3)

        try {

            const input: LikeDislikeinputDTO ={
                id: "",
                token: "token-mock-fulano",
                like: false
            }
            await commentBusiness.likeAndDislikePosts(input)
        } catch (error) {
            expect(error).toBeDefined()
            expect(error instanceof NotFoundError).toBe(true)
            if(error instanceof NotFoundError){
              expect(error.message).toBe("Id do post não encontrado")
        
            }
        }

      })

}) 
