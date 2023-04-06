import "./SuperAdmin.css"
import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux"
import { Outlet, useNavigate } from 'react-router-dom'
import { clearState } from '../../slices/userSlice'

function SuperAdmin() {
    let {userObj,role}=useSelector(state=>state.user)
    let navigate=useNavigate()

    let dispatch = useDispatch() 

    const handleLogout = ()=>{
        let actionObj = clearState()
        dispatch(actionObj)
        sessionStorage.removeItem("token")
        navigate("/")
    }

  return (
    <div>
      <div className='bg-dark p-4 nav h4 justify-content-center'>
        <li className='nav-item'>
        <NavLink to="new-users" className={({isActive})=>isActive===true?"bg-primary active nav-link laxman":"inactive nav-link"} > New Users</NavLink>
        </li>
        <li className='nav-item float-end'>
        <NavLink to="/super-admin/all-users" className={({isActive})=>isActive===true?"active nav-link":"inactive nav-link"} > All Users</NavLink>
        </li>
        <li className='nav-item float-end'>
        <NavLink to="/super-admin/blocked-users" className={({isActive})=>isActive===true?"active nav-link":"inactive nav-link"} > Blocked users</NavLink>
        </li>
        <li className='nav-item float-end'>
        <a style={{cursor:"pointer"}}  className="inactive nav-link" onClick={handleLogout}> Logout</a>
        </li>
      </div>
      <div className=''>
        <p className='text-success fs-4 p-3'>Welcome {userObj.name}</p>
      </div>
      <div>
        {/* <DisplayUsers users={users} setUsers={setUsers}/> */}
        <Outlet/>
      </div>
    </div>
  )
}

export default SuperAdmin