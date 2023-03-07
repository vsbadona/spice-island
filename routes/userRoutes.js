import express from "express"
import { allUsers, getUsers, Login, Register, updateUser } from "../Controller/userController.js"
import Authencticate from "../middleware/authenticate.js"

const Routes = express.Router()

Routes.post('/register',Register)
Routes.post('/login',Login)
Routes.get('/users',allUsers)
Routes.get('/user',getUsers)
Routes.put('/update',updateUser)

export default Routes