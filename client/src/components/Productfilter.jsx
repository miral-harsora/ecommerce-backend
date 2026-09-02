import React, { useState } from 'react';
import RangeSlider from './RangeSlider';
import DiscountFilter from './DiscountFilter';

const Filter = ({ setPriceRange, setSelectedDiscount }) => {
    const [localPrice, setLocalPrice] = useState([1, 14000]);
    const [localDiscount, setLocalDiscount] = useState("");

    const handleClearFilters = () => {
        setLocalPrice([1, 14000]);
        setLocalDiscount("");
        setPriceRange([1, 14000]); 
        setSelectedDiscount(""); 
    };

    return (
        <div className="p-4 border-r-gray-300  ">
            <div className="flex justify-between items-center">
                <p className="font-bold mx-2 text-xs">FILTERS</p>
                <p className="text-[#F7569B] mx-2 cursor-pointer text-xs " onClick={handleClearFilters}>
                    CLEAR ALL
                </p>
            </div>
            <hr className="my-2 w-full border-gray-300" />
            
            {/* Price Filter */}
            <div className="flex flex-col">
                <p className="font-bold mx-2 text-xs">PRICE</p>
                <RangeSlider value={localPrice} onChange={(value) => {
                    setLocalPrice(value);
                    setPriceRange(value);
                }}/>
                <hr className="my-2 w-full border-gray-300" />
            </div>

            {/* Discount Filter */}
            <div className="flex flex-col">
                <p className="font-bold mx-2 text-xs">DISCOUNT</p>
                <DiscountFilter value={localDiscount} onChange={(value) => {
                    setLocalDiscount(value);
                    setSelectedDiscount(value);
                }} />
                <hr className="my-2 w-full border-gray-300" />
            </div>
        </div>
    );
};

export default Filter;
