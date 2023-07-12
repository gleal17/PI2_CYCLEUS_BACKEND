//imports
import express from "express";
import cors from "cors";

//iniciar express
const app = express();

//middlewares
app.use(cors());


app.get("/", (req, res) => {
  console.log("get /");
});

app.listen(8080, () => {
  console.log("Server running on port 8080");
});
