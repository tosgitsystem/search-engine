import { Api } from "../config"


export const search = async (data:{type:string ,q:string,page?:number})  => {
    return (await Api.post("/search?type=" + data.type, data)).data
} 

export const autoComplete = async (data:{q:string})  => {
    return (await Api.post("/autocomplete", data)).data
} 



export const videoSearch = async (data:{q:string})  => {
    return (await Api.post("/videos", data)).data
} 


export const imageSearch = async (data:{q:string})  => {
    return (await Api.post("/images", data)).data
} 

export const newsSearch = async (data:{q:string})  => {
    return (await Api.post("/news", data)).data
} 


