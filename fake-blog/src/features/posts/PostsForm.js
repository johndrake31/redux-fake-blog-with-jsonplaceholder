import React, { useEffect, useRef, useState } from "react";
import { Container, Box, Button, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addPost, editPost } from "./postsSlice";
import { useParams } from "react-router-dom";
import client from "../../api/client";
import { useHistory } from "react-router-dom";

const PostsForm = () => {
    const [post, setPost] = useState(null);
    const authUserId = useSelector((state) => state.auth.user[0].id);
    const status = useSelector((state) => state.posts.status);
    const dispatch = useDispatch();
    const titleRef = useRef(null);
    const contentRef = useRef(null);
    const { postId } = useParams();
    const oldPost = useSelector((state) => state.posts.posts.find((post) => post.id === +postId));
    const history = useHistory();

    useEffect(() => {
        if (postId) {
            if (oldPost) {
                setPost(oldPost);
            } else {
                client.get(`/posts/${postId}`).then((response) => {
                    setPost(response.data);
                });
            }
        }
    }, [postId, oldPost]);

    const submitFormHandler = () => {
        const title = titleRef.current.value;
        const body = contentRef.current.value;
        dispatch(
            postId
                ? editPost({ id: postId, userId: authUserId, title, body })
                : addPost({ userId: authUserId, title, body })
        );
        if (status === "succeeded") history.push("/");
    };

    return (
        <>
            <h1>{postId ? "Edit Post #" + postId : "Create Post"}</h1>
            <Container maxWidth="sm">
                <Box
                    sx={{
                        height: "95%",
                        paddingY: 5,
                        display: "flex",
                        flexDirection: "column",
                        border: "3px solid black",
                        borderRadius: 5,
                    }}
                >
                    <Box sx={{ marginBottom: 5 }}>
                        <TextField
                            inputRef={titleRef}
                            id="post-title"
                            label="Title"
                            variant="outlined"
                            multiline
                            defaultValue={post ? post.title : ""}
                            InputLabelProps={{ shrink: true }}
                        />
                    </Box>
                    <Box sx={{ marginBottom: 5 }}>
                        <TextField
                            inputRef={contentRef}
                            id="post-content"
                            label="Post"
                            multiline
                            rows={4}
                            maxRows={4}
                            variant="outlined"
                            defaultValue={post ? post.body : ""}
                            InputLabelProps={{ shrink: true }}
                        />
                    </Box>
                    <Box>
                        <Button variant="outlined" onClick={submitFormHandler}>
                            Submit
                        </Button>
                    </Box>
                    {status === "error" && (
                        <Box sx={{ color: "red", marginTop: 5 }} >
                            Error occurred while submitting the form. Try again.
                        </Box>
                    )}
                </Box>
            </Container>
        </>
    );
};

export default PostsForm;
