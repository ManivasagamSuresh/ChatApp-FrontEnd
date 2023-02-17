import { AttachFile, InsertEmoticon, MoreVert, SearchOffOutlined, SearchOutlined } from '@mui/icons-material'
import { Avatar, IconButton } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { Config } from '../../Config'
import "./Chat.css"
import {stateContext} from "../contextApi/StateProvider"
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Pusher from 'pusher-js'
import loaderM from "../../w-loader.gif" 

function Chat() {
  const [Input, setInput] = useState("");
  const [roomName,setRoomName]=useState('')
  const [updatedAt,setUpdatedAt]=useState("")
  const [messages,setMessages] = useState([]);
  const[{user}]=useContext(stateContext);
  const [loading,setLoading]=useState(false);

  // console.log(messages)
  const {roomId} = useParams();

  useEffect(()=>{
    roomData()
  },[roomId])


  useEffect(()=>{   // pusher codes goes here

    // Pusher.logToConsole = true; 

    const pusher = new Pusher('6e68f2047bc3e3f5d09d', {
        cluster: 'ap2'
      });

      const channel = pusher.subscribe('messages');
channel.bind('inserted', function(msg) {
  // console.log(messages)
  console.log(msg);
setMessages((prevMessages)=>[...prevMessages,msg]); // for this we need to comment the strict in index.js

});

},[])

  const roomData=async()=>{
    setLoading(true);
    if(roomId){
      let room = await axios.get(`${Config.api}/room/${roomId}`)
      let messages = await axios.get(`${Config.api}/messages/${roomId}`)
      setRoomName(room.data.name);
      setUpdatedAt(room.data.updatedAt);
      setMessages(messages.data)
      
    }
    setLoading(false);
  }

const sendMessage = async(e)=>{
e.preventDefault(); //form usually reload the whole page.. to prevent it
console.log(Input);
if(!Input){
  return;
}

try {
  await axios.post(`${Config.api}/messages/new`,{
    message : Input,
    name : user.displayName,
    timestamp : new Date(),
    uid : user.uid,
    roomId : roomId
  })
  setInput('');
} catch (error) {
  
}
}

  return (
    <div className='chat'>
      <div className='chat-header'>
        <Avatar src='https://api.dicebear.com/5.x/personas/svg'/>
        <div className='chat-headerInfo'>
          <h3>{roomName?roomName:"Welcome to our ChatAPP"}</h3>
          <p>{updatedAt
          ?`Last updated at ${ new Date(updatedAt).toString().slice(0,25) }`
          : "Click on any group"}</p>
        </div>
        {/* <div className='chat-headerRight'>
          <IconButton>
            <SearchOutlined/>
          </IconButton>
          <IconButton>
            <AttachFile/>
          </IconButton>
          <IconButton>
            <MoreVert/>
          </IconButton>
        </div> */}
      </div>
  <div className='chat-body'>

    { 
    loading ? <div className="preloader"> <img src={loaderM} alt="" height={"30px"} /></div>: 
      messages.map((msg,index)=>{
        return  <p className={`chat-message ${msg.uid === user.uid ? "chat-receiver" : ''}`} key={index}>
        <span className='chat-name' >{msg.name}</span>
        {msg.message}  
        <span className='chat-timestamp'>{new Date(msg.timestamp).toString().slice(0,25)}</span>
     </p>


      })
    }
    
      </div>
      {roomName && <div className='chat-footer'>
        {/* <InsertEmoticon/> */}
        <form>
          <input placeholder='type message'
          onChange={e=>setInput(e.target.value)}
          value={Input}
          />

          <button onClick={sendMessage}>send</button>
        </form>
      </div>}
    </div>
  )
}

export default Chat