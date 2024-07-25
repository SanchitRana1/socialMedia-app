import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PostCard from './PostCard';
import { setPosts } from '../utils/userSlice';
import { POSTS_API } from '../utils/constants';

const PostsWidget = ({userId, isProfile=false}) => {
    const dispatch = useDispatch();
    const { token,posts } = useSelector((store) => store?.user);

    const getPosts = async()=>{
        const response = await fetch(`${POSTS_API}`,{
            method:"GET",
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        const posts = await response.json()
        dispatch(setPosts({posts:posts?.data}))
    }
    
    const getUserPosts = async()=>{
        const response = await fetch(`${POSTS_API}/${userId}`,{
            method:"GET",
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        const userPosts = await response.json()
        dispatch(setPosts({posts:userPosts?.data}))
    }

    useEffect(()=>{
        if(isProfile){
            getUserPosts();
        }else{
            getPosts();
        }
    },[])
  return (
    <div className='flex flex-col-reverse'>
        {posts.map(({_id,userId,firstName,lastName,description,location,picturePath,userPicturePath,likes,comments})=><PostCard key={_id} postId={_id} postUserId={userId} name={`${firstName} ${lastName}`} description={description} location={location} picturePath={picturePath} userPicturePath={userPicturePath} likes={likes} comments={comments} />) }
        
    </div>
  )
}

export default PostsWidget