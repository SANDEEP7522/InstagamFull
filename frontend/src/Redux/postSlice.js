import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
    name: 'post', 
    initialState: {
        posts: [], // according to post
        selectedPost: null, //for single selested post which post comment
    },
    reducers:{
        setPosts:(state, action) => {
            state.posts = action.payload;
        },
        setSelectedPost: (state, action) => {
            state.selectedPost = action.payload;
        }
    }
});
export const { setPosts, setSelectedPost } = postSlice.actions;
export default postSlice.reducer;


