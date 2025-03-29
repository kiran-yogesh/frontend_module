import React,{useState,useEffect} from 'react'
import { API_URL } from '../data/Apipath';


const Allproducts = () => {
    const [products,setProducts]=useState([]);
    const productHandle = async()=>{
        const firmId = localStorage.getItem('firmIds')
        try {
            const response = await fetch(`${API_URL}/product/${firmId}/products`);
            const productData = await response.json();
            setProducts(productData.products);
            console.log(productData);
        } catch (error) {
            console.log("Faile to fetch products",error);
            alert("failed to fetch products");
        }
    }
    useEffect(()=>{
        productHandle()
        console.log("this is useEffect");
    },[])

    const deleteProductid = async(productId)=>{
        try {
            const response = await fetch(`${API_URL}/product/${productId}`,{
                method:'DELETE'
            })
            setProducts(products.filter(product => product._id !== productId))
            confirm("are you sure to delete product")
            alert("product deleted")
        } catch (error) {
            console.log('failed to delete product');
            alert("failed to delete product");
        }
    }
  return (
    <div>
      { products.length === 0 ?(
        <p>no products added</p>
      ) : (<table className='table'>
           <thead>
            <tr>
                <th>Product name</th>
                <th>Price</th>
                <th>Image</th>
                <th>Delete</th>
            </tr>
           </thead>
           <tbody>
              {products.map((item)=>{
                return(
                    <>
                     <tr key={item._id}>
                         <td>{item.productname}</td>
                         <td>{item.price}</td>
                      <td>{item.image && (
                        <img src={`${API_URL}/uploads/${item.image}`} alt={item.productName}
                        style={{width:'50px' ,height:'50px'}}
                        />
                        )}
                     </td>
                     <td>
                        <button onClick={()=>deleteProductid(item._id)}>Delete</button>
                     </td>
                     </tr>
                    </>
                )
              })}
           </tbody>
      </table>)}
    </div>
  )
}

export default Allproducts
