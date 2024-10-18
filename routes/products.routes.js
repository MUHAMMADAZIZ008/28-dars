import express from "express";
import { validationProductMidd } from '../middlewares/index.js';
import { getAllProducts, getByIdProduct, createProducts, updateByIdProducts, deleteByIdProducts } from "../controllers/index.js";


export const productsRouter = express.Router()


//GET ALL
productsRouter.get("/", getAllProducts)


//GET BY ID
productsRouter.get("/:id", getByIdProduct)

//CREATE
productsRouter.post("/", validationProductMidd, createProducts)

//UPDATE BY ID
productsRouter.put("/:id", updateByIdProducts)

//DELETE BY ID
productsRouter.delete("/:id", deleteByIdProducts)




// export const productsRouter = 
