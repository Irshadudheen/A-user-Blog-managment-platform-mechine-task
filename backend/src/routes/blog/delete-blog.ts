import { Request, Response, Router } from "express";
import { param } from "express-validator";
import { validateRequest } from "../../middlewares/validateRequest";
import { requireAuth } from "../../middlewares/require-auth";
import { currentUser } from "../../middlewares/current-user";
import { Blog } from "../../models/blog";

const router = Router()
router.delete('/api/blog/:blogId',[
    param('blogId').isMongoId().withMessage('blogId is reuqired')
],validateRequest,requireAuth,currentUser,
async(req:Request,res:Response)=>{
const {blogId}=req.params;
await Blog.findByIdAndDelete(blogId)
res.status(200).send('blog delete succes')
})
export {router as deleteBlogRouter}