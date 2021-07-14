import React from 'react'
import Post from "./Post"

function Profile({user}) {
    return (
        <div>
            <h1>{user.username} posted :</h1>
            {
                user.posts.map(post=>{
                    return <Post key={post._id} post={post}/>
                }
                )}
        </div>
    )
}

export default Profile
