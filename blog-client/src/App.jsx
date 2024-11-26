import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { Box } from '@mui/material';

import { lazy, Suspense, useEffect, useState } from 'react';
import CreatePost from './components/create/CreatePost';
import Header from './components/header/Header';

import DetailView from './components/details/DetailView';
import Update from './components/create/Update';
import useGetUserData from './hook/useGetUser';
import { Toaster } from 'react-hot-toast';
const Login =lazy(()=>import('./components/account/Login'))

const Home =lazy(()=>import('./components/home/Home')) 
const PrivateRoute = ({ isAuthenticated, ...props }) => {
  
  return isAuthenticated ?  (
    <>
      <Header />
      <Outlet />
    </>
  ) : (
    <Navigate replace to="/account" />
  );
};

const App = () => {
const currentUser = useGetUserData()
console.log(currentUser,'the current user from redux')

  const [isAuthenticated, isUserAuthenticated] = useState(false);


  useEffect(() => {
    if(currentUser.token){
      isUserAuthenticated(true)
    }
  }, [isAuthenticated]);

  return (
    <div>
      <BrowserRouter>
      <Toaster/>
        <Box style={{ marginTop: 64 }}>
        <Suspense fallback={<>looding</>}>
          <Routes>
            <Route path="/account" element={currentUser&&currentUser.token?<Navigate to='/'/>:<Login />} />
            <Route path="/create" element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
              <Route path="/create" element={<CreatePost />} />
            </Route>
            <Route path="/update/:id" element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
              <Route path="/update/:id" element={<Update />} />
            </Route>
            <Route path="/" element={isAuthenticated? <PrivateRoute isAuthenticated={isAuthenticated} />:<Navigate to={'/account'}/>}>
              <Route path="/" element={isAuthenticated?<Home />:<Navigate to={'/account'}/>} />
            </Route>
            <Route path="/details/:id" element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
              <Route path="/details/:id" element={<DetailView />} />
            </Route>
          </Routes>
          </Suspense>
        </Box>
      </BrowserRouter>
    </div>
  );
};

export default App;
