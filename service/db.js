import {readFileSync, writeFileSync} from "fs"
export const readFileDb = (url) =>{
    let data = readFileSync(url, "utf-8")
    let products = JSON.parse(data)
    return products
}


export const writeJson = (url, data) =>{
    writeFileSync(url, JSON.stringify(data), "utf-8")
    return true
}