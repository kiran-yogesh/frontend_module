import React,{useState} from 'react'
import { API_URL } from '../../data/Apipath.js';

const Addfirm = () => {
  const [firmname,setFirmname]=useState("");
  const [area,setArea]=useState("");
  const [category,setCategory]=useState([]);
  const [region,setRegion]=useState([]);
  const [offer,setOffer]=useState("");
  const [file,setFile]=useState(null);

  const categoryHandle = (event)=>{
     const value = event.target.value;
    if(category.includes(value)){
      setCategory(category.filter((item)=> item!==value));
    }
    else{
      setCategory([...category,value]);
    }
  }

  const regionHandle = (event)=>{
    const value = event.target.value;
   if(region.includes(value)){
     setRegion(region.filter((item)=> item!==value));
   }
   else{
     setRegion([...region,value]);
   }
 }

 const imageHandle =(event)=>{
   const image = event.target.files[0];
   setFile(image);
 }

  const firmHandle=async(e)=>{
    e.preventDefault();
    try {
      const logintoken = localStorage.getItem('logintoken');
      if(!logintoken){
        console.log("user not found");
      }
      const formData = new FormData();
      formData.append('firmname',firmname);
      formData.append('area',area);
      formData.append('offer',offer);
      formData.append('image',file);
      category.forEach((value)=>{
        formData.append('category',value);
      })
      region.forEach((value)=>{
        formData.append('region',value);
      })

      const response = await fetch(`${API_URL}/firm/addfirm`,{
               method:"POST",
               headers:{
                 'token':`${logintoken}`
               },
               body: formData
             })

      const data = await response.json()
       if(response.ok){
         console.log(data)
         alert("firm added successfully")
         setFirmname("");
         setArea("");
         setOffer("");
         setCategory([]);
         setRegion([]);
         setFile(null);
       }
       console.log("the is firmId:",data.firmIds)
       const firmId = data.firmIds;
       localStorage.setItem('firmIds',firmId);

    } catch (error) {
      console.error("failed to add firm")
    }
  }

  return (
    <div className="firmsection">
        <form class="firmform" onSubmit={firmHandle}>
            <h2>Add Firm</h2>
            <label>Firm name</label>
            <input type="text" value={firmname} onChange={(e)=> setFirmname(e.target.value)} placeholder='Enter your Firmname' />
            <label>Area</label>
            <input type="text" value={area} onChange={(e)=> setArea(e.target.value)} placeholder='Enter your area' />
            <label>Category</label>
          <div className="checkinput">
            <label>Veg</label>
        <input type="checkbox" value="veg" checked={category.includes('veg')} onChange={categoryHandle}/>
        <label>Nonveg</label>
        <input type="checkbox" value="Non-veg" checked={category.includes('Non-veg')} onChange={categoryHandle}/>
        </div>
        <label>Region</label>
        <div className="checkreg">
        <label>South-Indian</label>
        <input type="radio" value="South-indian" checked={region.includes('South-indian')} onChange={regionHandle}/>
        <label>North-Indian</label>
        <input type="radio" value="North-indian" checked={region.includes('North-indian')} onChange={regionHandle}/>
        </div>
        <div className="checkreg2">
        <label>Chinese</label>
        <input type="radio" value="Chinese"  checked={region.includes('Chinese')} onChange={regionHandle}/>
        <label>Bakery</label>
        <input type="radio" value="Bakery"  checked={region.includes('Bakery')} onChange={regionHandle}/>
        </div>
        <label>Offer</label>
        <input type="text" value={offer} onChange={(e)=> setOffer(e.target.value)} placeholder='Enter your offer' />
        <label>Image</label>
        <input type="file" onChange={imageHandle}/>
        <br />
        <div className="subregs">
            <button type='submit'>Submit</button>
        </div>
        </form>
    </div>
  )
}

export default Addfirm
