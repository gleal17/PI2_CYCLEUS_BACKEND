// import { express, json } from "express";
// import cors from "cors";

// import routes from "./routes.js";
// import { AppDataSource } from "./database/config.js";

// AppDataSource.initialize()
//   .then(() => {
//     console.log("Connected to database");
//     const app = express();
//     app.use(cors());
//     app.use(json());
//     app.use("users", routes);
//     return app.listen(process.env.PORT)
//   })
//   .catch((err) => {
//     console.log("Unable to connect to database", err);
//   });


// app.get("/", (req, res) => {
//   console.log("get /");
// });

// app.listen(port, "0.0.0.0", () => {
//   console.log(`Server running on port ${port}`);
// });
import express from 'express'
import { AppDataSource } from './data-source'
import routes from './routes'

AppDataSource.initialize().then(() => {
	const app = express()

	app.use(express.json())

	app.use(routes)

	return app.listen(process.env.PORT)
})