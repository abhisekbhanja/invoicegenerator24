import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form"

export default function 
() {
    
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
      } = useForm()
     const [invoice_list, setinvoice_list] = useState([])
     const [total_price, settotal_price] = useState(0)

      const add_product=(data)=>{
        
        setinvoice_list([...invoice_list,data])
        reset()
        console.log("add");
      }

      const pdf = new jsPDF();
      const downloadpdf=()=>{
        autoTable(pdf, {theme:"plain", html: '#my-table' })
        pdf.text(`Invoice`, 10, 10);
        
        pdf.save("invoice.pdf");
        //console.log(pdf);
        console.log("pdf");
      }

      const remove_product=(i)=>{
        console.log("rm")
        setinvoice_list(invoice_list.filter((e)=>{
          return e!==i;
        
        }));
      }
    
      useEffect(() => {
        let r=0
        r=r+1
        let sum=invoice_list.reduce((acc,i)=>{return acc=acc+parseInt(i.price)*parseInt(i.quantity)},0)
         settotal_price(sum)
         //console.log(`render :${r}  ,${total_price}`);
      }, [invoice_list])
      

  return (
    <div className='container'>
        <div className="row">
            <div className="col-12 p-2">
               
               <div className='d-flex align-items-center justify-content-center'>
                
               <div className="card p-3">
               <h1 className='text-center pt-2'>Invoice Generator</h1>
               <form onSubmit={handleSubmit(add_product)}>
                    <div className="form-group">
                      <label>Item</label>
                      <input type="text"className="form-control"{...register("item", { required: true })}/>
                      <p className='text-danger'>{errors.item && <span>This field is required</span>}</p>
                    </div>
                    <div className="form-group">
                      <label>Quantity</label>
                      <input type="number"className="form-control" {...register("quantity", { required: true })}/>
                      <p className='text-danger'>{errors.quantity && <span>This field is required</span>}</p>
                    </div>
                    <div className="form-group">
                      <label>Price</label>
                      <input type="number"className="form-control" {...register("price", { required: true })}/>
                      <p className='text-danger'>{errors.price && <span>This field is required</span>}</p>
                    </div>
                    
                    <div className="form-group">
                      <button type='submit' className='btn btn-success'>add</button>
                    </div>
                </form>

                {invoice_list?.length!=0?   <div className="list_page">
                <h5>Item List</h5>
              
               <table id='my-table' className="table">
               <thead className="">
                 <tr>
                   <th>Item</th>
                   <th>Quantity</th>
                   <th>Price</th>
                 </tr>
               </thead>
               <tbody>
                 {invoice_list.map((product,index)=>{
                 return  <tr key={index}>
                   <td>{product.item}</td>
                   <td>{product.quantity}</td>
                   <td>{product.price}</td>
                   <td><button className='btn btn-sm btn-danger' onClick={()=>remove_product(product)}>remove</button></td>
                 </tr>
                 })}
                 <tr>
                   <td scope="row" colSpan="2"><span className='font-weight-bold'>Total Amount: {total_price}rs</span> </td>
                
                 </tr>
               </tbody>
              
              </table>
              
             <button className='btn btn-success' onClick={downloadpdf}>download pdf</button>
                </div>:" "}
                
               </div>

              
               
               </div>
               
            </div>
        </div>
    </div>
  )
}
