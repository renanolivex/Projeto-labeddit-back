import { UsersBusiness } from "../../../src/business/UsersBusiness"
import { GetUsersInputDTO } from "../../../src/dtos/user/getUsers.dto"
import { SignupInputDTO } from "../../../src/dtos/user/signup.dto"
import { USER_ROLES } from "../../../src/models/Users"
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



describe("Testes de SignUp", () => {
    test("Caso de sucesso!", async () => {
        const input: SignupInputDTO ={
            name: "novoNome",
            email: "novoEmail@hotmail.com",
            password: "12345"
        }

        const output= await userBusiness.signup(input)

        expect(output.message).toBe("Cadastro realizado com sucesso")
        expect(output.token).toBeDefined()     
       
    })
}) 

