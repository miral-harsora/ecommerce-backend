import React, { useEffect } from 'react';
import Banner from '../components/Banner';
import Products from '../components/Products';
import { MdOutlineLocalShipping, MdOutlineContactSupport } from "react-icons/md";
import { FaRegCircleCheck } from 'react-icons/fa6';
import { RiSecurePaymentLine } from 'react-icons/ri'
const Home = ({navbarHeight}) => {
    return (
        <>
        <Banner navbarHeight={navbarHeight }/>
        <div className='flex justify-center'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4 my-4 text-center '>
            
            {/* Easy Exchange */}
            <div className='flex items-center '>
                <MdOutlineLocalShipping size={40} className='text-pink-500' />
                <div className='ms-2 text-left'>
                    <p className='font-medium'>Easy Exchange</p>
                    <p className='text-gray-500 text-sm mt-1'>We make returns effortless</p>
                </div>
            </div>
    
            {/* Secure Payments */}
            <div className='flex items-center '>
                <RiSecurePaymentLine size={40} className='text-pink-500' />
                <div className='ms-2 text-left'>
                    <p className='font-medium'>Secure Payments</p>
                    <p className='text-gray-500 text-sm mt-1'>Your transactions are 100% safe.</p>
                </div>
            </div>
    
            {/* Assured Quality */}
            <div className='flex items-center '>
                <FaRegCircleCheck size={36} className='text-pink-500' />
                <div className='ms-2 text-left'>
                    <p className='font-medium'>Assured Quality</p>
                    <p className='text-gray-500 text-sm mt-1'>We meet the highest standards.</p>
                </div>
            </div>
    
            {/* Online Support */}
            <div className='flex items-center '>
                <MdOutlineContactSupport size={36} className='text-pink-500' />
                <div className='ms-2 text-left'>
                    <p className='font-medium'>Online Support</p>
                    <p className='text-gray-500 text-sm mt-1'>24/7 Dedicated Support</p>
                </div>
            </div>
        </div>
        </div>
        <Products />
    </>
    
    );
};

export default Home;