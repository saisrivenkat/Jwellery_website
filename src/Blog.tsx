import { useEffect } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import BlogSection from './BlogSection'

function Blog() {
  useEffect(()=>{
    window.scrollTo(0,0)
  },[])
  return (
    <div>
    <Navbar BackgroundclassName='header_section innerpage_header'/>
    <section className='layout_padding'>

      <BlogSection/>
    </section>
      <Footer/>
    </div>
  )
}

export default Blog
