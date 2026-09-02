import React from "react";

const DiscountFilter = ({ value, onChange }) => {
  const discountOptions = [
    { label: "Less than 5%", value: "<5" },
    { label: "5% - 10%", value: "5-10" },
    { label: "10% - 15%", value: "10-15" },
    { label: "15% - 20%", value: "15-20" },
  ];

  return (
    <div className="p-4 w-64 mx-4">
      <div className="space-y-2">
        {discountOptions.map((discount) => (
          <label
            key={discount.value}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <input
              type="radio"
              name="discount"
              value={discount.value}
              checked={value === discount.value}
              onChange={(e) => onChange(e.target.value)}
              className="peer hidden" // Hides the default radio button
              aria-label={`Select discount ${discount.label}`}
             
            />
            <div
    className="
      w-4 h-4 peer-checked:bg-[#F7569B] peer-checked:rounded-full
       peer-checked:opacity-100
      transition-opacity duration-200
     absolute z-2 mx-1
    "
  />
<div
  className="relative 
    w-6 h-6 border-2 border-gray-400 rounded-full
    flex items-center justify-center
    peer-checked:border-[#F7569B]
  "
>

</div>
            <span className="text-gray-700 peer-checked:text-[#F7569B] font-medium text-sm">{discount.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default DiscountFilter;
