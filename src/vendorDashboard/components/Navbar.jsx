import React from 'react'

const Navbar = ({showLoginhandle,showRegisterhandle,showlogOut,logOuthandle}) => {
  console.log(showRegisterhandle);
  return ( 
    <div class="navbar">
        <div className="company">
           user dashboard
        </div> 
        <div className="userauth">
          {!showlogOut ? <>
            <span   onClick={showLoginhandle}>Login / 
          </span>
          <span  class="register" onClick={showRegisterhandle}> Register</span>
          </> : <span onClick={logOuthandle}>Logout</span>}
          
        </div>
    </div>
  )
}

export default Navbar
