import React, { useState, useEffect, useContext } from 'react';

import { TextField, Box, Button, Typography, styled } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {useDispatch} from 'react-redux'

import { userLoing, userSignUp } from '../../Api/user';
import toast from 'react-hot-toast';
import {setUser} from '../../redux/userSlice'
// import { DataContext } from '../../context/DataProvider';

const Component = styled(Box)`
    width: 400px;
    margin: auto;
    box-shadow: 5px 2px 5px 2px rgb(0 0 0/ 0.6);
`;

const Image = styled('img')({
    width: 100,
    display: 'flex',
    margin: 'auto',
    padding: '50px 0 0'
});

const Wrapper = styled(Box)`
    padding: 25px 35px;
    display: flex;
    flex: 1;
    overflow: auto;
    flex-direction: column;
    & > div, & > button, & > p {
        margin-top: 20px;
    }
`;

const LoginButton = styled(Button)`
    text-transform: none;
    background: #FB641B;
    color: #fff;
    height: 48px;
    border-radius: 2px;
`;

const SignupButton = styled(Button)`
    text-transform: none;
    background: #fff;
    color: #2874f0;
    height: 48px;
    border-radius: 2px;
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
`;

const Text = styled(Typography)`
    color: #878787;
    font-size: 12px;
`;

const Error = styled(Typography)`
    font-size: 10px;
    color: #ff6161;
    line-height: 0;
    margin-top: 10px;
    font-weight: 600;
`

const loginInitialValues = {
    email: '',
    password: ''
};

const signupInitialValues = {
    name: '',
    email: '',
    password: '',
};

const Login = () => {
    const [login, setLogin] = useState(loginInitialValues);
    const [signup, setSignup] = useState(signupInitialValues);
    const [error, showError] = useState('');
    const [account, toggleAccount] = useState('login');
    const dispatch = useDispatch()
    const navigate = useNavigate();
    // const { setAccount } = useContext(DataContext);

    const imageURL = 'https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png';

    useEffect(() => {
        showError(false);
    }, [login])

    const onValueChange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value });
    }

    const onInputChange = (e) => {
        setSignup({ ...signup, [e.target.name]: e.target.value });
    }

    const loginUser = async () => {
        // let response = await API.userLogin(login);
        try {
            
      
        console.log(login)
        const response = await userLoing(login)
        console.log(response)
        if (response) {
            showError('');

           
            // setAccount({ name: response.data.name, username: response.data.username });

            // isUserAuthenticated(true)
            setLogin(loginInitialValues);
            // console.log(response)
            // return
            dispatch(setUser({
                name: response.name,
                email:response.email,
                id: response.id,
                token:response.token
            }))
            navigate('/');
            // window.location.href='/'
        } else {
            showError('Something went wrong! please try again later');
        }
    } catch (error) {
        console.log(error)
        if(error.response?.data.errors[0].message){

            toast.error(error.response.data.errors[0].message)
            console.log(error.response.data.errors[0].message)
        }
            else
            toast.error(error)
    }
    }

    const signupUser = async () => {
        try {
            console.log(signup)
            const response = await userSignUp(signup);
            console.log(response)
            if (response.id) {
                showError('');
                setSignup(signupInitialValues);
                toggleAccount('login');
            } else {
                showError('Something went wrong! please try again later');
            }
        } catch (error) {
            console.log(error)
        }

    }

    const toggleSignup = () => {
        account === 'signup' ? toggleAccount('login') : toggleAccount('signup');
    }

    return (
        <Component>
            <Box>
                <Image src={imageURL} alt="blog" />
                {
                    account === 'login' ?
                        <Wrapper>
                            <TextField variant="standard" value={login.email} onChange={(e) => onValueChange(e)} name='email' label='Enter Email' />
                            <TextField variant="standard" value={login.password} type='password' onChange={(e) => onValueChange(e)} name='password' label='Enter Password' />

                            {error && <Error>{error}</Error>}

                            <LoginButton variant="contained" onClick={() => loginUser()} >Login</LoginButton>
                            <Text style={{ textAlign: 'center' }}>OR</Text>
                            <SignupButton onClick={() => toggleSignup()} style={{ marginBottom: 50 }}>Create an account</SignupButton>
                        </Wrapper> :
                        <Wrapper>
                            <TextField variant="standard" onChange={(e) => onInputChange(e)} name='name' label='Enter Name' />
                            <TextField variant="standard" onChange={(e) => onInputChange(e)} name='email' label='Enter Email' />
                            <TextField variant="standard" onChange={(e) => onInputChange(e)} type='password' name='password' label='Enter Password' />

                            <SignupButton onClick={() => signupUser()} >Signup</SignupButton>
                            <Text style={{ textAlign: 'center' }}>OR</Text>
                            <LoginButton variant="contained" onClick={() => toggleSignup()}>Already have an account</LoginButton>
                        </Wrapper>
                }
            </Box>
        </Component>
    )
}

export default Login;