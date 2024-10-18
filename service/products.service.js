import path from 'path'
import { readFileDb, writeJson } from './db.js'
import {v4} from 'uuid'
let productsJsonPath = path.join(process.cwd(), "database", "products.json")


export const getProducts = () =>{
    return readFileDb(productsJsonPath)
}

export const getProductId = (id) =>{
    let products = readFileDb(productsJsonPath)
    for (let product of products){
        if(product.id === id){
            return product
        }
    }

    return false
}

export const createProductsDb = async (product) =>{
    // console.log(product);
    let products = await readFileDb(productsJsonPath)
    let newProduct = {
        id : v4(),
        ...product
    }
    products.push(newProduct)
    let writed = await writeJson(productsJsonPath, products)
    if(writed){
        return writed
    }
    return false
}