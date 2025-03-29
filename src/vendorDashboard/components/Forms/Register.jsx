import React, {useState} from 'react'
import { API_URL } from '../../data/Apipath';

const Register = ({showLoginhandle}) => {
  const [username,setUsername]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [error,setError]=useState("");
  const [loading,setLoading]=useState(true);

  const submitHandle=async(e)=>{
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/vendor/register`,{
        method:"POST",
        headers:{
          'Content-type':'application/json'
        },
        body: JSON.stringify({username,email,password})
      })
      const data=await response.json();
      if(response.ok){
        console.log(data);
        setUsername("");
        setEmail("");
        setPassword("");
        alert("vendor register success");
        showLoginhandle();
      }
    } catch (error) {
      console.log("registraion failed",error);
        alert("registraion failed");
    }
  }
  return (
    <div className="registersection">
        <form class="regform" onSubmit={submitHandle}>
        <h2>Vendor Register</h2>
        <label>Username</label>
        <input type="text" name='username' value={username} onChange={(e)=> setUsername(e.target.value)} placeholder='Enter your username' /><br/>
        <label>Email</label>
        <input type="text" name='email' value={email} onChange={(e)=> setEmail(e.target.value)} placeholder='Enter your email' /><br/>
        <label>Password</label>
        <input type="password" name='password' value={password} onChange={(e)=> setPassword(e.target.value)} placeholder='Enter your password'/><br />
        <div className="sub">
            <button>Submit</button>
        </div>
        </form>
    </div>
  )
}

export default Register
