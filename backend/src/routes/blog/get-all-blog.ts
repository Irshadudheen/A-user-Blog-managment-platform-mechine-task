import { Request, Response, Router } from "express";
import { requireAuth } from "../../middlewares/require-auth";
import { currentUser } from "../../middlewares/current-user";
import { Blog } from "../../models/blog";
import { BadRequestError } from "../../errors/bad-request-error";

const router = Router()
router.get('/api/blog/all',requireAuth,currentUser
    ,async (req:Request,res:Response) => {
        console.log(req.currentUser)
        if(!req.currentUser?.id){
            throw new BadRequestError('the user not login')
        }
        const blogs = await Blog.find({userId:req.currentUser.id}).populate('userId')
        res.status(200).send(blogs)
    }
)
export {router as getAllBlog}