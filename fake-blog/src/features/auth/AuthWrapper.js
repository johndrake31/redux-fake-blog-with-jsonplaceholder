import React from 'react';

//create a wrapper element that checks for state.auth.login and passes the child if true and redirects to login if false

import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

export const AuthWrapper = ({ children }) => {
    const auth = useSelector((state) => state.auth.login);
    return <>{auth ? children : <Redirect to="/login" />}</>;
}