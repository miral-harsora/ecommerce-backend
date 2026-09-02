import React, { useEffect, useState } from 'react';
import ShopSphere from '../assets/ShopSphere_logo.png'
import cartImg from '../assets/cart.png'
import { GrSecure } from 'react-icons/gr';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { IoMdCloseCircle } from 'react-icons/io';
import { RiCoupon4Line } from 'react-icons/ri';
import { removeFromCart, updateCart } from '../action';

const Cart = () => {
    const [
        selectedValue,
        setSelectedValue,
    ] = useState("option1");
    const [finalTotal, setFinalTotal] = useState(0)
    const handleRadioChange = (event,
        value
    ) => {
        console.log("value " + event.target.value)
        setSelectedValue(event.target.value);
        if (event.target.value == "option2") {
            setFinalTotal(Number(getTotalPrice()) + 10)
        } else if (event.target.value == "option3") {
            setFinalTotal(Number(getTotalPrice()) + 20)
        } else if (event.target.value == "option1") {
            setFinalTotal(getTotalPrice())
        }
    };

    const styles = {
        container: {
            display: "flex",
            flex: 1,
            justifyContent: "start",
            alignItems: "center",
            width: "100%",
            marginLeft: "2px",
            marginRight: "2px"
        },
        heading: {
            color: "green",
            textAlign: "center",
        },
        radioGroup: {
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            justifyContent:
                "start",
            marginTop: "10px",
            width: "100%"
        },
        radioButton: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
        },
        radioLabel: {
            marginLeft: "8px",
            color: "#333",
            width: "100%",
            fontSize: "small"
        },
    };
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)
    const [cartItems, setCartItems] = useState([])
    const [quantity, setQuantity] = useState({})
    const [remove, setRemove] = useState(false)
    const [showAlert, setShowAlert] = useState(false);
    //console.log("cart " + JSON.stringify(cart))
    useEffect(() => {
        setCartItems(cart)
        // console.log("cartItems" + cartItems)
        const initialQuantities = cart.reduce((acc, item) => {
            acc[item.id] = item.quantity;
            return acc;
        }, {});
        setQuantity(initialQuantities);
    }, [cart])
    const removefromCart = (val) => {
        dispatch(removeFromCart(val))
        setRemove(true)
    }
    useEffect(() => {
        if (selectedValue == "option1") {
            setFinalTotal(getTotalPrice())
            console.log(finalTotal)
        }
    }, [])
    useEffect(() => {
        if (remove) {
            setShowAlert(true);
            const timer = setTimeout(() => {
                setShowAlert(false);
            }, 3000); // Hides alert after 3 seconds

            return () => clearTimeout(timer);
        }
    }, [remove]);
    const Plus = (id) => {
        setQuantity((prev) => ({
            ...prev,
            [id]: (prev[id] || 0) + 1
        }));
        const prod = cartItems.find(cart => cart.id == id)
        const quant = (cartItems.find(cart => cart.id == id).quantity + 1)
        const update = { ...prod, quantity: quant }
        console.log("plus cart " + JSON.stringify(cartItems.find(cart => cart.id == id)) + " " + (cartItems.find(cart => cart.id == id).quantity + 1) + " " + JSON.stringify(update))
        dispatch(updateCart(update))
    };

    const minus = (id) => {
        setQuantity((prev) => ({
            ...prev,
            [id]: Math.max((prev[id] || 0) - 1, 1)
        }));
        const prod = cartItems.find(cart => cart.id == id)
        const quant = (Math.max(cartItems.find(cart => cart.id == id).quantity - 1, 1))
        if (quant > 1) {
            const update = { ...prod, quantity: quant }
            console.log("minus cart " + JSON.stringify(cartItems.find(cart => cart.id == id)) + " " + (cartItems.find(cart => cart.id == id).quantity - 1) + " " + JSON.stringify(update))
            dispatch(updateCart(update))
        }
    };
    const getTotalPrice = () => {
        console.log(JSON.stringify(cartItems) + " " + quantity)
        const total = cartItems.reduce((sum, item) => {
            return (sum + item.price * (quantity[item.id] || 1))
        }, 0);
        return total.toFixed(2);
    };
    const final = () => {
        if (selectedValue == "option1") {
            return getTotalPrice()
        }
        else { return finalTotal.toFixed(2) }
    }
    return (
        <>
            <div className='flex justify-between items-center'>
                <div className='flex justify-start '>
                    <Link to="/">  <img src={ShopSphere} width={120} /></Link>
                </div>
                <div className='flex justify-center items-center text-gray-500 text-xs sm:text-sm md:text-base lg:text-base '>
                    <p className='mx-2 font-bold'>CART</p> / <p className='mx-2'>ADDRESS</p> / <p className='mx-2'>PAYMENT</p>
                </div>
                <div className='flex justify-end items-center mx-4'>
                    <GrSecure style={{ color: "green" }} size={24} /><p className='text-xs sm:text-sm md:text-base lg:text-base'>100% SECURE</p>
                </div>
            </div>
            {showAlert && (
                <div
                    className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50"
                    role="alert"
                >
                    <span className="font-medium">Success alert!</span>
                    {remove
                        ? " Item has been successfully removed."
                        : ""}
                </div>)}

            {cartItems.length > 0 ?


                <div className='flex flex-col sm:flex-row md:flex-row lg:flex-row   min-lg:mx-64'>
                    <div className='min-sm:w-[75%] mx-4 mt-4'>
                        <div className='flex flex-col'>
                            <div className=' flex justify-between items-center bg-[#F7569B80] py-4 px-2'>
                                <p className='flex justify-start'>Check delivery time and services</p>
                                <button className='flex justify-end border-[1px] border-red-500 rounded text-xs text-red-500 p-2'>ENTER PIN CODE</button>
                            </div>
                            <div className='hidden sm:flex md:flex lg:flex  text-gray-500 w-full'>
                                <p className='w-[40%]'>Product</p>
                                <p className='w-[20%]'>Price</p>
                                <p className='w-[20%]'>Quantity</p>
                                <p className='w-[20%]'>Total</p>
                            </div>
                            {cartItems.map((item) => {
                                return (
                                    <>
                                        <div className='hidden sm:flex md:flex lg:flex flex-col w-full'>
                                            <div className='flex text-gray-500 items-center'>
                                                <div className='w-[40%] flex  items-center'>
                                                    <img src={item.thumbnail} width={50} className='bg-gray-300' />
                                                    <p className='mx-2' data-testid="title">{item.title}</p>
                                                </div>
                                                <p className='w-[20%]'>${(item.price * quantity[item.id]).toFixed(2)}</p>
                                                <div className='w-[20%] '> <div className="w-3/4 border-[1px] border-gray-300 flex h-[30px] justify-center ">
                                                    <button className="ms-3 me-3 text-gray-500 cursor-pointer hover:font-bold" onClick={() => minus(item.id)}>-</button>
                                                    <p className="mx-2">{quantity[item.id] || 1}</p>
                                                    <button className="ms-3 me-3 text-gray-500 cursor-pointer  hover:font-bold" onClick={() => Plus(item.id)}>+</button>
                                                </div></div>
                                                <p className='w-[20%]'>${(item.price * quantity[item.id]).toFixed(2)}</p>
                                                <IoMdCloseCircle className="cursor-pointer" onClick={() => removefromCart(item.id)} />
                                            </div>

                                            <hr className='my-2 border-gray-300' />

                                        </div>
                                        <div className='flex text-gray-500 items-start min-sm:hidden mt-2'>
                                            <div className='w-[50%] flex items-center'>
                                                <img src={item.thumbnail} className='bg-gray-300' />

                                            </div>
                                            <div className='w-[50%] flex flex-col mt-2'>
                                                <p className='mx-2' data-testid="title">{item.title}</p>

                                                <p className='mx-2'>${item.price * quantity[item.id]}</p>
                                                <div className=' mx-2'> <div className="w-3/4 border-[1px] border-gray-300 flex h-[30px] justify-center ">
                                                    <button className="ms-3 me-3 text-gray-500 cursor-pointer hover:font-bold" onClick={() => minus(item.id)}>-</button>
                                                    <p className="mx-2">{quantity[item.id] || 1}</p>
                                                    <button className="ms-3 me-3 text-gray-500 cursor-pointer hover:font-bold" onClick={() => Plus(item.id)}>+</button>
                                                </div></div>
                                                <p className='mx-2'>${item.price * quantity[item.id]}</p>
                                            </div>
                                            <div className=' mt-2'>
                                                <IoMdCloseCircle className="cursor-pointer" onClick={() => removefromCart(item.id)} />
                                            </div>


                                            <hr className='my-2 border-gray-300' />
                                        </div>
                                    </>
                                )
                            })}
                        </div>

                    </div>
                    <div className='min-sm:w-[25%] mx-2 mt-4  p-2'>
                        <div className='flex flex-col'>
                            <p className='font-bold text-sm'>COUPONS</p>
                            <div className='flex justify-between items-center '>
                                <div className='flex items-center'>
                                    <RiCoupon4Line />

                                    <p className='mx-2'>Apply Coupons</p>

                                </div>
                                <button className='border-[1px] border-red-500 text-red-500 text-xs p-2 rounded'>APPLY NOW</button>
                            </div>
                            <p className='mx-6'><Link to="/login" className='text-red-500'>Login</Link> to get upto 5% OFF on first order</p>
                            <hr className='border-gray-200 my-2 ' />
                            <p className='font-bold text-sm'>Cart Total</p>
                            <hr className='border-gray-200 my-2 ' />
                            <div className='flex justify-between items-center'>
                                <p>Subtotal:</p>
                                <p className='text-red-500'>${getTotalPrice()}</p>
                            </div>
                            <hr className='border-gray-200 my-2 ' />
                            <p>Shipping:</p>
                            <div
                                style={styles.container}
                            >
                                <div
                                    style={
                                        styles.radioGroup
                                    }
                                >
                                    <div
                                        style={
                                            styles.radioButton
                                        }
                                    >
                                        <input
                                            type="radio"
                                            id="option1"
                                            value="option1"
                                            checked={
                                                selectedValue ===
                                                "option1"
                                            }
                                            onChange={(e) =>
                                                handleRadioChange(e,
                                                    "option1"
                                                )
                                            }
                                        />
                                        <label
                                            htmlFor="option1"
                                            style={
                                                styles.radioLabel
                                            }
                                        >
                                            <div className='flex justify-between items-center w-84 min-sm:w-55 pe-4'><p >Free Shipping</p><p>0.00</p></div>
                                        </label>
                                    </div>

                                    <div
                                        style={
                                            styles.radioButton
                                        }
                                    >
                                        <input
                                            type="radio"
                                            id="option2"
                                            value="option2"
                                            checked={
                                                selectedValue ===
                                                "option2"
                                            }
                                            onChange={(e) =>
                                                handleRadioChange(e,
                                                    "option2"
                                                )
                                            }
                                        />
                                        <label
                                            htmlFor="option2"
                                            style={
                                                styles.radioLabel
                                            }
                                        >
                                            <div className='flex justify-between items-center w-84 min-sm:w-55 pe-4'><p className='me-2'>Standard</p><p>10.00</p></div>
                                        </label>
                                    </div>

                                    <div
                                        style={
                                            styles.radioButton
                                        }
                                    >
                                        <input
                                            type="radio"
                                            id="option3"
                                            value="option3"
                                            checked={
                                                selectedValue ===
                                                "option3"
                                            }
                                            onChange={(e) =>
                                                handleRadioChange(e,
                                                    "option3"
                                                )
                                            }
                                        />
                                        <label
                                            htmlFor="option3"
                                            style={
                                                styles.radioLabel
                                            }
                                        >
                                            <div className='flex justify-between items-center w-84 min-sm:w-55 pe-4'><p className='me-2'>Express</p><p>20.00</p></div>

                                        </label>
                                    </div>
                                </div>
                            </div>
                            <hr className='border-gray-200 my-2 ' />
                            <div className='flex justify-between items-center text-red-500'>
                                <p>Total:</p>
                                <p className='text-red-500'>${final()}</p>
                            </div>
                            <button className='bg-[#F7569B] p-2 text-white font-bold text-sm mt-2 rounded'>PROCEED TO CHECKOUT</button>
                        </div>
                        <button className='border-[1px] border-[#F7569B] p-2 text-[#F7569B] rounded font-bold text-sm mt-2 w-full'>CONTINUE SHOPPING</button>
                    </div>
                </div>
                : <div className='w-full h-screen flex flex-col justify-center items-center'><img width={200} src={cartImg}></img><p>Cart is Empty. Lets add some items.</p></div>}


        </>
    );
};

export default Cart;