import React, { useState } from 'react';
import { API_URL } from '../../data/Apipath';

const Addproduct = () => {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState([]);
  const [image, setImage] = useState(null);
  const [bestSeller, setBestSeller] = useState(false);
  const [description, setDescription] = useState("");

  const imageHandle = (event) => {
    const image = event.target.files[0];
    setImage(image);
  };

  const bestsellHandle = (event) => {
    const value = event.target.value === 'true';
    setBestSeller(value);
  };

  const categoryHandle = (event) => {
    const value = event.target.value;
    if (category.includes(value)) {
      setCategory(category.filter((item) => item !== value));
    } else {
      setCategory([...category, value]);
    }
  };

  const productHandle = async (e) => {
    e.preventDefault();
    try {
      const firmId = localStorage.getItem('firmIds');
      const logintoken = localStorage.getItem('logintoken');
      if (!logintoken || !firmId) {
        console.log("User not found");
        return;
      }
      const formData = new FormData();
      formData.append('productname', productName);
      formData.append('price', price);
      formData.append('description', description);
      formData.append('image', image);
      category.forEach((value) => {
        formData.append('category', value);
      });
      const response = await fetch(`${API_URL}/product/add-products/${firmId}`, {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${logintoken}`
        },
        body: formData
      });

      const data = await response.json();
      if (response.ok) {
        console.log(data);
        alert("Product added successfully");
        setProductName("");
        setPrice("");
        setDescription("");
        setCategory([]);
        setImage(null);
      } else {
        console.error("Failed to add product:", data);
      }
    } catch (error) {
      console.error("Failed to add product:", error);
    }
  };

  return (
    <div className="productsection">
      <form className="productform" onSubmit={productHandle}>
        <h2>Add Product</h2>
        <label>Product name</label>
        <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} placeholder='Enter your Firmname' />
        <label>Price</label>
        <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} placeholder='Enter your area' />
        <label>Category</label>
        <div className="prodcheck">
          <label>Veg</label>
          <input type="checkbox" checked={category.includes('veg')} onChange={categoryHandle} value="veg" placeholder='Enter your category' />
          <label>Nonveg</label>
          <input type="checkbox" checked={category.includes('non-veg')} onChange={categoryHandle} value="non-veg" placeholder='Enter your category' />
        </div>
        <label>Bestseller</label>
        <div className="prodcheck2">
          <label>Yes</label>
          <input type="checkbox" value="true" checked={bestSeller === true} onChange={bestsellHandle} placeholder='Enter your region' />
          <label>No</label>
          <input type="checkbox" value="false" checked={bestSeller === false} onChange={bestsellHandle} placeholder='Enter your category' />
        </div>
        <label>Description</label>
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Enter your description' />
        <label>Firm Image</label>
        <input type="file" onChange={imageHandle} />
        <br />
        <div className="subreg">
          <button type='submit'>Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Addproduct;
