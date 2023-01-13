import { Avatar } from '@mui/material'
import axios from 'axios'
import React from 'react'
import { Link } from 'react-router-dom'
import { Config } from '../../Config'
import "./SidebarChat.css"


function SidebarChat({id,name,addNewChart}) {

const createChat = async()=>{
  const roomName= prompt('Please Enter the Room Name')
    if(roomName){
      try {
    await axios.post(`${Config.api}/group/create`,{ groupName : roomName})
      } catch (error) {
        console.log(error)
      }
      

    }
  
}

  return !addNewChart ? (
    <Link to={`/rooms/${id}`}>
    <div className='sidebarChat'>
        <Avatar src='https://api.dicebear.com/5.x/personas/svg'/>
        <div className='sidebarChat-info'>
            <h2>{name}</h2>
        </div>
    </div>
    </Link>
  ) : (
    <div className='sidebarChat' onClick={createChat} >
        <h2>Add New Chat</h2>
    </div>
  )
}

export default SidebarChat