import express, { Request, Response } from 'express'
import { body } from 'express-validator';
import { validateRequest } from '../../middlewares/validateRequest';
import { User } from '../../models/user';
import { BadRequestError } from '../../errors/bad-request-error';
import { Password } from '../../service/password';
import jwt from 'jsonwebtoken';

const router = express.Router()

router.post('/api/users/signin', [
    body('email')
        .isEmail()
        .withMessage('Email must be vaild'),
    body('password')
        .trim()
        .notEmpty()
        .withMessage('You must supply a password')

], validateRequest, async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email })
    if (!existingUser) {
        throw new BadRequestError('Email not found');
    }
    const passwordsMatch= await Password.compare(
        existingUser.password,
        password
    )
    if (!passwordsMatch) {
        throw new BadRequestError('password not match')
    }
    const userJWt = jwt.sign({
        id: existingUser.id,
        email: existingUser.email
    }, process.env.JWT_KEY!)
    req.session = { jwt: userJWt };
   
    const userData:any = existingUser.toObject()
    userData.token = userJWt
    userData.id=existingUser._id
    console.log(existingUser)
    res.status(200).send(userData);
})

export { router as siginRouter };