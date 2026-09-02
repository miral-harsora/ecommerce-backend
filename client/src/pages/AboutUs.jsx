import React from 'react';
import { Link } from 'react-router-dom';
import team from "../assets/team2.png"
import { MdOutlineLocalShipping, MdOutlineContactSupport } from "react-icons/md";
import { FaRegCircleCheck } from 'react-icons/fa6';
import { RiSecurePaymentLine } from 'react-icons/ri'
const AboutUs = ({navbarHeight}) => {
  return (
    <>
      <div className='flex flex-col ' style={{paddingTop: 10}}>
        <div className='mx-4 text-gray-500'>
          <Link to="/"> Home</Link> / <span className='font-bold'>About Us</span>
        </div>
        <div className='w-[75%]  flex items-center justify-center mx-auto'>
          <img src={team} className='text-center' />
        </div>

        {/* Intro Section */}
        <div className="bg-[#F7A8C4]  text-center py-8 px-4 mt-4">
          <h2 className="text-xl font-semibold">
            At ShopSphere, we bring you a world of style, convenience, and quality across every category you love.
          </h2>
          <p className="mt-2">
            From fashion to technology, home essentials to beauty, we’ve got something for everyone.
          </p>
        </div>

        {/* Two Column Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-8 px-6 max-w-6xl mx-auto">
          <div>
            <h3 className="text-lg font-semibold">A Marketplace for All</h3>
            <p>
              Whether you’re shopping for the latest smartphones, laptops, or tablets, upgrading your home decor and furniture,
              or picking out the perfect fragrance or skincare product, ShopSphere has it all.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Curated for You</h3>
            <p>
              Our collections are carefully chosen to ensure premium quality, trendy designs, and unbeatable prices in categories
              like men’s & women’s fashion, watches, jewelry, sports accessories, and more.
            </p>
          </div>
        </div>

        {/* Quote Section */}
        <div className="bg-[#F7A8C4]  text-center py-8 px-6">
          <p className="text-lg font-semibold">
            "Whatever you need, we’ve got it! At ShopSphere, we believe in quality, affordability, and a seamless shopping experience."
          </p>
        </div>

        {/* Four Column Section */}
        <div className="grid grid-cols-1 md:grid-cols-2  gap-8 py-8 px-6 max-w-6xl mx-auto">
          <div>
            <h3 className="text-lg font-semibold">Effortless Shopping</h3>
            <p>
              With secure payments, fast delivery, and easy returns, we make your shopping experience smooth and worry-free.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Fashion & Beyond</h3>
            <p>
              From stylish tops and dresses to trendy sunglasses and footwear, we help you stay ahead in style while also catering to your tech and lifestyle needs.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Essentials for Everyday Life</h3>
            <p>
              Stock up on groceries, kitchen accessories, and home essentials that bring comfort and convenience to your space.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">For the Explorers & Enthusiasts</h3>
            <p>
              Love motorcycles, vehicles, or sports? We have a range of accessories and gear to fuel your passion.
            </p>
          </div>
        </div>
        <div className='flex justify-center bg-gray-100'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4 my-4 text-center '>
          <div className='flex flex-col items-center'>
            <MdOutlineLocalShipping size={48} />
            <p className='mt-1'>EASY EXCHANGE</p>
          </div>
          <div className='flex flex-col items-center'>
            <RiSecurePaymentLine size={48} />
            <p className='mt-1'>SECURE PAYMENTS</p>
          </div>
          <div className='flex flex-col items-center'>
            <FaRegCircleCheck size={42} />
            <p className='mt-1'>ASSURED QUALITY</p>

          </div>
          <div className='flex flex-col items-center'>
            <MdOutlineContactSupport size={42} />
            <p className='mt-1'>CUSTOMER SUPPORT</p>

          </div>
        </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;