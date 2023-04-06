import axios from 'axios'
import React from 'react'
import { NavLink } from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux"
import { Outlet, useNavigate } from 'react-router-dom'
import { clearState } from '../../slices/userSlice'

function Admin() {
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
        <NavLink to="/admin/all-projects" className={({isActive})=>isActive===true?"bg-primary active nav-link laxman":"inactive nav-link"} > All Projects</NavLink>
        </li>
        <li className='nav-item float-end'>
        <NavLink to="/admin/add-project" className={({isActive})=>isActive===true?"active nav-link":"inactive nav-link"} > Add Project</NavLink>
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


      {/* <div className='bg-dark p-4 nav h4 d-flex justify-content-center'>
        <li className='nav-item float-end'>
        <NavLink className='text-light text-end' onClick={()=>navigate("")}> All Projects</NavLink>
        </li>
        <li className='nav-item float-end'>
        <NavLink className='text-light text-end' onClick={()=>navigate("add-project")}> Add Project</NavLink>
        </li>
        <li className='nav-item float-end'>
        <NavLink className='text-light text-end' onClick={handleLogout}> Logout</NavLink>
        </li>
      </div>
      <div className=''>
        <p className='text-success fs-4 p-3'>Welcome {userObj.name}</p>
      </div>
      <div>
        {/* <DisplayUsers users={users} setUsers={setUsers}/> */}
        {/* <Outlet/> */}
      {/* </div> */}
    </div>
  )
}

export default Admin