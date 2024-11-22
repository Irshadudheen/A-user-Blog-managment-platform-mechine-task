import { Request, Response, Router } from "express";
import { requireAuth } from "../../middlewares/require-auth";
import { currentUser } from "../../middlewares/current-user";
import { validateRequest } from "../../middlewares/validateRequest";
import { param } from "express-validator";
import { Blog } from "../../models/blog";
import { BadRequestError } from "../../errors/bad-request-error";

const router =Router()
router.put('/api/blog/:blogId',[
    param('blogId').isMongoId().withMessage('blogId is required')
],validateRequest,requireAuth,currentUser,
    async (req:Request,res:Response)=>{
        const {title,description,image}=req.body;
        const {blogId}=req.params;
        const blog= await Blog.findById(blogId)
        if(!blog){
            throw new BadRequestError('the blog not found')
        }
        blog.title=title||blog.title
        blog.description=description||blog.description
        blog.image=image||blog.image
        await blog.save()
        res.status(200).send(blog)

    }
)
export {router as editBlogRouter}