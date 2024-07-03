import { ConnectRouter } from "@bufbuild/connect";
import { HealthCheckResponse_ServingStatus, UserService, GetUserRequest, GetUserResponse } from "../definition/src";
import { AppDataSource } from "../plugin/mysql/mysql";

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
}
