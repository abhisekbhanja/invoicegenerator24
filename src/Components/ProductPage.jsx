import React from 'react'
import FilterPage from './FilterPage'
import Products from './Products'

export default function ProductPage() {
  return (
    <div className='container_fluid '>
      <h1 className='text-center p-3 '>Product Page</h1>
      <div className="product_section d-flex pg-info p-2">
        <FilterPage />
        <Products />
      </div>
    </div>
  )
}
