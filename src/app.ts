import 'express-async-errors'
import 'reflect-metadata'
import express from "express"
import { errorHandler } from "./errors"
import usersRoutes from "./routers/user.router"
import loginRoutes from './routers/login.router'
import contactRouter from './routers/contact.router'
import swaggerConfig from './swagger'
import cors from 'cors'


const app = express()
app.use(express.json())
app.use(cors());


swaggerConfig(app);

app.use("/users", usersRoutes )
app.use("/login", loginRoutes )
app.use("/contacts", contactRouter )
app.use(errorHandler)

export default app
