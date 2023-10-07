import { UsersBusiness } from "../../../src/business/UsersBusiness"
import { GetUsersInputDTO } from "../../../src/dtos/user/getUsers.dto"
import { LoginInputDTO} from "../../../src/dtos/user/login.dto"
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



describe("Testes de getUsers", () => {
    test("Caso de sucesso!", async () => {
        const input: GetUsersInputDTO ={
            q: ""
        }

       const output= await userBusiness.getUsers(input)
       expect(output).toHaveLength(2)
       expect(output).toContainEqual(
        {
            id: "id-mock-fulano",
            name: "Fulano",
            email: "fulano@email.com",
            createdAt: expect.any(String),
            role: USER_ROLES.NORMAL
        }
       )
    })
}) 