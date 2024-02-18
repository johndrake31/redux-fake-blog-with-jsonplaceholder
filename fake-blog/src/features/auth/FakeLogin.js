import React, {
    useEffect,
    useRef,
} from "react";
import { Container, Box, Button, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { loginAuth } from "./authSlice";
import { useHistory } from 'react-router-dom';


const FakeLogin = () => {
    const auth = useSelector((state) => state.auth.login);
    const dispatch = useDispatch();
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const history = useHistory();
    
    useEffect(() => {
        if (auth) {
            history.push('/');
        }
    }, [auth]);

    const submitFormHandler = () => {
        const email = emailRef.current.value;
        const fakePassword = passwordRef.current.value;
        dispatch(loginAuth({ email, password: fakePassword }))
    }

    return (
        <>
            <h1>Login</h1>
            <Container maxWidth="sm">
                <Box sx={{
                    height: "95%",
                    paddingY: 5,
                    display: "flex",
                    flexDirection: 'column',
                    border: "3px solid black",
                    borderRadius: 5,
                }}>
                    <Box sx={{ marginBottom: 5 }}>
                        <TextField
                            inputRef={emailRef}
                            id="user-email"
                            label="Email"
                            variant="outlined"
                        />
                    </Box>
                    <Box sx={{ marginBottom: 5 }}>
                        <TextField
                            inputRef={passwordRef}
                            id="password"
                            label="user fake password"
                            variant="outlined"
                            type="password"
                        />
                    </Box>
                    <Box>
                        <Button variant="outlined" onClick={submitFormHandler}>Submit</Button>
                    </Box>
                </Box>
            </Container>
        </>
    );
};

export default FakeLogin;
