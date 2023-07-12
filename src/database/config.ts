import "reflect-metadata"
import { DataSource } from "typeorm"

export const dataSource = new DataSource({
    type: "postgres",
    url: process.env.DATABASE_URL,
    entities: ["../entities/*.ts"],
    migrations: [__dirname + "/../migrations/*.ts"]
})  

dataSource.initialize()
    .then(() => {
        // here you can start to work with your database
    })
    .catch((error) => console.log(error))


