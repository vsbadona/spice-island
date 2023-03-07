import express from "express"
import { createCategory, createItem, deleteCategory, deleteItem, editCategory, getCategory, updateItem } from "../Controller/categoryController.js"

const Routes = express.Router()

Routes.get('/category',getCategory)
Routes.post('/create',createCategory)
Routes.post('/edit',editCategory)
Routes.delete('/delete',deleteCategory)
Routes.post('/add',createItem)
Routes.post('/update',updateItem)
Routes.delete('/remove',deleteItem)


export default Routes