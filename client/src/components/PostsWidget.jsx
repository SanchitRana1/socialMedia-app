import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PostCard from './PostCard';
import { setPosts } from '../utils/userSlice';
import { POSTS_API } from '../utils/constants';
import Loader from './Loader';

const PostsWidget = ({userId, isProfile=false}) => {
    const dispatch = useDispatch();
    const { token,posts } = useSelector((store) => store?.user);
    const [loading, setLoading] = useState(false);
    
    const getPosts = async()=>{
        try {
            setLoading(true)
            const response = await fetch(`${POSTS_API}`,{
                method:"GET",
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            const posts = await response.json()
            dispatch(setPosts({posts:posts?.data}))
        }
         catch (error) {
            
        }finally{
            setLoading(false)
        }
    }
        
    
    const getUserPosts = async()=>{
        try {
            setLoading(true)
            const response = await fetch(`${POSTS_API}/${userId}`,{
                method:"GET",
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            const userPosts = await response.json()
            dispatch(setPosts({posts:userPosts?.data}))
        } catch (error) {
            
        }finally{
            setLoading(false)
        }
        
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
        {loading ? <Loader/> : <>
        {posts?.map(({_id,userId,firstName,lastName,description,location,picturePath,userPicturePath,likes,comments})=><PostCard key={_id} postId={_id} postUserId={userId} name={`${firstName} ${lastName}`} description={description} location={location} picturePath={picturePath} userPicturePath={userPicturePath} likes={likes} comments={comments} />) }
        </>}
        
    </div>
  )
}

export default PostsWidget