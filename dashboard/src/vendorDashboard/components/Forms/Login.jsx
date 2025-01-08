import React, {useState} from 'react'
import { API_URL } from '../../data/Apipath';

const Login = ({showWelcomehandle}) => {
 const [email,setEmail]=useState("");
 const [password,setPassword]=useState("");
 const loginHandle=async(e)=>{
     e.preventDefault();
     try {
       const response = await fetch(`${API_URL}/vendor/login`,{
         method:"POST",
         headers:{
           'Content-type':'application/json'
         },
         body: JSON.stringify({email,password})
       })
       const data=await response.json();
       if(response.ok){
         console.log(data);
         setEmail("");
         setPassword("");
         alert("vendor login success");
         localStorage.setItem('logintoken',data.token)
         showWelcomehandle();
         
         
       }
       const vendorId = data.vendorId;
       console.log("checking for vendorId:",vendorId);
       const vendorResponse = await fetch(`${API_URL}/vendor/single-vendor/${vendorId}`)
       const vendorData=await vendorResponse.json();
       if(vendorResponse.ok){
        const vendorFirmid = vendorData.vendorFirmid;
        localStorage.setItem('firmIds',vendorFirmid);
        window.location.reload();
       }
     } catch (error) {
       console.log("login failed",error);
         alert("login failed");
     }
   }
  return (
    <div className="loginsection">
        
        
        <form class="logform" onSubmit={loginHandle}>
        <h2>Vendor login</h2>
        <label>Email</label>
        <input type="text" name='email' value={email} onChange={(e)=> setEmail(e.target.value)} placeholder='Enter your email' /><br/>
        <label>Password</label>
        <input type="password" name='password' value={password} onChange={(e)=> setPassword(e.target.value)} placeholder='Enter your password'/><br />
        <div className="sublog">
            <button type='submit'>Submit</button>
        </div>
        </form>
    </div>
  )
}

export default Login
