import { Request, Response, Router } from "express";
import { body, param } from "express-validator";
import { validateRequest } from "../../middlewares/validateRequest";
import { requireAuth } from "../../middlewares/require-auth";
import { currentUser } from "../../middlewares/current-user";
import { Blog } from "../../models/blog";
import { BadRequestError } from "../../errors/bad-request-error";

const router =Router();
router.post('/api/blog/create',[
    body('title').trim().notEmpty().withMessage(' title is required'),
    body('description').trim().notEmpty().withMessage(' content is required'),
    body('image').trim().notEmpty().withMessage('image is required'),

],validateRequest,requireAuth,currentUser,
async(req:Request,res:Response)=>{
    const {title,description,image}=req.body;
   
    if(!req.currentUser?.id){
        throw new BadRequestError('the user not login')
    }
    const {id}=req.currentUser
    const blog =  Blog.build({title,description,image,userId:id,createdDate:Date.now()})
   await blog.save()
   res.status(201).send(blog)

})
export {router as createBlogRouter}