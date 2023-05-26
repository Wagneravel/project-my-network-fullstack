import 'express-async-errors'
import express, { Application } from "express"
import { errorHandler } from "./errors"
import usersRoutes from "./routers/users.routes"


const app:Application = express()
app.use(express.json())


app.use("/users", usersRoutes )

app.use(errorHandler)

export default app

