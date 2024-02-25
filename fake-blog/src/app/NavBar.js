import React, { useEffect } from 'react';
import { AppBar, Toolbar, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { logoutAuth } from '../features/auth/authSlice';
import { useHistory } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
export const NavBar = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const auth = useSelector(state => state.auth.login);

    useEffect(() => {
        console.log(auth);
    }, [auth]);



    // route to login page
    const loginHandler = () => {
        history.push('/login');
    };
    const goHome = () => {
        history.push('/');
    };

    const logoutHandler = () => {
        dispatch(logoutAuth());
    };
    const createPostHandler = () => {
        history.push('/create-post');
    };

    const LoggedIn = () => {
        return (
            <>
                <Button color="inherit" onClick={logoutHandler}>
                    Logout
                </Button>
                <Button color="inherit" onClick={createPostHandler}>
                    Create Post
                </Button>
            </>
        )
    }

    return (
        <AppBar position="static">
            <Toolbar>
                <Button onClick={goHome} variant="h6" component="div" >
                    <HomeIcon />
                </Button>
                {/* create a home icon with a home route */}

                {auth ? (
                    LoggedIn()
                ) : (
                    <Button color="inherit" onClick={loginHandler}>
                        Login
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    );
}

export default NavBar;