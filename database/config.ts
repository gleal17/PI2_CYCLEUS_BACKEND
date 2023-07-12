import "reflect-metadata"
import { DataSource } from "typeorm"

export const dataSource = new DataSource({
    type: "postgres",
    url: process.env.DATABASE_URL,
    entities: ["../entity/*.ts"],
    migrations: [__dirname + "/../migration/*.ts"]
})  

dataSource.initialize()
    .then(() => {
        // here you can start to work with your database
    })
    .catch((error) => console.log(error))


