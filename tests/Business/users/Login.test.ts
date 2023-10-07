import { UsersBusiness } from "../../../src/business/UsersBusiness"
import { LoginInputDTO} from "../../../src/dtos/user/login.dto"
import { HashManagerMock } from "../../mocks/HashManagerMock"
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock"
import { TokenManagerMock } from "../../mocks/TokenManagerMock"
import { UserDatabaseMock } from "../../mocks/UserDatabaseMock"

const userBusiness = new UsersBusiness(
    new UserDatabaseMock(),
    new IdGeneratorMock(),
    new TokenManagerMock(),
    new HashManagerMock()
)



describe("Testes de Login", () => {
    test("Login encontrado", async () => {
        const input: LoginInputDTO = {
            email: "fulano@email.com",
            password: "fulano123"
        }
       const output= await userBusiness.login(input)
       expect(output.message).toBe("Login realizado com sucesso")
       expect(output.token).toBeDefined()
       
    })
}) 