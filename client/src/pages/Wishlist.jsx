import React, { useEffect, useState } from 'react';
import { MdOutlineShoppingCart } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { IoMdCloseCircle } from 'react-icons/io'
import { addToCart, removeFromWL } from '../action';
const Wishlist = ({ navbarHeight }) => {
    const dispatch = useDispatch()
    const wishlist = useSelector(state => state.wishlist)
    const [wishlistItems, setWishlistItems] = useState([])
    const [move, setMove] = useState(false)
    const [remove, setRemove] = useState(false)
    const [showAlert, setShowAlert] = useState(false);
    useEffect(() => {
        setWishlistItems(wishlist)
    }, [wishlist])
    const addtocart = (val) => {
        const prod = { ...val, quantity: 1 }
        console.log(prod)
        dispatch(addToCart(prod))
        dispatch(removeFromWL(val.id))
        setMove(true)
    }
    const removeFromwl = (val) => {
        console.log(val)
        dispatch(removeFromWL(val))
        setRemove(true)
    }
    useEffect(() => {
        if (move || remove) {
            setShowAlert(true);
            const timer = setTimeout(() => {
                setShowAlert(false);
            }, 3000); // Hides alert after 3 seconds

            return () => clearTimeout(timer);
        }
    }, [move, remove]);
    return (
        <>
            <div className='h-screen' style={{ marginTop: `10px` }}>
                <div className=' flex mx-4 my-8 items-center text-gray-500 font-bold text-2xl'>
                    <p>My Wishlist</p>
                </div>
                {showAlert && (
                    <div
                        className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50"
                        role="alert"
                    >
                        <span className="font-medium">Success alert! </span>
                        {move
                            ? "Item has been successfully moved to cart."
                            : remove
                                ? "Item has been successfully removed."
                                : ""}
                    </div>)}
                <div>

                    {wishlistItems.length > 0 ?


                        <div className='flex w-full justify-center items-center'>

                            <div className='w-[80%] mx-4 mt-4'>
                                <div className='flex flex-col w-full'>
                                    <div className='hidden sm:flex md:flex lg:flex  text-gray-500 w-full'>
                                        <p className='w-[40%]'>Product</p>
                                        <p className='w-[20%]'>Price</p>
                                        <p className='w-[20%]'>Stock Status</p>
                                        <p className='w-[20%]'></p>

                                    </div>
                                    <hr className='my-2 border-gray-300' />
                                    {wishlistItems.map((item) => {
                                        return (
                                            <>
                                                <div className='flex text-gray-500 items-center min-sm:hidden '>
                                                    <div className='w-[50%] flex items-center'>
                                                        <img src={item.thumbnail} className='bg-gray-300' />
                                                    </div>

                                                    <div className='w-[50%] flex flex-col'>
                                                        <p className='mx-2' data-testid="title">{item.title}</p>
                                                        <p className='w-[20%] px-2'>${item.price}</p>
                                                        <p
                                                            className={` px-8 
            ${item.availabilityStatus.includes("In")
                                                                    ? 'text-green-400'
                                                                    : item.availabilityStatus.includes("Low")
                                                                        ? 'text-orange-400'
                                                                        : 'text-red-400'}`}
                                                        >
                                                            {item.availabilityStatus}
                                                        </p>

                                                       
                                                        <div className='mx-2'>
                                                            {item.availabilityStatus.includes("Out") ? (
                                                                <div className='text-gray-500 bg-gray-200 text-center'>
                                                                    OUT OF STOCK
                                                                </div>
                                                            ) : (
                                                                <div
                                                                    className='border-[1px] border-red-500 flex items-center justify-center p-1 me-2 cursor-pointer hover:bg-gray-300 rounded'
                                                                    onClick={() => addtocart(item)}
                                                                >
                                                                    <MdOutlineShoppingCart className='mx-2' /> ADD TO CART
                                                                </div>
                                                            )}
                                                        </div>

                                                    </div>

                                                    <div className='flex justify-end'>
                                                        <IoMdCloseCircle className='cursor-pointer' onClick={() => removeFromwl(item.id)} />
                                                    </div>

                                                </div>
                                                <div className="flex flex-col w-full min-sm:hidden ">

                                                    <hr className='my-2 border-gray-300' />
                                                </div>
                                                <div className='hidden sm:flex md:flex lg:flex flex-col w-full'>
                                                    <div className='flex text-gray-500 items-center'>
                                                        <div className='w-[40%] flex  items-center'>
                                                            <img src={item.thumbnail} width={50} className='bg-gray-300' />
                                                            <p className='mx-2' data-testid="title">{item.title}</p>
                                                        </div>
                                                        <p className='w-[20%] px-2'>${item.price}</p>
                                                        <p className={`w-[20%] px-8  ${item.availabilityStatus.includes("In") ? 'text-green-400' : item.availabilityStatus.includes("Low") ? 'text-orange-400' : 'text-red-400'}`}>{item.availabilityStatus}</p>
                                                        <p className='w-[20%] '>{item.availabilityStatus.includes("Out") ? (<p className='text-gray-500 bg-gray-200 text-center '>OUT OF STOCK</p>) : <p className='border-[1px] border-red-500 flex items-center justify-center p-1 me-2 cursor-pointer rounded hover:bg-gray-300' onClick={() => addtocart(item)}><MdOutlineShoppingCart className='mx-2' /><p className='hidden sm:block md:block lg:block'> ADD TO CART</p></p>} </p>
                                                        <IoMdCloseCircle className="cursor-pointer" onClick={() => removeFromwl(item.id)} />
                                                    </div>

                                                    <hr className='my-2 border-gray-300' />

                                                </div>
                                                {/* <div className="flex flex-col w-full">



                                                

                                            </div> */}

                                            </>
                                        )
                                    })}
                                </div>

                            </div>
                        </div>
                        : <div className='w-full h-screen flex flex-col justify-center items-center text-xl '><p className='w-1/2 sm:w-1/4 md:w-1/4 lg:w-1/4 text-center  text-gray-500'>Wishlist is Empty. Add items that you like to your wishlist. Review them anytime and easily move them to the cart.</p>
                            <img src="https://static.vecteezy.com/system/resources/previews/018/868/628/original/3d-rendering-wishlist-shopping-free-png.png" style={{ color: "#F7569B" }} className='m-4' width={200} />
                            <button className='border-[1px] border-red-500 text-red-500 rounded p-2'>CONTINUE SHOPPING</button>
                        </div>}
                </div>
            </div>
        </>
    );
};

export default Wishlist;