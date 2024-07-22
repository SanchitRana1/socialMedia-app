import React, { useState } from 'react'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { useDispatch, useSelector } from 'react-redux';
import { setLogout } from '../utils/userSlice';

const DropDownHeader = () => {
    const user = useSelector((store) => store?.user);
    const fullName = user?.firstName + " " + user?.lastName;
    const theme = useSelector((store) => store?.app?.mode);
    const dark = theme==="dark"
    const [drop, setDrop] = useState(false)
    const dispatch = useDispatch();
    const onLogout = () => {
        dispatch(setLogout());
      };
  return (
    <div className={"flex flex-col cursor-pointer "} onClick={()=>{setDrop(!drop)}}>
            <div className={"flex justify-center items-center rounded-md " +(dark ? "bg-[#3f3f3f] text-white":"bg-[#f1efef]")}>
            <input type="text" className={"w-[5rem] outline-none rounded-md px-3 py-1 "+ (dark ? "bg-[#3f3f3f] text-white":"bg-[#f1efef]")} value={user?.firstName ? fullName : "Asdasd"} readOnly/>
            {!drop ? <ArrowDropDownIcon/>: <ArrowDropUpIcon/>
            }
            </div >
            {drop && <div className={"rounded-md absolute mt-7 w-[6.5rem] flex flex-col items-center justify-center " + (dark ? "bg-[#3f3f3f] text-white":"bg-[#f1efef] ")}>
            <p className="">{user?.firstName ? fullName : "Asdasd"}</p>
              <p onClick={onLogout}>Logout</p>
            </div>            
          }
            
          </div>
  )
}

export default DropDownHeader