import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'
interface UserPayload{
    id:string;
    email:string;

}
declare global {
    namespace Express{
        interface Request{
            currentUser?:UserPayload;
        }
    }
}
export const currentUser = (req:Request,res:Response,next:NextFunction)=>{
    if(!req.headers?.authorization){
      return  next()
    }
    try {
        const payload = jwt.verify(req.headers.authorization,process.env.JWT_KEY!) as UserPayload;
        req.currentUser = payload;
        console.log(req.currentUser,'the user')
    } catch (error) {
    console.log(error)
    }
    next()
}