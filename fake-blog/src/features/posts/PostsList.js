// postList
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts } from "./postsSlice";
import Card from "../../components/Card";
import { Typography } from "@mui/material";


export const PostsList = () => {

    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts.posts);
    const status = useSelector((state) => state.posts.status);
    const error = useSelector((state) => state.posts.error);
    
    let content;


    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchPosts());
        }
    }, [status, dispatch]);


    if (status === "loading") {
        content = <div className="loader">Loading...</div>;
    } else if (status === "succeeded") {
        const sortedPosts = posts.slice().sort((a, b) => new Date(b.date) - new Date(a.date));
        content = sortedPosts.map((post) => (
            <Card post={post} key={post.id}/>
        ));
    } else if (status === "error") {
        content = <div>{error}</div>;
    }

    // return statment
    return (
        <section>
            <Typography variant="h2">Posts</Typography>
            {content}
        </section>
    );
};

export default PostsList;
