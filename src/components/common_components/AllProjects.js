import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "./ProjectDetailedView.css"
import { useSelector } from 'react-redux';
import { Button,Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
function AllProjects({url}) {

    let navigate=useNavigate()
    let {role}=useSelector(state=>state.user)
    let [projects,setProjects]= useState([])
    let [managers,setManagers]=useState({gdo:[],pm:[]})

    let [refresh,setRefresh] = useState(false)
    let {register,setValue,getValues,formState:{errors}}=useForm()


    //Get all managers
    const getData = async() =>{
        let res= await axios.get("http://localhost/user/managers")
        console.log(res.data);
        setManagers(res.data)
    }
    //state for modal
  let [show,setShow]=useState()

  //function to open model
  const openModal=()=>setShow(true)

  //function close model
  const closeModal=()=>setShow(false)

    //read token from browser storage
    let token = sessionStorage.getItem("token")

    const redirectHandler = (project_id) =>{
            navigate(`../project/${project_id}`)
    }
    const handleEdit = async (project) => {
        console.log(project);
        setValue("project_name",project.project_name)
        setValue("start_date",project.start_date.toString().slice(0,10))
        setValue("client",project.client)
        setValue("domain",project.domain)
        openModal()

    }
    const saveChanges =async (project_id) =>{
      console.log(project_id);
        closeModal()
        let modifiedProject = getValues()
        modifiedProject.end_date===""?modifiedProject.end_date=null:modifiedProject.end_date=modifiedProject.end_date
        console.log(modifiedProject)
        let res = await axios.put(`http://localhost/admin/project/${project_id}`,modifiedProject,{headers:{
          Authorization:`Bearer ${token}`
        }})
        setRefresh(true)
        console.log(res);
    }

    const handleDelete = async (project_id)=>{
      let res = await axios.delete(`http://localhost/admin/project/${project_id}`,{headers:{
        Authorization:`Bearer ${token}`
      }})
      setRefresh(true)
      console.log(res);
    }

    const handleUpdateProject = async () =>{

    }
    //get all projects 
    const getProjects = async ( ) =>{
        console.log(url);
            let res = await axios.get(url,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            setProjects(res.data.payload)
            
    }

    useEffect(()=>{
            getProjects()
            getData()
            console.log(projects);
            setRefresh(false)
    },[refresh])
  return (
    <div>
        <div>
        <table className='table table-bordered table-striped table-responsive'>
            
                <thead className='bg-info text-white'>
                <tr>
                    <th>Project Name</th>
                    <th>Client</th>
                    <th>Status</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    {/* <th>Details</th> */}
                    {role==="admin" &&
                    <th>Action</th>
                    }
                </tr>
                </thead>
                <tbody>
              {projects.map((project,index)=>(
                    <tr key={index} style={{cursor:"pointer"}} >

{/* onClick={()=>redirectHandler(project.project_id)} */}
                        
                    <td onClick={()=>redirectHandler(project.project_id)}>{project.project_name}</td>
                    <td onClick={()=>redirectHandler(project.project_id)}>{project.client}</td>
                    <td onClick={()=>redirectHandler(project.project_id)}>{project.status}</td>
                    <td onClick={()=>redirectHandler(project.project_id)}>{project.start_date.toString().slice(0,10)}</td>
                    <td onClick={()=>redirectHandler(project.project_id)}>{project.end_date===null?"-":project.end_date.toString().slice(0,10)}</td>
                    {/* <td>
                        <button className='btn btn-success'>View Details</button>
                    </td> */}
                    {role==="admin" &&
                    <td>
                        <button className='btn btn-primary me-3' onClick={()=>handleEdit(project)}>Edit</button>
                        <button className='btn btn-danger' onClick={()=>handleDelete(project.project_id)}>Delete</button>
                    </td>}
                     {/* Modal for editing */}

            <Modal show={show} onHide={closeModal} backdrop="static">
                            <Modal.Header closeButton>
                            <Modal.Title>Edit Project Details</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                            <form className='form'>

          {/* Input field for Project name */}
        <div className='m-3'>
            <input type="text" className='form-control' {...register("project_name",{required:"Project is required"})} placeholder='Project Name'/>
            {errors.name && <p className='text-danger text-start ms-2'>{errors.name.message}</p>}
          </div>

          {/* Client input  */}
          <div className='m-3'>
            <input type="text" className='form-control' {...register("client",{required:"Client is required"})} placeholder='Client'/>
            {errors.email && <p className='text-danger text-start ms-2'>{errors.email.message}</p>}
          </div>
          {/* Start date */}
            <div className='m-3'>
                <label className='form-label'>Start Date</label>
                <input type="date" className='form-control' {...register('start_date',{required:"Start date is required"})} placeholder="Start date"/>
            </div>

            {/* Domain of Project */}
          <div className='m-3'>
            <select className='form-control' {...register("domain",{required:"Domain of project is required"})} defaultValue={project.domain}>
                <option value="title" disabled>--- Select Domain of project ---</option>
                <option value="Artificial intelligence">Artificial intelligence</option>
                <option value="Web Technology">Web Technology</option>
                <option value="Data Science">Data Science</option>
                <option value="IoT">IoT</option>
               
            </select> 
          </div>

          {/* Type of Project */}
          <div className='m-3'>
            <select className='form-control' {...register("project_type",{required:"Type of project is required"})} defaultValue={project.project_type}>
                <option value="title" disabled>--- Select Type of project ---</option>
                <option value="Development">Development</option>
                <option value="DevOps">DevOps</option>
                <option value="Test Automation">Test Automation</option>
                <option value="Performance Testing">Performance Testing</option>
                <option value="Security">Security</option>
                <option value="Sustenance Engineering">Sustenance Engineering</option>
                <option value="Mobility">Mobility</option>
                <option value="Storage">Storage</option>
               
            </select> 
          </div>

          {/* GDO field */}
          <div className='m-3'>
            <select className='form-control' {...register("gdo",{required:"GDO is required"})} defaultValue={project.gdo}>
                <option  value="title" >--- Select GDO for the project ---</option>
                {managers.gdo.map((gdo,index)=>(
                        <option key={index} value={gdo.email}>{gdo.name}</option>
                ))}
                  
            </select> 
          </div>

          {/* Project Manager field */}
          <div className='m-3'>
            <select className='form-control' {...register("project_manager",{required:"Project Manager is required"})} defaultValue={project.project_manager}>
                <option  value="title" >--- Select Project Manager for the project ---</option>
                {managers.pm.map((pm,index)=>(
                        <option key={index} value={pm.email}>{pm.name}</option>
                ))}  
            </select> 
          </div>

          {/* End date */}
          <div className='m-3'>
                <label className='form-label'>End Date</label>
                <input type="date" className='form-control' {...register('end_date',{required:"Start date is required"})} placeholder="Start date"/>
            </div>

        </form>
                            
                            </Modal.Body>
                            <Modal.Footer>
                            <Button variant="secondary" onClick={closeModal}>
                                Close
                            </Button>
                            <Button variant="success" onClick={()=>saveChanges(project.project_id)}>
                                Save Changes
                            </Button>
                            </Modal.Footer>
                        </Modal>
                    </tr>
                    
                    
                    ))
                    }
                    </tbody>
                </table>
            </div>

           
                
    </div>
  )
}

export default AllProjects