import React from 'react'

const UserImage = (image) => {
  return (
    <div className="mx-2 w-14">
        <img className="w-14 h-14 object-cover rounded-full" src={`http://localhost:5000/assets/${image.image}`} alt="user" />
    </div>
  )
}

export default UserImage