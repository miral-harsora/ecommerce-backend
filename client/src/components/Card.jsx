import React from 'react';


const Card = () => {
   
    return (
        <div className="container mx-auto pt-8">
        <div className='grid grid-cols-4 gap-8'>
        {prod.products ? prod.products.slice(0,16).map((product)=>{
            return(
       <div className=' flex flex-col justify-center items-center p-4 shadow rounded-xl mb-4 border-1 border-black  font-semibold mx-4'>
        <div className='h-[85%] items-center'>
            <img src={product.thumbnail} alt={product.title} className='object-center'/>
            </div>
            <div className='h-[25%] text-center'>
            <p className='text-gray-400 text-sm text-center'>{product.category}</p>
            <p className='text-ellipsis line-clamp-3'>{product.title}</p>
            <p className='text-orange-300'>{product.price}</p>
            </div>
        </div>
        )}):<p>No Products Found!</p>}
    </div>
    </div>
    );
};

export default Card;