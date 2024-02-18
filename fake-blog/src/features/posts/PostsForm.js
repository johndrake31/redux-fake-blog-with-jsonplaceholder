import React, {
    useRef,
} from "react";
import { Container, Box, Button, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { addPost } from "./postsSlice";

const PostsForm = () => {
    const dispatch = useDispatch();
    const titleRef = useRef(null);
    const contentRef = useRef(null);
    
    const submitFormHandler = () => {
        const title = titleRef.current.value;
        const content = contentRef.current.value;
        dispatch(addPost({ title, content }))
    }
    return (
        <>
            <h1>PostsForm</h1>
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
                            inputRef={titleRef}
                            id="post-title"
                            label="Title"
                            variant="outlined"
                        />
                    </Box>
                    <Box sx={{ marginBottom: 5 }}>
                        <TextField
                            inputRef={contentRef}
                            id="post-content"
                            label="Post Content"
                            multiline
                            rows={4}
                            maxRows={4}
                            variant="outlined"
                            
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

export default PostsForm;
