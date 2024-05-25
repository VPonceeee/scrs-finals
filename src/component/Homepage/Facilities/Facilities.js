import React from 'react'
import cardimg1 from '../../../img/slide1.png'
import cardimg2 from '../../../img/img1.png'
import cardimg3 from '../../../img/img2.png'

export default function About() {
  return (
    <>
      
      <div id='AboutMainDiv' className='container'>
        <h1>Our Facilities</h1>

        <div className="row row-cols-1 row-cols-md-3 g-4">
          <div className="col">
            <div id='CardDiv' className="card h-100">
              <img src={cardimg1} className="card-img-top" alt="..."/>
              <div className="card-body">
                <h5 className="card-title">SuCasa Resort</h5>
                <p className="card-text">The entrance to Su Casa Garden Resort exudes a charming and tranquil ambiance. The gate is adorned with lush greenery and vibrant yellow flowers, creating a welcoming and serene look. The pathway leads guests into the resort, hinting at the peaceful and relaxing environment that awaits inside</p>
              </div>

            </div>
          </div>
          <div className="col">
            <div id='CardDiv' className="card h-100">
              <img src={cardimg2} className="card-img-top" alt="..."/>
              <div className="card-body">
                <h5 className="card-title">Pavilliion</h5>
                <p className="card-text">The Pavilliion offers a covered open space with a very serene  look. The Pavillion has two swing chairs and three ceiling fans. It can also hold extra chairs if needed and can hold 100-150 person. It is usually used for birthday celebration and wedding reception events.</p>
              </div>

            </div>
          </div>
          <div className="col">
            <div id='CardDiv' className="card h-100">
              <img src={cardimg3} className="card-img-top" alt="..."/>
              <div className="card-body">
                <h5 className="card-title">Swimming Pool</h5>
                <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
              </div>

            </div>
          </div>
      </div>

      </div>



    </>



  )
}
