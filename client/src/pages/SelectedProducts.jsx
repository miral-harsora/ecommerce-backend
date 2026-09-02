import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToWishlist, getCategorizedProducts, getProducts, getSingleProduct, searchProd } from '../action';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { IoIosStar, IoIosStarHalf, IoIosStarOutline, IoMdHeart, IoMdHeartEmpty } from "react-icons/io";

import { Link } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Productfilter from '../components/Productfilter';
import { FaChevronDown } from "react-icons/fa";
import { FaFilter } from "react-icons/fa";
import { motion } from 'framer-motion';
const SelectedProducts = ({navbarHeight}) => {
    const products = useSelector(state => state.filtered);
    const [priceRange, setPriceRange] = useState([1, 14000]);
    const [selectedDiscount, setSelectedDiscount] = useState("");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [isFilterVisible, setIsFilterVisible] = useState(true);
    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen)
    const dispatch = useDispatch();

    const [prod, setProd] = useState([]);
    const [currIndex, setCurrIndex] = useState(0);
    const [currPage, setCurrPage] = useState(0);
    const [imageErrors, setImageErrors] = useState({});
    const [onhover, setOnhover] = useState(false)
    const [currProd, setCurrProd] = useState(0)
    const [hoveredProduct, setHoveredProduct] = useState(null);
    const [carouselIndex, setCarouselIndex] = useState({});
    const wl = useSelector(state => state.wishlist)
    const [selected, setSelected] = useState("Customer Rating")
    const [filteredProducts, setFilteredProducts] = useState([]);
    // const [min,setMin]=useState(0)
    // const [max,setMax] = useState(14000)
    const onReadMore = (id) => {
        dispatch(getSingleProduct(id))
    }
    const handleHoverMain = (id) => {
        setOnhover(true);
        setCurrProd(id);
    }
    const handleLeaveMain = () => {
        setOnhover(false);
        setCurrProd(-1);
    }
    const handleHover = (id, imageCount) => {

        setHoveredProduct(id);

        // Reset to first image and ensure next image comes immediately
        setCarouselIndex((prev) => ({ ...prev, [id]: 0 }));

    };

    const handleLeave = (id) => {

        setHoveredProduct(null);
    };
    const addToWishList = (event, prod) => {
        event.preventDefault()
        event.stopPropagation()
        if (!checkWL(prod.id)) {
            dispatch(addToWishlist(prod))
        }
    }

    const checkWL = (id) => {
        return wl.some((item) => item.id === id);
    }
    
    useEffect(() => {
        if (!products || !products.length) return;

        const sortedProducts = [...products].sort((a, b) => b.rating - a.rating);
        setTimeout(() => {
            setProd(sortedProducts);
            setFilteredProducts(sortedProducts);
            console.log("Filtered Products: ", sortedProducts);
        }, 0); 

    }, [products]);
    useEffect(() => {
        console.log("filtered products length " + filteredProducts)
    }, [filteredProducts])
    const next = () => {
        if (currPage < Math.floor(filteredProducts.length / 16) - 1) {
            setCurrIndex(currIndex + 16);
            setCurrPage(currPage + 1);
        }
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    };

    const prev = () => {
        if (currPage > 0) {
            setCurrIndex(currIndex - 16);
            setCurrPage(currPage - 1);
        }
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    };

    const handleImageError = (index) => {
        setImageErrors((prev) => ({ ...prev, [index]: true }));
    };
    const sortBy = (val) => {
        console.log("clicked " + val)
        setSelected(val)
        if (val == "Price: High to Low") {
            filteredProducts.sort((a, b) => b.price - a.price)
        } else if (val == "Price: Low to High") {
            filteredProducts.sort((a, b) => a.price - b.price)
        }else if(val=="Customer Rating"){
            filteredProducts.sort((a, b) => b.rating - a.rating)
        }

    }
    const toggleFilterVisibility = () => {
        setIsFilterVisible(!isFilterVisible);
    };
    useEffect(() => {
        const filtered = prod.filter((product) => {
            console.log(priceRange)
            const inPriceRange = product.price >= priceRange[0] && product.price <= priceRange[1];

            const discountFilter =
                selectedDiscount === "" // Show all products if no discount is selected
                    ? true
                    : selectedDiscount === "<5"
                        ? product.discountPercentage < 5
                        : selectedDiscount === "5-10"
                            ? product.discountPercentage >= 5 && product.discountPercentage <= 10
                            : selectedDiscount === "10-15"
                                ? product.discountPercentage > 10 && product.discountPercentage <= 15
                                : selectedDiscount === "15-20"
                                    ? product.discountPercentage > 15 && product.discountPercentage <= 20
                                    : true;

            return inPriceRange && discountFilter;
        });
        setFilteredProducts(filtered);
    }, [priceRange, selectedDiscount]);
    const productCardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" }
        }
    };
    
    const hoverEffect = {
        scale: 1.05,
        boxShadow: "0 8px 15px rgba(0, 0, 0, 0.15)"
    };
    return (
        <div className="mx-auto" style={{paddingTop: `${navbarHeight}px`}}>
            <div className='flex flex-col md:flex-row'>

                {/* Filter Toggle Button for Small Devices */}
                <button
                    className="bg-black text-white py-2 px-4 rounded mb-4 md:hidden flex items-center"
                    onClick={toggleFilterVisibility}
                >
                    <FaFilter className="mr-2" /> {isFilterVisible ? 'Hide Filters' : 'Show Filters'}
                </button>

                {/* Filter Section */}
                <div className={`w-full md:w-[20%] 
                    p-4 ${isFilterVisible ? 'block' : 'hidden'} md:block`}>
                    <Productfilter
                        setPriceRange={setPriceRange}
                        setSelectedDiscount={setSelectedDiscount}
                    />
                </div>

                {/* Products Section */}
                <div className="w-full md:w-[80%] p-2">
                    <div className="container mx-auto ">
                        <div className='flex justify-end mb-2'>
                            <div className="relative group flex items-center mx-4 " onMouseEnter={toggleDropdown}  // Keep open when hovering
                                onMouseLeave={toggleDropdown} >
                                {/* Dropdown Button */}
                                <button

                                    className="bg-white text-black  px-4 py-2 border-[1px] border-gray-300 rounded"
                                >
                                    <div className='flex items-center justify-between'> Sort by {selected} <FaChevronDown
                                        className={`mx-2 transform transition-transform ${isDropdownOpen ? "rotate-180" : "rotate-0"}`}
                                    />
                                    </div>
                                </button>

                                {/* Dropdown Menu */}
                                {isDropdownOpen && (
                                    <div className={`absolute left-0 top-[100%] w-full bg-white text-black rounded border-[1px] border-gray-300 z-10 px-2`}>

                                        <div  >

                                            <ul className='mx-2'>
                                                <li className="hover:font-bold cursor-pointer" onClick={() => sortBy("Price: High to Low")}>Price: High to Low</li>
                                                <li className="hover:font-bold cursor-pointer" onClick={() => sortBy("Price: Low to High")}>Price: Low to High</li>
                                                <li className="hover:font-bold cursor-pointer" onClick={() => sortBy("Customer Rating")}>Customer Rating</li>
                                            </ul>
                                        </div>


                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {filteredProducts.length > 0 ? (
                                filteredProducts.slice(currIndex, currIndex + 16).map((product) => (
                                    <>
                                        <Link to={`/products/${product.id}`}>
                                            <motion.div key={product.id}
                                             variants={productCardVariants}
                                             initial="hidden"
                                             whileInView="visible"
                                             viewport={{ once: true, amount: 0.2 }}  // Animation triggers only when visible
                                             whileHover={hoverEffect}                // Hover effect
                                              className="relative flex flex-col justify-center shadow  mb-4 border-1 border-gray-300 font-semibold mx-4 min-h-[400px]"
                                                onClick={() => onReadMore(product.id)} onMouseOver={() => handleHoverMain(product.id)} onMouseLeave={handleLeaveMain} >


                                                <div className="flex flex-col h-[70%] ">
                                                    <div className={`absolute top-0 z-2 bg-[rgb(179, 16, 16)]  bg-white w-full h-full overflow-hidden 
                                                    ${onhover && currProd == product.id ? 'visible h-auto ' : 'hidden'}`}
                                                        onMouseOver={() => handleHover(product.id, product.images.length)}
                                                        onMouseLeave={handleLeave}
                                                    >
                                                        <Carousel
                                                            className=""
                                                            selectedItem={carouselIndex[product.id] || 0}
                                                            autoPlay={hoveredProduct === product.id}
                                                            interval={2000}
                                                            infiniteLoop
                                                            showArrows={false}
                                                            showThumbs={false}
                                                            showStatus={false}
                                                        >
                                                            {product.images.map((img, imgIndex) => (
                                                                <div key={imgIndex} className='flex justify-center items-center overflow-hidden'>
                                                                    <img src={img} alt="Slide" className="object-cover w-full h-auto aspect-[3/4]  bg-gray-300" />
                                                                </div>
                                                            ))}
                                                        </Carousel>
                                                        <div className=' w-full  flex flex-col items-center justify-end  text-center my-8'>
                                                            <button
                                                                className='flex items-center justify-center border-[1px] rounded w-[75%] mb-2 '
                                                                onClick={(e) => addToWishList(e, product)}
                                                            >
                                                                {checkWL(product.id) ? (
                                                                    <>
                                                                        <IoMdHeart className='mx-2' style={{ color: "red" }} /> WISHLISTED
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <IoMdHeartEmpty className='mx-2' /> WISHLIST
                                                                    </>
                                                                )}
                                                            </button>

                                                            <div>
                                                                <p className="font-bold text-sm text-ellipsis line-clamp-1">
                                                                    ${product.price}
                                                                    <span className='font-medium line-through mx-2'>
                                                                        ${((product.price * 100) / (100 - product.discountPercentage)).toFixed(2)}
                                                                    </span>
                                                                    <span className='text-pink-300 mx-2'>
                                                                        ({product.discountPercentage}% OFF)
                                                                    </span>
                                                                </p>
                                                            </div>

                                                            <div className='flex justify-center items-center mb-4'>
                                                                {product.rating >= 4.5 ? (
                                                                    <div className='flex'>
                                                                        <IoIosStar /><IoIosStar /><IoIosStar /><IoIosStar /><IoIosStarHalf />
                                                                    </div>
                                                                ) : product.rating >= 3.5 ? (
                                                                    <div className='flex'>
                                                                        <IoIosStar /><IoIosStar /><IoIosStar /><IoIosStarHalf /><IoIosStarOutline />
                                                                    </div>
                                                                ) : product.rating >= 2.5 ? (
                                                                    <div className='flex'>
                                                                        <IoIosStar /><IoIosStar /><IoIosStarHalf /><IoIosStarOutline /><IoIosStarOutline />
                                                                    </div>
                                                                ) : product.rating >= 1.5 ? (
                                                                    <div className='flex'>
                                                                        <IoIosStar /><IoIosStarHalf /><IoIosStarOutline /><IoIosStarOutline /><IoIosStarOutline />
                                                                    </div>
                                                                ) : (
                                                                    <div className='flex'>
                                                                        <IoIosStarOutline /><IoIosStarOutline /><IoIosStarOutline /><IoIosStarOutline /><IoIosStarOutline />
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>


                                                </div>
                                                <div className="h-[70%] items-center ">
                                                    <img
                                                        src={imageErrors[product.id] ? 'https://images.pexels.com/photos/159868/lost-cat-tree-sign-fun-159868.jpeg' : product.thumbnail}
                                                        alt={product.title}
                                                        className="object-cover w-full h-auto aspect-[3/4]  bg-gray-300"
                                                        onError={() => handleImageError(product.id)}
                                                       
                                                    />
                                                </div>
                                                <div className=" text-center mb-2 items-center my-4">
                                                    <p className="text-gray-400 text-sm">{product.category}</p>
                                                    <p className="text-ellipsis line-clamp-1 mx-1">{product.title}</p>
                                                    <p className="text-sm  font-bold">${product.price}<span className='font-medium line-through mx-2'>${((product.price * 100) / (100 - product.discountPercentage)).toFixed(2)}</span><span className='text-pink-300 mx-2'>({product.discountPercentage}% OFF)</span></p>
                                                    <div className='flex justify-center mb-4'>
                                                        {(product.rating > 4 && product.rating < 5) ? (
                                                            <div className='flex justify-center mb-4'>
                                                                <IoIosStar />
                                                                <IoIosStar />
                                                                <IoIosStar />
                                                                <IoIosStar />
                                                                <IoIosStarHalf />
                                                            </div>
                                                        ) : (product.rating > 3 && product.rating < 4) ? (<div className='flex justify-center mb-4'>
                                                            <IoIosStar />
                                                            <IoIosStar />
                                                            <IoIosStar />
                                                            <IoIosStarHalf />
                                                            <IoIosStarOutline />
                                                        </div>) : (product.rating > 2 && product.rating < 3) ? (<div className='flex justify-center mb-4'>
                                                            <IoIosStar />
                                                            <IoIosStar />
                                                            <IoIosStarHalf />
                                                            <IoIosStarOutline />
                                                            <IoIosStarOutline />
                                                        </div>) : (product.rating > 1 && product.rating < 2) ? (<div className='flex justify-center mb-4'>
                                                            <IoIosStar />

                                                            <IoIosStarHalf />
                                                            <IoIosStarOutline />
                                                            <IoIosStarOutline />
                                                            <IoIosStarOutline />
                                                        </div>) : (product.rating > 0 && product.rating < 1) ? (<div className='flex justify-center mb-4'>


                                                            <IoIosStarHalf />
                                                            <IoIosStarOutline />
                                                            <IoIosStarOutline />
                                                            <IoIosStarOutline />
                                                            <IoIosStarOutline />
                                                        </div>) : (<div className='flex justify-center mb-4'>


                                                            <IoIosStarOutline />
                                                            <IoIosStarOutline />
                                                            <IoIosStarOutline />
                                                            <IoIosStarOutline />
                                                            <IoIosStarOutline />
                                                        </div>)}
                                                        {/* <p>({product.reviews.length} reviews)</p> */}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        </Link>
                                    </>
                                ))) : <p>No Products Found!</p>}
                        </div>
                    </div>
                    <div className="flex justify-center items-center my-4">
                        <button className="py-2 px-4 border-[1px] border-gray-300 hover:border-black rounded mx-4" onClick={prev}>
                            <div className="flex items-center px-2"><MdKeyboardArrowLeft /> <p className="px-2 hidden sm:flex md:flex lg:flex">Previous</p></div>
                        </button>
                        <p className="mx-2">Page {currPage + 1} of {filteredProducts ? (Math.floor(filteredProducts.length / 16)) < 1 ? 1 : Math.floor(filteredProducts.length / 16) : 1}</p>
                        <button className="py-2 px-4 border-[1px] border-gray-300 hover:border-black rounded mx-4" onClick={next}>
                            <div className="flex items-center px-2"><p className="px-2 hidden sm:flex md:flex lg:flex">Next</p> <MdKeyboardArrowRight /></div>
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default SelectedProducts;
