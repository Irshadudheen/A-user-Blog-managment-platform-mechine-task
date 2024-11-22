import express, { json } from 'express'
import 'express-async-errors'

import {
    siginRouter,
    signupRouter,
    signoutRouter,
    currentUserRouter,
    createBlogRouter,
    uploadImageRouter,
    getAllBlog,
    getBlogRouter,
    editBlogRouter,
    deleteBlogRouter
   
} from './routes/index'
import { errorhandler } from './middlewares/error-handler'
import cookieSession from 'cookie-session'
import cors from 'cors'
import { NotFoundError } from './errors/not-found-error'
const app = express()


app.use(json())

app.use(cookieSession({
    signed: false
    , secure: false
}))
app.use(cors({ origin:process.env.clientPort, 
    credentials: true}))
app.use(currentUserRouter)
app.use(siginRouter)
app.use(signoutRouter)
app.use(signupRouter)
app.use(createBlogRouter)
app.use(uploadImageRouter)
app.use(getAllBlog)
app.use(getBlogRouter)
app.use(editBlogRouter)
app.use(deleteBlogRouter)
app.all('*', async () => {
    throw new NotFoundError();
})
app.use(errorhandler as express.ErrorRequestHandler)
export { app }