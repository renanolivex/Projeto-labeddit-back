import { CommentsBusiness} from "../../../src/business/CommentsBusiness"
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



describe("Testes de getAllComments", () => {
    test("Caso de sucesso!", async () => {
        const input = GetCommentPostSchema.parse({
            id: "id-Teste-112",
           token:"token-mock-astrodev"
        })

       const output= await commentBusiness.getPosts(input)
        expect(output).toHaveLength(1)

        expect(output).toEqual(
           [ {
                id: "idcomments",
        post_id:"id-Teste-112", 
        content: "Apenas um comentário",
        likes: 0,
        dislikes: 2,
        comments:0,
        createdAt :"20/10/2023",
        updatedAt :"20/10/2023",
        creator:{
            id: "id-mock-fulano",
            name: "Fulano",
        }
            }]
        )
      
    })
}) 


