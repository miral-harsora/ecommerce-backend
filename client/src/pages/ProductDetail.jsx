import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { IoIosStar, IoIosStarHalf, IoIosStarOutline, IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { MdOutlineShoppingCart } from "react-icons/md"
import { addToCart, addToWishlist } from '../action';

const ProductDetail = ({navbarHeight}) => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const wl = useSelector(state => state.wishlist)
    const selectedProduct = useSelector(state => state.product)
    // Product routes normally store one object, while older state/tests may contain an array.
    const product = Array.isArray(selectedProduct) ? selectedProduct[0] : selectedProduct
    const [prod, setProd] = useState()
    const [selectedImg, setSelectedImg] = useState(null)
    const [quantity, setQuantity] = useState(1)
    const [added, setAdded] = useState("ADD TO CART")
    const [wishlisted, setWishlisted] = useState(false)
    useEffect(() => {
        console.log("Product detail "+JSON.stringify(product))
        setSelectedImg(product ? product.images[0] : null)
        setProd(product)
        checkWL(product ? product.id : null)
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    }, [product])
    const calPercentage = (len) => {
        const per = (Math.floor((len / (product ? product.reviews.length : 0)) * 100))
        let val
        if (per == 0) {
            val = "0"
        }
        else if (per > 0 && per < 20) {
            val = "16%"
        } else if (per >= 20 && per < 25) {
            val = "20%"
        } else if (per >= 25 && per < 33) {
            val = "25%"
        } else if (per >= 33 && per < 40) {
            val = "33%"
        } else if (per >= 40 && per < 50) {
            val = "40%"
        } else if (per >= 50 && per < 60) {
            val = "50%"
        } else if (per >= 60 && per < 66) {
            val = "60%"
        } else if (per >= 66 && per < 75) {
            val = "66%"
        } else if (per >= 75 && per < 80) {
            val = "75%"
        } else if (per >= 80 && per < 83) {
            val = "80%"
        } else if (per >= 83 && per < 100) {
            val = "83%"
        } else {
            val = "full"
        }
        console.log("val =" + val)
        return val
    }
    const Plus = () => {
        setQuantity(quantity => quantity + 1)
    }
    const minus = () => {
        if (quantity > 1) {
            setQuantity(quantity => quantity - 1)
        }
    }
    const addtocart = () => {
        if (added.includes("GO")) {
            console.log("clicked")
            navigate('/cart')
        } else {
            const cartProd = { ...prod, quantity }
            console.log("product added "+JSON.stringify(cartProd))
            dispatch(addToCart(cartProd))
            setAdded("GO TO CART ->")
        }
    }
    const addToWishList = () => {
        if (!checkWL(product.id)) {
            dispatch(addToWishlist(product))
        }
        setWishlisted(true)
    }

    const checkWL = (id) => {
        const check = wl?.find((e) => e.id == id)
        if (check) {
            setWishlisted(true)
        } else {
            setWishlisted(false)
        }
    }
    const widthClass4 = calPercentage(product ? product.reviews.filter((review) => review.rating == 4).length : 0);
    const widthClass1 = calPercentage(product ? product.reviews.filter((review) => review.rating == 1).length : 0);
    const widthClass2 = calPercentage(product ? product.reviews.filter((review) => review.rating == 2).length : 0);
    const widthClass3 = calPercentage(product ? product.reviews.filter((review) => review.rating == 3).length : 0);
    const widthClass5 = calPercentage(product ? product.reviews.filter((review) => review.rating == 5).length : 0);
    return (
        <div >
            {!product || product.length === 0 ? (
                <p>Loading...</p>
            ) : (
                <div className='my-2'>
                    <div className='mx-4'>
                        <Link to="/"> Home</Link> / {product.category} / <span className='font-bold'>{product.title}</span>
                    </div>
                    <div className='mx-4'>

                        <div className='flex flex-col md:flex-row lg:flex-row sm:flex-row  justify-start mt-4'>
                            {/* images */}
                            <div className=' flex  flex-col sm:hidden md:hidden lg:hidden'>

                                <img src={selectedImg} alt={product.title} className='border-[1px] border-gray-200 bg-gray-200 mx-2 h-[400px]' />
                                <div className='flex sm:flex-col md:flex-col lg:flex-col items-center mt-2'>
                                    {product.images.map((img) => (

                                        <img src={img} alt={product.title} width={75} className={`border-[1px]  p-2 mb-1 mx-2 bg-gray-200 ${img == selectedImg ? 'border-[#F7569B]' : 'border-gray-200'}`} onClick={() => setSelectedImg(img)} />
                                    ))}
                                    {/* <img src={product.thumbnail} alt={product.title} width={75} className='border-[1px] border-gray-200 p-2 my-1 mx-2 bg-gray-200'/> */}
                                </div>
                            </div>
                            <div className=' flex  hidden sm:flex md:flex lg:flex'>
                                <div className='flex sm:flex-col md:flex-col lg:flex-col items-center'>
                                    {product.images.map((img) => (

                                        <img src={img} alt={product.title} width={75} className={`border-[1px]  p-2 mb-1 mx-2 bg-gray-200 ${img == selectedImg ? 'border-[#F7569B]' : 'border-gray-200'}`} onClick={() => setSelectedImg(img)} />
                                    ))}
                                    {/* <img src={product.thumbnail} alt={product.title} width={75} className='border-[1px] border-gray-200 p-2 my-1 mx-2 bg-gray-200'/> */}
                                </div>
                                <img src={selectedImg} alt={product.title} className='border-[1px] border-gray-200 bg-gray-200 mx-2 h-[400px]' />
                            </div>
                            <div className='w-[50%] flex sm:ms-12 md:ms-12 lg:ms-12'>
                                <div className='flex  flex-col justify-start'>
                                    <p className='text-2xl font-bold'>{product.brand}</p>
                                    <p className='text-2xl text-gray-500' data-testid="title">{product.title}</p>

                                    <div className='flex    '>
                                        {(product.rating > 4 && product.rating < 5) ? (
                                            <div className='flex justify-center items-center '>
                                                <IoIosStar style={{ color: "#F2BC5A" }} />
                                                <IoIosStar style={{ color: "#F2BC5A" }} />
                                                <IoIosStar style={{ color: "#F2BC5A" }} />
                                                <IoIosStar style={{ color: "#F2BC5A" }} />
                                                <IoIosStarHalf style={{ color: "#F2BC5A" }} />
                                            </div>
                                        ) : (product.rating > 3 && product.rating < 4) ? (<div className='flex justify-center  items-center'>
                                            <IoIosStar style={{ color: "#F2BC5A" }} />
                                            <IoIosStar style={{ color: "#F2BC5A" }} />
                                            <IoIosStar style={{ color: "#F2BC5A" }} />
                                            <IoIosStarHalf style={{ color: "#F2BC5A" }} />
                                            <IoIosStarOutline style={{ color: "#F2BC5A" }} />
                                        </div>) : (product.rating > 2 && product.rating < 3) ? (<div className='flex justify-center  items-center '>
                                            <IoIosStar style={{ color: "#F2BC5A" }} />
                                            <IoIosStar style={{ color: "#F2BC5A" }} />
                                            <IoIosStarHalf style={{ color: "#F2BC5A" }} />
                                            <IoIosStarOutline style={{ color: "#F2BC5A" }} />
                                            <IoIosStarOutline style={{ color: "#F2BC5A" }} />
                                        </div>) : (product.rating > 1 && product.rating < 2) ? (<div className='flex justify-center  items-center '>
                                            <IoIosStar style={{ color: "#F2BC5A" }} />

                                            <IoIosStarHalf style={{ color: "#F2BC5A" }} />
                                            <IoIosStarOutline style={{ color: "#F2BC5A" }} />
                                            <IoIosStarOutline style={{ color: "#F2BC5A" }} />
                                            <IoIosStarOutline style={{ color: "#F2BC5A" }} />
                                        </div>) : (product.rating > 0 && product.rating < 1) ? (<div className='flex justify-center  items-center'>


                                            <IoIosStarHalf style={{ color: "#F2BC5A" }} />
                                            <IoIosStarOutline style={{ color: "#F2BC5A" }} />
                                            <IoIosStarOutline style={{ color: "#F2BC5A" }} />
                                            <IoIosStarOutline style={{ color: "#F2BC5A" }} />
                                            <IoIosStarOutline style={{ color: "#F2BC5A" }} />
                                        </div>) : (<div className='flex justify-center  items-center'>


                                            <IoIosStarOutline style={{ color: "#F2BC5A" }} />
                                            <IoIosStarOutline style={{ color: "#F2BC5A" }} />
                                            <IoIosStarOutline style={{ color: "#F2BC5A" }} />
                                            <IoIosStarOutline style={{ color: "#F2BC5A" }} />
                                            <IoIosStarOutline style={{ color: "#F2BC5A" }} />
                                        </div>)}
                                        <p className='mx-2'> ({product.reviews.length} reviews)</p>
                                    </div>
                                    <p className='text-2xl font-bold'>{product.price} <span className='text-green-300'>({product.discountPercentage}% OFF)</span></p>
                                    <div className="flex py-2">
                                        <p>Qty:</p>
                                        <div className='border-[1px] border-gray-300 flex mx-8'><button className='ms-1 me-8 text-gray-500' data-testid="minus" onClick={minus}>-</button><p data-testid="quantity" className='mx-2'>{quantity}</p><button className='ms-8 me-1 text-gray-500' data-testid="plus" onClick={Plus}>+</button></div>
                                    </div>
                                    <div className='flex my-4'>
                                        <button className='bg-[#F7569B] px-8 rounded text-white flex justify-center items-center font-bold ' data-testid="cart" onClick={addtocart}><MdOutlineShoppingCart className={`mx-2  ${added.includes("ADD") ? 'visible' : 'hidden'} `} /> {added}</button>
                                        <button className='border-[1px] border-gray-500 mx-4 p-2 rounded mx-2 px-8 rounded flex justify-center items-center font-bold' data-testid="wishlist" onClick={addToWishList}>{wishlisted ? (<><IoMdHeart className='mx-2' style={{ color: "red" }} /> WISHLISTED</>) : (<><IoMdHeartEmpty className='mx-2' /> WISHLIST</>)}</button>
                                    </div>
                                    <hr className='my-2 border-gray-300' />
                                    <p className='font-bold'>PRODUCT DETAILS </p>
                                    <p className='w-1/2 text-gray-500'>{product.description}</p>
                                    <p className='mt-2 font-bold'>Specifications</p>
                                    <div className='grid grid-cols-2 gap-4'>
                                        <div className='flex flex-col'>
                                            <p className='text-gray-500 text-sm mt-2'>SKU</p>
                                            <p className=''>{product.sku}</p>
                                            <hr className='mt-4 border-gray-300' />
                                        </div>
                                        <div className='flex flex-col mx-4'>
                                            <p className='text-gray-500 text-sm mt-2'>Weight</p>
                                            <p className=''>{product.weight}</p>
                                            <hr className='mt-4 border-gray-300' />
                                        </div>


                                        <div className='flex flex-col'>
                                            <p className='text-gray-500 text-sm mt-2'>Dimensions</p>
                                            <p className=''>W:{Math.floor(product.dimensions.width)} x H:{Math.floor(product.dimensions.height)} x D:{Math.floor(product.dimensions.depth)}</p>
                                            <hr className='mt-4 border-gray-300' />
                                        </div>
                                        <div className='flex flex-col mx-4'>
                                            <p className='text-gray-500 text-sm mt-2'>Warranty</p>
                                            <p className=''>{product.warrantyInformation}</p>
                                            <hr className='mt-4 border-gray-300' />
                                        </div>
                                        <div className='flex flex-col'>
                                            <p className='text-gray-500 text-sm mt-2'>Shipping Info</p>
                                            <p className=''>{product.shippingInformation}</p>
                                            <hr className='mt-4 border-gray-300' />
                                        </div>
                                        <div className='flex flex-col mx-4'>
                                            <p className='text-gray-500 text-sm mt-2'>Availability</p>
                                            <p className=''>{product.availabilityStatus}</p>
                                            <hr className='mt-4 border-gray-300' />
                                        </div>
                                        <div className='flex flex-col'>
                                            <p className='text-gray-500 text-sm mt-2'>Return Policy</p>
                                            <p className=''>{product.returnPolicy}</p>
                                        </div>
                                        <div className='flex flex-col mx-4'>
                                            <p className='text-gray-500 text-sm mt-2'>Minimum Order Quantity</p>
                                            <p className=''>{product.minimumOrderQuantity}</p>
                                        </div>
                                    </div>
                                    <hr className='my-2 border-gray-300' />
                                    <p className='font-bold'>RATINGS </p>
                                    <div className='grid grid-cols-2 gap-8 mt-4 divide-x-1 divide-solid divide-gray-200'>
                                        <div className='flex flex-col'>
                                            <div className='flex items-center'>
                                                <p className='text-3xl '>{product.rating}</p>
                                                <IoIosStar className='mx-2' size={22} style={{ color: "#F2BC5A" }} />
                                            </div>
                                            <p className='text-sm'>{product.reviews.length} Verified Buyers</p>

                                        </div>
                                        <div className='flex flex-col mx-4'>
                                            <div className='flex items-center'>
                                                <p className='text-sm'>5</p><IoIosStar size={10} style={{ color: "gray" }} /><div className=' mx-1 w-[120px] h-[5px] bg-gray-200'><div className={`h-full bg-green-500`} style={{ width: widthClass5 === "full" ? "100%" : widthClass5 }}>
                                                </div></div><p className='text-xs'>{product.reviews.filter((review) => review.rating == 5).length}</p>
                                            </div>
                                            <div className='flex items-center'>
                                                <p className='text-sm'>4</p><IoIosStar size={10} style={{ color: "gray" }} />
                                                <div className=' mx-1 w-[120px] h-[5px] bg-gray-200'>
                                                    <div className={`h-full bg-green-500`} style={{ width: widthClass4 === "full" ? "100%" : widthClass4 }}>
                                                    </div></div><p className='text-xs'>{product.reviews.filter((review) => review.rating == 4).length} </p>
                                            </div>
                                            <div className='flex items-center'>
                                                <p className='text-sm'>3</p><IoIosStar size={10} style={{ color: "gray" }} /><div className=' mx-1 w-[120px] h-[5px] bg-gray-200'><div className={`h-full bg-green-500`} style={{ width: widthClass3 === "full" ? "100%" : widthClass3 }}>
                                                </div></div><p className='text-xs'>{product.reviews.filter((review) => review.rating == 3).length}</p>
                                            </div>
                                            <div className='flex items-center'>
                                                <p className='text-sm'>2</p><IoIosStar size={10} style={{ color: "gray" }} /><div className=' mx-1 w-[120px] h-[5px] bg-gray-200'><div className={`h-full bg-green-500`} style={{ width: widthClass2 === "full" ? "100%" : widthClass2 }}>
                                                </div></div><p className='text-xs'>{product.reviews.filter((review) => review.rating == 2).length}</p>
                                            </div>
                                            <div className='flex items-center'>
                                                <p className='text-sm'>1</p><IoIosStar size={10} style={{ color: "gray" }} /><div className=' mx-1 w-[120px] h-[5px] bg-gray-200'><div className={`h-full bg-green-500`} style={{ width: widthClass1 === "full" ? "100%" : widthClass1 }}>
                                                </div></div><p className='text-xs'>{product.reviews.filter((review) => review.rating == 1).length}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <hr className='my-2 border-gray-300' />
                                    <p className='font-bold'>Reviews</p>
                                    {product.reviews.map((review) => (
                                        <div className='flex flex-col'>
                                            <div className='flex mt-4'>

                                                <div className='flex  justify-center items-center bg-red-400 h-[25%] px-1'> <p className='text-xs  text-white '>
                                                    {review.rating}</p>
                                                    <IoIosStar style={{ color: "white" }} size={10} />

                                                </div>
                                                <div className='flex flex-col'>

                                                    <p className='mx-4'>{review.comment}</p>
                                                    <p className='mx-4 text-gray-500 my-2'>{review.reviewerName} | {new Date(review.date).toLocaleDateString()}</p>

                                                </div>
                                            </div>
                                            <hr className='my-2 w-100 border-gray-300' />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>)}
        </div>
    );
};

export default ProductDetail;
