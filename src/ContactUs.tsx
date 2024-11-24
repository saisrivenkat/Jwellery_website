import Navbar from "./Navbar";
import Footer from "./Footer";

function ContactUs() {
  return (
    <div>
      <Navbar BackgroundclassName="header_section innerpage_header" />
      <section className="layout_padding" style={{
    display: "flex", 
    justifyContent: "center", 
    alignItems: "center", 
    minHeight: "100vh"
  }}>
        <div className="shadow p-3 mb-5 bg-white rounded" style={{ padding: "10px", maxWidth: "600px", width: "100%" }}>
          <h2 style={{ margin: "30px 0 " }}><center>Contact Us</center></h2>
          <form>
            <div className="form-group">
              <label htmlFor="formGroupExampleInput">Name</label>
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput"
                placeholder="eg:- Sai Pranav"
              />
            </div>
            <div className="form-group">
              <label htmlFor="formGroupExampleInput2">Email</label>
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput2"
                placeholder="eg:- saiPranav@gmail.com"
              />
            </div>
            <div>
                <label >Query</label>
                <textarea className="form-control"  id="comment" placeholder="Question"></textarea>
            </div>
            <div style={{margin:"10px 0"}}>
                <button  className="btn btn-primary">Submit</button>
            </div>
          </form>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default ContactUs;
