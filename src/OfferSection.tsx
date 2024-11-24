
import { useNavigate } from 'react-router-dom'
import o1 from './images/o1.jpg'
import o2 from './images/o2.jpg'
import o3 from './images/o3.jpg'

function OfferSection() {

  const navigate = useNavigate()

  
  return (
    <>
  {/* offer section */}
  <section className="offer_section layout_padding">
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-7 px-0">
          <div className="box offer-box1">
            <img src={o1} alt="" />
            <div className="detail-box">
              <h2>Upto 15% Off</h2>
              <span onClick={()=>navigate('/products')}>Shop Now</span>
            </div>
          </div>
        </div>
        <div className="col-md-5 px-0">
          <div className="box offer-box2">
            <img src={o2} alt="" />
            <div className="detail-box">
              <h2>Upto 10% Off</h2>
              <span onClick={()=>navigate('/products')}>Shop Now</span>
            </div>
          </div>
          <div className="box offer-box3">
            <img src={o3} alt="" />
            <div className="detail-box">
              <h2>Upto 20% Off</h2>
              <span onClick={()=>navigate('/products')}>Shop Now</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* end offer section */}
</>

  )
}

export default OfferSection
