import { Avatar, IconButton } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { stateContext } from '../contextApi/StateProvider'
// import {} from "@mui/icons-materials"
import "./Sidebar.css"
import { Chat, CollectionsOutlined, DonutLarge, MoreVert, SearchOutlined } from '@mui/icons-material'
import SidebarChat from '../SidebarChat/SidebarChat'
import axios from 'axios'
import { Config } from '../../Config'
import Pusher from 'pusher-js'
import loader from "../../w-loader.gif"

function Sidebar() {
    const [{user}]= useContext(stateContext);
    const [Rooms,setRooms]=useState([]);
    const [loading,setLoading]=useState(false);
console.log(loading);
    useEffect(()=>{
        getData();
        // setLoading(false);
        // console.log(loading)
    },[])

    useEffect(()=>{   // pusher codes goes here
        var pusher = new Pusher('6e68f2047bc3e3f5d09d', {
            cluster: 'ap2'
          });

          var channel = pusher.subscribe('rooms');
    channel.bind('inserted', function(room) {
    //   console.log(rooms);
    setRooms((Prevrooms)=>[...Prevrooms,room])
    });

    },[])

const getData =async()=>{
    
    
    try {
        setLoading(true);
        // console.log(loading)
      let room = await axios.get(`${Config.api}/all/rooms`);
      setRooms(room.data);
      console.log(loading);
      setLoading(false);
    } catch (error) {
        console.log(error)
    }
    
    
}
//  console.log(rooms)
  return (
    
    
    <div className='sidebar'>
        <div className='sidebar-header'>
            <Avatar src={user.photoURL} />
            
        </div>
        {/* <div className='sidebar-search'>
            <div className='sidebar-searchContainer'>
                <SearchOutlined/>
                <input placeholder='Search'/>
            </div>
        </div> */}
        
        <div className='sidebar-chats'>
            <SidebarChat addNewChart/>
            {loading ? <div className="preloader"> <img src={loader} alt="" height={"30px"} /></div> :
            
                Rooms.map((room)=>{
                   return  <SidebarChat key={room._id} id={room._id} name={room.name} />
                })
            }
            
        </div>


        </div>
    
        

  )
}

export default Sidebar