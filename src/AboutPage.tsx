import React, { useEffect } from "react";
import Navbar from "./Navbar";
import { About } from "./HomePage";
import Footer from "./Footer";
function AboutPage() {
  useEffect(()=>{
    window.scrollTo(0,0)
  },[])
  return (
    <div>
      <Navbar BackgroundclassName="header_section innerpage_header" />
      <section className="layout_padding">
        <About showMorevisible={false} />
      </section>
      <Footer />
    </div>
  );
}

export default AboutPage;
