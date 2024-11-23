import React, { useEffect } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { Shop } from './HomePage'
const ProductsPage=()=> {
    useEffect(()=>{
        window.scrollTo(0,0)
      },[])
  return (
    <div>
      <Navbar BackgroundclassName='header_section innerpage_header'/>
      <section className='layout_padding'>
        <Shop showMorevisible={false}/>
      
      </section>
      <Footer/>
    </div>
  )
}

export default ProductsPage
