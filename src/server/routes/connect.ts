import { ConnectRouter } from "@bufbuild/connect";
import { HealthCheckResponse_ServingStatus, UserService, GetUserRequest, GetUserResponse, RegisterRequest, RegisterResponse, AuthService } from "../../definition/src";
import { AppDataSource } from "../../plugin/mysql/mysql";
import moment from "moment";
import { ResultSetHeader } from "mysql2";

const db = AppDataSource
export default (router: ConnectRouter) => {
    router.service(UserService, {
        async getUser(request: GetUserRequest): Promise<GetUserResponse> {
            const { id } = request
            const [ user ] = await db.query<{ email: string; name: string }[]>(`SELECT email, name FROM user WHERE id = ?`, [Number(id)])

            const response = new GetUserResponse({ email: user.email, name: user.name })
            return response
        },
        healthCheck() {
            return {
                status: HealthCheckResponse_ServingStatus.SERVING
            }
        }
    })
    router.service(AuthService, {
        async register(request: RegisterRequest): Promise<RegisterResponse> {
            console.log({ request })
            const { email, name, password } = request

            const now = moment().utcOffset(7).unix()
            const user = {
                level: 3,
                email_token: "asd",
                created_at: now
            }

            const result = await db.query<ResultSetHeader>(`INSERT INTO user (NAME, email, PASSWORD, LEVEL, created_at, email_token) VALUES (?,?,?,?,?,?)`, [name, email, password, user.level, user.created_at, user.email_token])


            const response = new RegisterResponse({ createdAt: now, email, id: result.insertId, level: 3, name })

            return response
        }
    })
}
