import React from 'react'
import { ASSETS_API } from '../utils/constants'

const UserImage = (image) => {
  return (
    <div className="mx-2 w-14">
        <img className="w-14 h-14 object-cover rounded-full" src={`${ASSETS_API}/${image.image}`} alt="user" />
    </div>
  )
}

export default UserImage