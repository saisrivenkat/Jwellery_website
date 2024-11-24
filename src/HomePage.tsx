import "./bootstrap.css";
import "./responsive.css";
import "./style.css";
import SLider from "./images/slider-bg.jpg";
import p1 from "./images/p1.png";
import p2 from "./images/p2.png";
import p3 from "./images/p3.png";
import p4 from "./images/p4.png";
import p5 from "./images/p5.png";
import p6 from "./images/p6.png";
import p7 from "./images/p7.png";
import p8 from "./images/p8.png";
import about from "./images/about-img.jpg";
import OfferSection from "./OfferSection";
import BlogSection from "./BlogSection";
import Testimonials from "./Testimonials";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
interface shopProps {
  showMorevisible?: boolean;
}

interface aboutProps {
  showMorevisible?: boolean;
}

function HomePage() {
  //const [visible,setvisible] = useState<boolean>(false)
  const navigate = useNavigate();
  const navigateToProducts = () => {
    navigate("/products");
  };
  return (
    <>
      <Navbar BackgroundclassName="header_section" />
      {/* slider section */}
      <section className="slider_section position-relative">
        <div className="slider_bg_box">
          <img src={SLider} alt="" />
        </div>
        <div className="slider_bg" />
        <div className="container">
          <div className="col-md-9 col-lg-8">
            <div className="detail-box">
              <h1>
                Best Jewellery
                <br /> Collection
              </h1>
              <p>
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
                The point of using Lorem
              </p>
              <div>
                <span onClick={navigateToProducts} className="slider-link">
                  Shop Now
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* end slider section */}
      <Shop showMorevisible={true} />
      <About showMorevisible={true} />
      <OfferSection />
      <BlogSection />
      <Testimonials />
      <Footer />
    </>
  );
}

export const Shop: React.FC<shopProps> = ({ showMorevisible }) => {
  const navigate = useNavigate();
  const productsNavigation = () => {
    navigate("/products");
  };
  return (
    <>
      {/* shop section */}
      <section className="shop_section layout_padding">
        <div className="container">
          <div className="heading_container heading_center">
            {!showMorevisible ? <h2>All Products</h2>:<h2>Latest Products</h2>}
            
          </div>
          <div className="row">
            <div className="col-sm-6 col-md-4 col-lg-3">
              <div className="box">
                <a href="">
                  <div className="img-box">
                    <img src={p1} alt="" />
                  </div>
                  <div className="detail-box">
                    <h6>Necklace</h6>
                    <h6>
                      Price
                      <span>$200</span>
                    </h6>
                  </div>
                  <div className="new">
                    <span>New</span>
                  </div>
                </a>
              </div>
            </div>
            <div className="col-sm-6 col-md-4 col-lg-3">
              <div className="box">
                <a href="">
                  <div className="img-box">
                    <img src={p2} alt="" />
                  </div>
                  <div className="detail-box">
                    <h6>Necklace</h6>
                    <h6>
                      Price
                      <span>$300</span>
                    </h6>
                  </div>
                  <div className="new">
                    <span>New</span>
                  </div>
                </a>
              </div>
            </div>
            <div className="col-sm-6 col-md-4 col-lg-3">
              <div className="box">
                <a href="">
                  <div className="img-box">
                    <img src={p3} alt="" />
                  </div>
                  <div className="detail-box">
                    <h6>Necklace</h6>
                    <h6>
                      Price
                      <span>$110</span>
                    </h6>
                  </div>
                  <div className="new">
                    <span>New</span>
                  </div>
                </a>
              </div>
            </div>
            <div className="col-sm-6 col-md-4 col-lg-3">
              <div className="box">
                <a href="">
                  <div className="img-box">
                    <img src={p4} alt="" />
                  </div>
                  <div className="detail-box">
                    <h6>Ring</h6>
                    <h6>
                      Price
                      <span>$45</span>
                    </h6>
                  </div>
                  <div className="new">
                    <span>New</span>
                  </div>
                </a>
              </div>
            </div>
            <div className="col-sm-6 col-md-4 col-lg-3">
              <div className="box">
                <a href="">
                  <div className="img-box">
                    <img src={p5} alt="" />
                  </div>
                  <div className="detail-box">
                    <h6>Ring</h6>
                    <h6>
                      Price
                      <span>$95</span>
                    </h6>
                  </div>
                  <div className="new">
                    <span>New</span>
                  </div>
                </a>
              </div>
            </div>
            <div className="col-sm-6 col-md-4 col-lg-3">
              <div className="box">
                <a href="">
                  <div className="img-box">
                    <img src={p6} alt="" />
                  </div>
                  <div className="detail-box">
                    <h6>Earrings</h6>
                    <h6>
                      Price
                      <span>$70</span>
                    </h6>
                  </div>
                  <div className="new">
                    <span>New</span>
                  </div>
                </a>
              </div>
            </div>
            <div className="col-sm-6 col-md-4 col-lg-3">
              <div className="box">
                <a href="">
                  <div className="img-box">
                    <img src={p7} alt="" />
                  </div>
                  <div className="detail-box">
                    <h6>Earrings</h6>
                    <h6>
                      Price
                      <span>$400</span>
                    </h6>
                  </div>
                  <div className="new">
                    <span>New</span>
                  </div>
                </a>
              </div>
            </div>
            <div className="col-sm-6 col-md-4 col-lg-3">
              <div className="box">
                <a href="">
                  <div className="img-box">
                    <img src={p8} alt="" />
                  </div>
                  <div className="detail-box">
                    <h6>Necklace</h6>
                    <h6>
                      Price
                      <span>$450</span>
                    </h6>
                  </div>
                  <div className="new">
                    <span>New</span>
                  </div>
                </a>
              </div>
            </div>
          </div>
          {showMorevisible && (
            <div className="btn-box">
              <span onClick={productsNavigation}>View All Products</span>
            </div>
          )}
        </div>
      </section>
      {/* end shop section */}
    </>
  );
};

export const About: React.FC<aboutProps> = ({ showMorevisible }) => {
  const navigate = useNavigate();
  const aboutNavigation = () => {
    navigate("/about");
  };
  return (
    <>
      {/* about section */}
      <section className="about_section  ">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="img-box">
                <img src={about} alt="" />
              </div>
            </div>
            <div className="col-md-6">
              <div className="detail-box">
                <div className="heading_container">
                  <h2>About Us</h2>
                </div>
                <p>
                  We are a proud manufacturing unit focused on providing quality
                  employment to skilled workers and delivering exceptional
                  products. Starting alone from zero, I built this business with
                  customer encouragement and a commitment to maintaining a
                  superior quality standard of 92.5 instead of 91.6, ensuring
                  trust and satisfaction<br/><br/>
                  {!showMorevisible && `We offer competitive prices thanks to
                  our in-house manufacturing and a unique advantage: customers
                  can review and suggest changes to the product just before the
                  final stage. Additionally, we welcome custom designs and
                  manufacture them to your specifications. Visit our website to
                  view our process and designs—we look forward to serving you!`}
                </p>
                {showMorevisible && (
                  <span onClick={aboutNavigation}>Read More</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* end about section */}
    </>
  );
};

export default HomePage;
