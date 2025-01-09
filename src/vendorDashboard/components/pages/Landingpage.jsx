import React,{useEffect, useState} from 'react';
import Navbar from '../Navbar'; // Updated path to match the correct location.
import Sidebar from '../Sidebar';
import Login from '../Forms/Login';
import Register from '../Forms/Register';
import Addfirm from '../Forms/Addfirm';
import Addproduct from '../Forms/Addproduct';
import Welcome from '../Welcome';
import Allproducts from '../Allproducts';
const Landingpage = () => {
  const [showLogin,setshowLogin]=useState(false);
  const [showRegister,setshowRegister]=useState(false);
  const [showFirm,setshowFirm]=useState(false);
  const [showProduct,setshowProduct]=useState(false);
  const [showWelcome,setshowWelcome]=useState(false);
  const [showallProducts,setshowallProducts]=useState(false);

  const [showlogOut,setshowlogOut]=useState(false)
  useEffect(()=>{
     const logintoken = localStorage.getItem('logintoken')
     if(logintoken){
      setshowlogOut(true)
     }
  },[])
  const logOuthandle=()=>{
    localStorage.removeItem('logintoken')
    localStorage.removeItem('firmIds')
    confirm("are you sure to logout")
    setshowlogOut(false)
    setshowLogin(true)
    setshowRegister(false)
    setshowFirm(false)
    setshowProduct(false)
    setshowWelcome(false) 
    setshowallProducts(false)
      
  }
  const showLoginhandle=()=>{
    setshowLogin(true)
    setshowRegister(false)
    setshowFirm(false)
    setshowProduct(false)
    setshowWelcome(false) 
    setshowallProducts(false)
    }
  const showRegisterhandle=()=>{
    setshowRegister(true)
    setshowLogin(false)
    setshowFirm(false)
    setshowProduct(false)
    setshowWelcome(false)
    setshowallProducts(false)
  }
  const showFirmhandle=()=>{
    if(showlogOut){
    setshowLogin(false)
    setshowRegister(false)
    setshowFirm(true)
    setshowProduct(false)
    setshowWelcome(false)
    setshowallProducts(false)
    }
    else{
      alert("please login");
      setshowLogin(true)
    }
  }
  const showProducthandle=()=>{
    if(showlogOut){
    setshowLogin(false)
    setshowRegister(false)
    setshowFirm(false)
    setshowProduct(true)
    setshowWelcome(false)
    setshowallProducts(false)
    }
    else{
      alert("please login")
      setshowLogin(true)
    }
  }
  const showWelcomehandle=()=>{
    setshowLogin(false)
    setshowRegister(false)
    setshowFirm(false)
    setshowProduct(false)
    setshowWelcome(true)
    setshowallProducts(false)
  }
  const showallProductshandle=()=>{
    if(showlogOut){
    setshowLogin(false)
    setshowRegister(false)
    setshowFirm(false)
    setshowProduct(false)
    setshowWelcome(false)
    setshowallProducts(true)
    }
    else{
      alert("please login")
      setshowLogin(true)
    }
  }


  return (
    <>
      <section>
        <Navbar showLoginhandle={showLoginhandle} showRegisterhandle={showRegisterhandle}
         showlogOut={showlogOut} logOuthandle={logOuthandle} />
        <div className="collectingsecton">
        <Sidebar showFirmhandle={showFirmhandle} showProducthandle={showProducthandle} 
         showallProductshandle={showallProductshandle} />
        {showLogin && <Login showWelcomehandle={showWelcomehandle}/>}
        {showRegister && <Register showLoginhandle={showLoginhandle}/>}
        {showFirm && <Addfirm />}
        {showProduct && <Addproduct />}
        {showWelcome && <Welcome />}
        {showallProducts && <Allproducts/>}
        </div>
        
      </section>
    </>
  );
};

export default Landingpage;
