import React from 'react'
import cardimg1 from '../../../img/slide1.png'
import cardimg2 from '../../../img/img1.png'
import cardimg3 from '../../../img/img2.png'

export default function About() {
  return (
    <>

      <div  id='AboutMainDiv' className='container'>
        <div className='col'>
          <h1>Our Facilities</h1>
        </div> 

        <div id='CardDiv'className='col p-3 card'>
          <div class="row g-0 position-relative">
            <div class="col-md-6 mb-md-0 p-md-4">
              <img src={cardimg1} class="w-100" alt="..."/>
            </div>
            <div class="col-md-6 p-4 ps-md-0">
              <h1 class="mt-0">SuCasa Resort</h1>
              <p id='AboutText'>The entrance to Su Casa Garden Resort exudes a charming and tranquil ambiance. The gate is adorned with lush greenery and vibrant yellow flowers, creating a welcoming and serene look. The pathway leads guests into the resort, hinting at the peaceful and relaxing environment that awaits inside</p>
            </div>
          </div>
        </div>

        <div id='CardDiv' className='col p-5 card'>
          <div class="row g-0 position-relative">
            <div class="col-md-6 p-4 ps-md-0">
              <h1 class="mt-0">Pavilliion</h1>
              <p id='AboutText'>The Pavilliion offers a covered open space with a very serene  look. The Pavillion has two swing chairs and three ceiling fans. It can also hold extra chairs if needed and can hold 100-150 person. It is usually used for birthday celebration and wedding reception events.</p>
            </div>
            <div class="col-md-6 mb-md-0 p-md-4">
              <img src={cardimg2} class="w-100" alt="..."/>
            </div>
          </div> 
        </div>

        <div id='CardDiv' className='col p-3 card'>
          <div class="row g-0 position-relative">
            <div class="col-md-6 mb-md-0 p-md-4">
              <img src={cardimg3} class="w-100" alt="..."/>
            </div>
            <div class="col-md-6 p-4 ps-md-0">
              <h1 class="mt-0">Swimming Pool</h1>
              <p id='AboutText'>Our Swimming Pool is a refreshing oasis perfect for hot days and relaxation. The pool area features a separate Kid's Pool, designed for our younger guests to splash and play safely, and an Adult Pool for those looking to unwind and enjoy some sun-kissed fun.</p>
            </div>
          </div>  
        </div>
      
      
      </div>



    </>



  )
}
