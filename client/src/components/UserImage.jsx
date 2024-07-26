import React from 'react'
import { ASSETS_API } from '../utils/constants'

const UserImage = ({image}) => {
  return (
    <div className="mx-1 px-2">
        <img className="h-[3.5rem] w-[3.5rem] object-cover rounded-full" src={`${image}`} alt="user" />
    </div>
  )
}

export default UserImage