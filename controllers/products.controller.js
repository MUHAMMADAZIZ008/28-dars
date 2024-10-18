import { readFileDb, writeJson } from "../service/db.js";
import { createProductsDb, getProductId, getProducts } from "../service/products.service.js";
import path from "path"
let productsJsonPath = path.join(process.cwd(), "database", "products.json")

export const createProducts = async (req, res, next) => {
  try {
	let body = req.body
	let chack = await createProductsDb(body)
	if(!chack){
		return res.status(400).send("error in create")
	}
	return res.status(201).send("created")
  } catch (error) {
    next(error);
  }
};





export const getAllProducts = async (req, res, next) => {
  try {
    let product = await getProducts();

	if(!product){
		return res.status(400).send("Products is not available")
	}
	return res.status(200).json(product)

  } catch (error) {
    next(error);
  }
};




export const getByIdProduct = async(req, res, next) => {
  try {

	let id = req.params.id
	let product = await getProductId(id)
	if(!product){
		res.status(404).send("Products is not found")
	}
	return res.status(404).json(product)

  } catch (error) {
    next(error);
  }
};

export const updateByIdProducts = async(req, res, next) => {
  try {
	let id = req.params.id
	let body = req.body

    let products = await readFileDb(productsJsonPath);
	for(let i = 0; i < products.length; i++){
		if(products[i].id === id){
			let oldId = products[i].id
			products[i] = {
				id : oldId,
				...body
			}
			break
		}
	}
	let chack = writeJson(productsJsonPath, products)
	if(chack){
		return res.status(200).send("Updated")
	}
	return res.status(400).send("error in update")

  } catch (error) {
    next(error);
  }
};

export const deleteByIdProducts = async (req, res, next) => {
  try {
	let id = req.params.id
    let products = await readFileDb(productsJsonPath);
	for (let i = 0; i < products.length; i++){
		if(products[i].id === id){
			products.splice(i, 1)
			break
		}
	}
	let chack = writeJson(productsJsonPath, products)
	if(chack){
		return res.status(200).send("Deleted")
	}
	return req.status(400).send("error in delete")
  } catch (error) {
    next(error);
  }
};
