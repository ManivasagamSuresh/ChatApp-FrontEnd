import React ,{useContext} from "react";
import {Button, button} from "@mui/material"
import { auth, provider } from "../../Firebase"
import { signInWithPopup } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import "./Login.css"
import {stateContext} from "../contextApi/StateProvider"
import {actionTypes} from "../contextApi/Reducer"

function Login() {

  const [state,dispatch]=  useContext(stateContext);
console.log(state);
  const signIn =async()=> {
try {
  let result = await signInWithPopup(auth,provider);
  // console.log(result);
  dispatch({
    type : actionTypes.SET_USER,
    user : result.user,
  })

} catch (error) {
  console.log(error);
}

    
  }
  return (
    <div className="login">
      <div className="login-container">
        <img src={require('../../chatLogo.png')} alt="hello"/>
        {/* <img src="https://t3.ftcdn.net/jpg/05/01/71/78/360_F_501717879_7RWecs3TL0zVJJXd7QAWzn39Z2CbEr4C.jpg"/> */}
      <div className="login-character">
        <h1>Sign in to ChatApp</h1>
      </div >
      
      <Button onClick={signIn}  >
        Sign in with Google  <FcGoogle size={"1em"} style={{marginLeft:"5px"}}/>
      </Button>  
     
      </div>
    </div>
  );
}
//
// 
export default Login;
