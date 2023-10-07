import { PostsBusiness} from "../../../src/business/PostsBusiness"
import { CommentsDataBase } from "../../../src/database/CommentsDataBase"
import { GetPostSchema } from "../../../src/dtos/post/getPost.dto"
import { LikeDislikeSchema } from "../../../src/dtos/post/likeanddislike.dto"
import { HashManagerMock } from "../../mocks/HashManagerMock"
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock"
import { PostDatabaseMock } from "../../mocks/PostDatabaseMock"
import { TokenManagerMock } from "../../mocks/TokenManagerMock"
import { UserDatabaseMock } from "../../mocks/UserDatabaseMock"
import {LikeDislikeinputDTO}from "../../../src/dtos/post/likeanddislike.dto"
import { BadRequestError } from "../../../src/errors/BadRequestError"
import { NotFoundError } from "../../../src/errors/NotFoundError"

const postsBusiness = new PostsBusiness(
    new PostDatabaseMock(),
    new IdGeneratorMock(),
    new TokenManagerMock(),
    new UserDatabaseMock(),
    new CommentsDataBase()
)




describe("Testes de likeAndDislike", () => {
    test("Caso de sucesso! ", async () => {
        const input :LikeDislikeinputDTO={
            id: "id-Teste-112",
            token: "token-mock-fulano",
            like: false
        }
      

       const output= await postsBusiness.likeAndDislikePosts(input)
       console.log(output)    
       

     
    })

    test("Caso de erro! Token incorreto", async () => {
        
        expect.assertions(3)

        try {

            const input: LikeDislikeinputDTO ={
                id: "id-Teste-112",
                token: "Incorreto",
                like: false
            }
            await postsBusiness.likeAndDislikePosts(input)
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
            await postsBusiness.likeAndDislikePosts(input)
        } catch (error) {
            expect(error).toBeDefined()
            expect(error instanceof NotFoundError).toBe(true)
            if(error instanceof NotFoundError){
              expect(error.message).toBe("Id do post não encontrado")
        
            }
        }
     
       
      })

}) 
