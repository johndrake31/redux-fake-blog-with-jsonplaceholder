import { createSlice, createAsyncThunk, nanoid } from "@reduxjs/toolkit";
import { getRandomDateWithinRange } from "../../utils/dateUtils";
import  client  from '../../api/client'


export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async () => {
    try {
      const response = await client.get('/posts');
      response.data.forEach((post) => {
        post.date = getRandomDateWithinRange(80, 0).toISOString();
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const addPost = createAsyncThunk(
  'posts/addPost',
  async (postData) => {
    
    try {
      const response = await client.post('/posts', postData);
      
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const editPost = createAsyncThunk(
  'posts/editPost',
  async (postData) => {  
    try {
      const response = await client.post('/posts', postData);

      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const postsSlice = createSlice({
  // createSlice is a function that takes an object with three fields: name, initialState, and reducers
  name: "posts",
  initialState: {
    posts: [],
    status: "idle",
    error: null,
  },
  reducers: {


  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addPost.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts.push(action.payload); // Push the new post to the posts array
      })
      .addCase(addPost.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(editPost.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(editPost.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // replace edited post in the posts array
        const { id, title, body, userId } = action.payload;
        const existingPost = state.posts.find((post) => post.id === id);
        if (existingPost) {
          existingPost.title = title;
          existingPost.body = body;
          existingPost.userId = userId;
        }}
      )
      .addCase(editPost.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        
      })

      
  },
});



export const { } = postsSlice.actions

export default postsSlice.reducer