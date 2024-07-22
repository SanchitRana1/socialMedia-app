import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    token: null,
    posts: [],
  },
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state, action) => {
      state.user = null;
      state.token = null;
    },
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.error("User friends doesn't exist !");
      }
    },
    setPosts: (state, action) => {
        state.posts = action.payload.posts
    },
    setPost: (state, action) => {
        const updatedPosts = state.posts.map((post)=>{
            if(post._id === action.payload.post_id) return action.payload.post;
            return post
        })
        state.posts = updatedPosts
    },
  },
});

export const { setLogin,setLogout,setFriends,setPosts,setPost } = userSlice.actions;
export default userSlice.reducer;
