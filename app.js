import express from "express"
import filmRouter from "./routers/films.js"
import notFound from "./middlewares/notFound.js"
import errorsHandler from "./middlewares/errorsHandler.js"
import cors from "cors"

const app = express()
const port = 3000

app.use(cors({
    origin: "http://localhost:5173"
}))


// app.use(express.static("public"))
app.use(express.json())
app.get("/", (req, resp) => {
    console.log("Rotta /");
    resp.send("test")
});
// app.get("/test-error", (req, res) => {
//     throw new Error("Test errore");
// });
app.use("/films", filmRouter)

app.use(errorsHandler)
app.use(notFound);


app.listen(port, () => {
    console.log("il server è in ascolto sulla porta " + port);
})
