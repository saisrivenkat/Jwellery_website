import React from 'react'
import b1 from './images/b1.jpg'
import b2 from './images/b2.jpg'

function BlogSection() {
  return (
    <>
  {/* blog section */}
  <section className="blog_section ">
    <div className="container">
      <div className="heading_container">
        <h2>Latest From Blog</h2>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="box">
            <div className="img-box">
              <img src={b1} alt="" />
              <h4 className="blog_date">
                14 <br />
                July
              </h4>
            </div>
            <div className="detail-box">
              <h5>Molestiae ad reiciendis dignissimos</h5>
              <p>
                alteration in some form, by injected humour, or randomised words
                which don't look even slightly believable.
              </p>
              <a href="">Read More</a>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="box">
            <div className="img-box">
              <img src={b2} alt="" />
              <h4 className="blog_date">
                15 <br />
                July
              </h4>
            </div>
            <div className="detail-box">
              <h5>Dolores vel maiores voluptatem enim</h5>
              <p>
                alteration in some form, by injected humour, or randomised words
                which don't look even slightly believable.
              </p>
              <a href="">Read More</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* end blog section */}
</>

  )
}

export default BlogSection
