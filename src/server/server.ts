import { fastify } from "fastify";
import { fastifyConnectPlugin } from "@bufbuild/connect-fastify";
import routes from "./routes/connect"
import { AppDataSource } from "../plugin/mysql/mysql"

const server = fastify({
    logger: {
        transport: {
            target: "pino-pretty",
        },
    },
})
server.register(fastifyConnectPlugin, {
    routes,
});

async function main() {
    await server.listen({
        host: "127.0.0.1",
        port: 8080,
    });

    AppDataSource.initialize()
        .then(() => {
            console.log("Data Source has been initialized!")
        })
        .catch((err) => {
            console.error("Error during Data Source initialization", err)
            throw new Error("Failed to initialize database") // Throw an error if initialization fails
        })

}

main()
