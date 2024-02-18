import React, {
    useEffect,

} from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { fetchUsers } from './usersSlice';

import { Box, Container, Typography } from '@mui/material';


const UsersList = () => {
    const users = useSelector((state) => state.users.users);
    const status = useSelector((state) => state.users.status);
    const error = useSelector((state) => state.users.error);
    const dispatch = useDispatch();
    let content;

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchUsers());
        }
    }, [status, dispatch]);

    if (status === 'loading') {
        content = <div className="loader">Loading...</div>;
    }
    else if (status === 'succeeded') {
        content = users.map((user) => (

            <Box 
            sx={{ 
                marginBottom: 5,
                border: '3px solid black',
                borderRadius: 5,
                padding: 5,
                backgroundColor: 'lightgray'
            
            }}
            key={user.id}
            >
                <Typography variant="h3">{user.name}</Typography>
                <br />
                <Typography variant="h5">{user.email}</Typography>
                <Typography variant="h6">{user.phone}</Typography>
                <Typography variant="h6">{user.website}</Typography>
                <br />
                <Typography variant="h6">{user.company.name}</Typography>
                <Typography variant="h6">{user.company.catchPhrase}</Typography>
                <Typography variant="h6">{user.company.bs}</Typography>
            </Box>
        ));
    }
    else if (status === 'error') {
        content = <div>{error}</div>;
    }
    return (
        <Container sx={{marginTop: 5}}>

                <Typography variant='h2' sx={{
                    marginBottom: 5,
                    textAlign: 'center'
                }}>
                    Users List
                </Typography>
                {content}

        </Container>

    );
}

export default UsersList;