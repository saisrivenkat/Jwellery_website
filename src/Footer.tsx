
import { NavLink } from "react-router-dom";
function Footer() {
  
  return (
    <>
      {/* info section */}
      <section className="info_section layout_padding2">
        <div className="container">
          
          <div className="row info_main_row">
            <div className="col-md-6 col-lg-3">
              <div className="info_links">
                <h4>Menu</h4>
                <div className="info_links_menu">
                  <NavLink to="/"></NavLink>
                  <NavLink to="/about">About</NavLink>
                  <NavLink to="/products">Shop</NavLink>
                  <NavLink to="/blog">Blog</NavLink>
                </div>
              </div>
            </div>
            {/* <div className="col-md-6 col-lg-3">
              <div className="info_insta">
                <h4>Instagram</h4>
                <div className="insta_box">
                  <div className="img-box">
                    <img src={p1} alt="" />
                  </div>
                  <p>long established fact that a reader</p>
                </div>
                <div className="insta_box">
                  <div className="img-box">
                    <img src={p2} alt="" />
                  </div>
                  <p>long established fact that a reader</p>
                </div>
              </div>
            </div> */}
            <div className="col-md-6 col-lg-6">
              <div className="info_detail">
                <h4>About Us</h4>
                <p className="mb-0">
                We are a proud manufacturing unit focused on providing quality
                  employment to skilled workers and delivering exceptional
                  products. Starting alone from zero, I built this business with
                  customer encouragement and a commitment to maintaining a
                  superior quality standard of 92.5 instead of 91.6, ensuring
                  trust and satisfaction
                </p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <h4>Contact Us</h4>
              <div className="info_contact">
                <a href="">
                  <i className="fa fa-map-marker" aria-hidden="true" />
                  <span>Location</span>
                </a>
                <a href="">
                  <i className="fa fa-phone" aria-hidden="true" />
                  <span>Call +01 1234567890</span>
                </a>
                <a href="">
                  <i className="fa fa-envelope" />
                  <span>demo@gmail.com</span>
                </a>
              </div>
            </div>
          </div>
          <div className="row info_form_social_row">
            <div className="col-md-8 col-lg-9">
              {/* <div className="info_form">
                <form action="">
                  <input type="email" placeholder="Enter your email" />
                  <button>
                    <i className="fa fa-arrow-right" aria-hidden="true" />
                  </button>
                </form>
              </div> */}
            </div>
            <div className="col-md-4 col-lg-3">
              <div className="social_box">
                <a href="">
                  <i className="fa fa-facebook" aria-hidden="true" />
                </a>
                <a href="">
                  <i className="fa fa-twitter" aria-hidden="true" />
                </a>
                <a href="">
                  <i className="fa fa-linkedin" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* end info_section */}
      {/* footer section */}
      <footer className="footer_section">
        <div className="container">
          <p>
            © <span id="displayYear" /> All Rights Reserved By
            <a href="https://html.design/"> <b>Sai Pranav Jwellery's</b></a>
          </p>
        </div>
      </footer>
      {/* footer section */}
    </>
  );
}

export default Footer;
