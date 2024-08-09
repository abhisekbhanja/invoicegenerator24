import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function Products() {
 const [data, setdata] = useState([])

 const get_products=async()=>{
   try {
    const api_data=await axios.get("https://api.escuelajs.co/api/v1/products")
    setdata(api_data.data)
    console.log(api_data.data)
   } catch (error) {
    
   }
   
 }

 useEffect(() => {
  get_products()
 }, [])
 

  return (
    <div className='container-fluid'>
      <div className="row">
       {
        data?.map((product)=>{
         return <div className="col-md-3">
          <div class="card">
            <img class="card-img-top" src={product.images[0]} alt="" />
            <div class="card-body">
              <h4 class="card-title">{product.title}</h4>
              <p class="card-text">Text</p>
            </div>
          </div>
        </div>
        })
       }
      </div>
    </div>
    
  )
}
