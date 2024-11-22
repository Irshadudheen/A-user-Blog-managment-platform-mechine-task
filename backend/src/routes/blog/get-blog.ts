import { Request, Response, Router } from "express";
import { param } from "express-validator";
import { validateRequest } from "../../middlewares/validateRequest";
import { requireAuth } from "../../middlewares/require-auth";
import { currentUser } from "../../middlewares/current-user";
import { Blog } from "../../models/blog";

const router = Router()
router.get('/api/blog/:blogId',[
    param('blogId').isMongoId().withMessage('blogId is required')
],validateRequest,requireAuth,currentUser,
async (req:Request,res:Response) => {
    const {blogId} = req.params
    const blog = await Blog.findById(blogId).populate('userId')
    console.log(blog)
    res.status(200).send(blog)
})
export {router as getBlogRouter}