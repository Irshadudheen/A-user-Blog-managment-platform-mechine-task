import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { User } from '../../models/user';
import { validateRequest } from '../../middlewares/validateRequest';
import { BadRequestError } from '../../errors/bad-request-error';
import jwt from 'jsonwebtoken'


const router = express.Router();

router.post('/api/users/signup', [
    body('name').trim().notEmpty().isLength({min:3,max:18}).withMessage('name must be between 3 to 18'),
    body('email')
        .isEmail()
        .withMessage('Email must be valid'),
    body('password')
        .trim()
        .isLength({ min: 4, max: 20 })
        .withMessage('Password must be between 4 and 20 characters')
],validateRequest,
async (req: Request, res: Response)=> {
   
    
    const { email, password ,name} = req.body;
    const existingUser = await User.findOne({email});

    if(existingUser){
       throw new BadRequestError('Email in use')

    }
    const user = User.build({name,email,password})
    await user.save()
  
    const userJWt =jwt.sign({
        id:user._id,
        email:user.email
    },process.env.JWT_KEY!)

    //Store it on session object
    req.session={
        jwt:userJWt
    }
     res.status(201).send(user); 
});

export { router as signupRouter };
