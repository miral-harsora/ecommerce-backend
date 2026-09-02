import React from 'react';
import img1 from '../assets/banner1.png';
import img2 from '../assets/banner2.jpg';
import Carousel from './CarouselComp';
const Banner = ({navbarHeight}) => {
  const arr=[{title:"Big Savings, Big Style! Shop Our Latest Collection Now!",img:img1},{title:"Hurry, Limited Time Offer! Up to 50% Off on Bestsellers!",img:img2}]
  
  return (
<div className='mx-auto w-full px-2 ' >
  <Carousel images={arr}/>
  </div>
    )
}

export default Banner;