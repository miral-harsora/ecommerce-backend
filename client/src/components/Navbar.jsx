import React, { useEffect, useState, useLayoutEffect } from 'react';
import ShopSphere from '../assets/ShopSphere_logo.png'
import ShopSphere_initial from '../assets/ShopSphere_initial.png'
import { FaSearch, FaChevronDown, FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import { MdMenu, MdOutlineShoppingCart } from "react-icons/md";
import { IoMdHeartEmpty } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { getCart, getCategories, getCategorizedProducts, getWishlist, searchProd } from '../action';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import cartImg from "../assets/cart.png"
import { useRef } from 'react';
const Navbar = ({ setNavbarHeight }) => {
  const megaMenuData = {
    Men: {
      Topwear: ['mens-shirts'],
      Footwear: ['mens-shoes'],
      Watches: ['mens-watches']
    },
    Women: {
      Topwear: ['tops', 'womens-dresses'],
      Footwear: ['womens-shoes'],
      Accessories: ['womens-watches', 'womens-bags', 'womens-jewellery']
    },
    Electronics: {
      Devices: ['smartphones', 'laptops']
    },
    Home: {
      Decor: ['home-decoration', 'furniture'],
      Essentials: ['groceries']
    },
    Beauty: {
      PersonalCare: ['fragrances', 'skincare']
    }
  };
  const location = useLocation();
  const windowWidth = String(Math.floor(useRef(window.innerWidth).current) / 2) + "px";


  const cart = useSelector(state => state.cart)
  const wishlist = useSelector(state => state.wishlist)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState({ 1: false, 2: false, 3: false, 4: false, 5: false, 6: false });
  const toggleDropdown = (num) => setIsDropdownOpen({ ...isDropdownOpen, [num]: false });
  const toggleDropdownOpen = (num) => setIsDropdownOpen({ ...isDropdownOpen, [num]: true });
  const toggleDropdownSmall = (num) => setIsDropdownOpen({ ...isDropdownOpen, [num]: !isDropdownOpen[num] });
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const getFilteredCategories = (prefix) => cat.filter((category) => category.startsWith(prefix));
  const [cartNum, setCartNum] = useState(0)
  const [wlNum, setwlNum] = useState(0)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories());
    dispatch(getCart());
    dispatch(getWishlist());
  }, [dispatch]);
  useEffect(() => {
    setIsDropdownOpen({
      1: false, 2: false, 3: false, 4: false, 5: false, 6: false
    });
  }, [location]);
  const categories = useSelector(state => state.categories);
  const [cat, setCat] = useState([]);
  const navigate = useNavigate();
  const onCategory = (val, num) => {
    console.log("selected category " + val)
    toggleMenu()
    dispatch(getCategorizedProducts(val))
    navigate(`/category/${val}`);
    toggleDropdown(num)
  }
  const search = (e) => {
    console.log(e.target.value)
    dispatch(searchProd(e.target.value))
    navigate(`/${e.target.value}`)
  }
  // const gotoCart=()=>{
  //   dispatch(getCart())
  // }
  useEffect(() => {
    console.log("categories " + categories)
    setCat(categories);
  }, [categories]);
  useEffect(() => {
    console.log(cart);
    setCartNum(cart.reduce((acc, num) => {
      return (acc + num.quantity);
    }, 0))
  }, [cart]);
  useEffect(() => {
    setwlNum(wishlist.length)
  }, [wishlist]);
  const desktopNavbarRef = useRef(null);
  const mobileNavbarRef = useRef(null);
  useEffect(() => {
    const updateHeight = () => {
      const desktopHeight = desktopNavbarRef.current?.clientHeight || 0;
      const mobileHeight = mobileNavbarRef.current?.clientHeight || 0;
      const calculatedHeight = Math.max(desktopHeight, mobileHeight);
      setNavbarHeight(calculatedHeight);
    };

    window.addEventListener('resize', updateHeight);
    updateHeight(); // Initial height calculation

    return () => window.removeEventListener('resize', updateHeight);
  }, [categories, setNavbarHeight]);

  const renderMegaMenu = (title, dataKey, dropId) => (
    <div
      className="relative group"
      onMouseEnter={() => setIsDropdownOpen({ [dropId]: true })}
      onMouseLeave={() => setIsDropdownOpen({ [dropId]: false })}
    >
      <div className="flex items-center h-full">
        <button className="px-4 py-2 font-medium text-black hover:text-[#F7569B] transition">
          {title}
        </button>
      </div>
      {isDropdownOpen[dropId] && (
        <div className="absolute left-0 top-full min-w-[40rem] bg-white border-t border-gray-200 shadow-lg z-40 py-6 rounded">
          <div className="grid grid-cols-4 gap-8 px-8 text-sm text-gray-800">
            {Object.entries(megaMenuData[dataKey]).map(([heading, items]) => (
              <div key={heading}>
                <h4 className="font-bold text-black mb-3 items-center">{heading}</h4>
                <ul className="space-y-2">
                  {items.filter(item => categories.includes(item)).map(category => (
                    <li
                      key={category}
                      onClick={() => onCategory(category)}
                      className="hover:text-[#F7569B] cursor-pointer"
                    >
                      {category.replace(/mens-|womens-/, '').replace('-', ' ')}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const CategoryList = ({ keyword, val }) => {
    return (
      <ul className="space-y-2">
        {keyword.map((key) =>

          getFilteredCategories(key).map((cat) => (



            (


              <li
                key={cat}

                className="px-4 py-2 hover:bg-[#F7569B] hover:text-white rounded transition-all duration-300 cursor-pointer"
                onClick={() => onCategory(cat, val)}

              >
                {cat.replace("womens-", "").replace("mens-", "").replace("-", " ")}
              </li>
            )))
        )
        }
      </ul>
    )
  }
  const CategoryListSmall = ({ keyword, val }) => {
    return (
      <ul className="space-y-2">
        {keyword.map((key) =>

          getFilteredCategories(key).map((cat) => (



            (

              <Link to={`/category/${cat}`}>
                <li
                  key={cat}

                  className=" py-2  px-2 w-full hover:bg-[#F7569B] hover:text-white rounded transition-all duration-300 cursor-pointer"
                  onClick={() => onCategory(cat, val)}

                >
                  {cat.replace("womens-", "").replace("mens-", "").replace("-", " ")}
                </li></Link>
            )))
        )
        }
      </ul>
    )
  }
  return (
    <>
      {/* Desktop View */}
      <div ref={desktopNavbarRef} className="relative hidden min-xl:flex justify-between items-center shadow fixed top-0 z-50 w-full bg-white" data-testid="navbar">
        <div className='flex justify-start'>
          <Link to="/"> <img src={ShopSphere} width={120} /></Link>
          {/* <div
            className="relative group flex items-center mx-4"
            onMouseEnter={() => setIsDropdownOpen({ ...isDropdownOpen, [1]: true })}
            onMouseLeave={() => setIsDropdownOpen({ ...isDropdownOpen, [1]: false })}
          >
            <button className="bg-white text-black px-4 py-2 hover:text-[#F7569B] transition-all duration-300">
              Men
            </button>

            {isDropdownOpen[1] && (
              <div className="absolute left-0 top-[100%] w-48 bg-white text-black shadow-md rounded-b-lg z-10 py-4">
                
                <div  >

                  <CategoryList keyword={["mens"]} val={1} />
                </div>


              </div>
            )}
          </div>
          <div className="relative group flex items-center mx-4 " onMouseEnter={() => setIsDropdownOpen({ ...isDropdownOpen, [2]: true })}
            onMouseLeave={() => setIsDropdownOpen({ ...isDropdownOpen, [2]: false })}>
          
            <button className="bg-white text-black px-4 py-2 hover:text-[#F7569B] transition-all duration-300">

              Women
            </button>
            
            {isDropdownOpen[2] && (
              <div className="absolute left-0 top-[100%] w-48 bg-white text-black shadow-md rounded-b-lg z-10 py-4">

                <div >
                  <CategoryList keyword={["womens", "tops"]} val={2} />
                </div>


              </div>
            )}
          </div>
          <div className="relative group flex items-center mx-4"  onMouseEnter={() => setIsDropdownOpen({ ...isDropdownOpen, [3]: true })}
            onMouseLeave={() => setIsDropdownOpen({ ...isDropdownOpen, [3]: false })}>
           
            <button className="bg-white text-black px-4 py-2 hover:text-[#F7569B] transition-all duration-300">
              Beauty
            </button>
           
            {isDropdownOpen[3] && (
              <div className="absolute left-0 top-[100%] w-48 bg-white text-black shadow-md rounded-b-lg z-10 py-4">

                <div >
                  <CategoryList keyword={["beauty", "fragrances", "skin-care"]} val={3} />
                </div>
              </div>
            )}

          </div>
          <div className="relative group flex items-center mx-4"  onMouseEnter={() => setIsDropdownOpen({ ...isDropdownOpen, [4]: true })}
            onMouseLeave={() => setIsDropdownOpen({ ...isDropdownOpen, [4]: false })}>
          
            <button className="bg-white text-black px-4 py-2 hover:text-[#F7569B] transition-all duration-300">
              Accessories
            </button>
            {isDropdownOpen[4] && (
              <div className="absolute left-0 top-[100%] w-48 bg-white text-black shadow-md rounded-b-lg z-10 py-4">
              
                <div >
                  <CategoryList keyword={["kitchen-accessories", "mobile-accessories", "sports-accessories"]} val={4} />
                </div>
              </div>
            )}
          </div>
          <div className="relative group flex items-center mx-4 "  onMouseEnter={() => setIsDropdownOpen({ ...isDropdownOpen, [5]: true })}
            onMouseLeave={() => setIsDropdownOpen({ ...isDropdownOpen, [5]: false })}>
           
            <button className="bg-white text-black px-4 py-2 hover:text-[#F7569B] transition-all duration-300">
              Home Decor
            </button>
            {isDropdownOpen[5] && (
              <div className="absolute left-0 top-[100%] w-48 bg-white text-black shadow-md rounded-b-lg z-10 py-4">

                <div >
                  <CategoryList keyword={["furniture", "home-decoration"]} val={5} />
                </div>
              </div>
            )}
          </div>
          <div className="relative group flex items-center mx-4 "  onMouseEnter={() => setIsDropdownOpen({ ...isDropdownOpen, [6]: true })}
            onMouseLeave={() => setIsDropdownOpen({ ...isDropdownOpen, [6]: false })}>
          
            <button className="bg-white text-black px-4 py-2 hover:text-[#F7569B] transition-all duration-300">
              Electronics
            </button>
            {isDropdownOpen[6] && (
              <div className="absolute left-0 top-[100%] w-48 bg-white text-black shadow-md rounded-b-lg z-10 py-4">

                <div >
                  <CategoryList keyword={["smartphones", "tablets"]} val={6} />
                </div>
              </div>
            )}
          </div> */}
          {renderMegaMenu('Men', 'Men', 1)}
          {renderMegaMenu('Women', 'Women', 2)}
          {renderMegaMenu('Beauty', 'Beauty', 3)}
          {renderMegaMenu('Home', 'Home', 4)}
          {renderMegaMenu('Electronics', 'Electronics', 5)}
          {/* <div className='flex items-center justify-center'>
                        <div className='mx-4 bg-white text-black px-4 py-2  '>
                            Men
                        </div>
                        <div className='mx-4 bg-white text-black px-4 py-2  '>
                            Women
                        </div>
                        <div className='mx-4 bg-white text-black px-4 py-2  '>
                            Accessories
                        </div>
                        <div className='mx-4 bg-white text-black px-4 py-2  '>
                            Electronics
                        </div>
                    </div> */}
        </div>
        <div className='flex justify-center items-center'>
          <div className="flex justify-center items-center ms-6 relative">
            <input
              className="flex items-center justify-between w-[300px] bg-white rounded-xl  shadow pl-10 pr-4 py-2 text-black"
              placeholder="Search Product"
              onInput={search}
            />
            <div
              className="absolute inset-y-0 left-0 pl-3 
                    flex items-center 
                    pointer-events-none"
            >
              <FaSearch className="m-1" style={{ color: "#F7569B" }} />
            </div>
          </div>
        </div>
        <div className='flex justify-end items-center'>
          <Link to="/login"><p className='font-bold mx-4' data-testid="login">Login / SignUp</p></Link>
          <Link to="/cart"><div data-testid="cart" className={`w-4 h-4 bg-red-500 rounded-full border-4 border-red-500 absolute z-2 my-2 mx-8  flex items-center justify-center ${cartNum > 0 ? 'visible' : 'hidden'}`}><p className='text-xs text-white font-bold'>{cartNum}</p></div><MdOutlineShoppingCart className='mx-4' size={22} ></MdOutlineShoppingCart></Link>
          <Link to="/wishlist"><div data-testid="wishlist_link" className={`w-4 h-4 bg-red-500 rounded-full border-4 border-red-500 absolute z-2 my-2 mx-8  flex items-center justify-center ${wlNum > 0 ? 'visible' : 'hidden'}`}><p className='text-xs text-white font-bold'>{wlNum}</p></div><IoMdHeartEmpty className='mx-4' size={22} /></Link>
        </div>
      </div>
      {/* Mobile View */}
      <div ref={mobileNavbarRef} className='flex flex-col py-2  min-xl:hidden  w-full  shadow fixed top-0 absolute z-5 w-full bg-white h-auto' >
        <div className={`${isMenuOpen ? 'visible' : 'hidden'} fixed inset-0 flex bg-transparent absolute z-50`} onClick={toggleMenu}>
          <div className="bg-white rounded-lg shadow-lg w-[45%]" onClick={(e) => e.stopPropagation()} >

            <div className='flex flex-col'>

              {/* Header Banner */}
              <div className='flex justify-between items-center bg-[#F7A8C4] p-2'>
                <img src={cartImg} width={100} className='mx-2' />
                <p className='text-xs min-sm:text-base  p-2'>
                  Hurry up! Flat 5% OFF on your first Order<br />
                  <Link to="/login"><span className='text-red-500'> SIGN UP. LOGIN</span></Link>
                </p>
              </div>

              {/* Category List */}
              <div className='flex flex-col'>
                {[
                  { label: "Men", keywords: ["mens"] },
                  { label: "Women", keywords: ["womens", "tops"] },
                  { label: "Beauty", keywords: ["beauty", "fragrances", "skin-care"] },
                  { label: "Accessories", keywords: ["kitchen-accessories", "mobile-accessories", "sports-accessories"] },
                  { label: "Home Decor", keywords: ["furniture", "home-decoration"] },
                  { label: "Electronics", keywords: ["smartphones", "tablets"] },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-start mx-4"
                    onClick={() => toggleDropdownSmall(index)}
                  >
                    {/* Dropdown Button */}
                    <button className="bg-white text-black py-2 w-full">
                      <div className='flex items-center justify-between'>
                        <p>{item.label}</p>
                        <FaChevronRight
                          className={`mx-2 transform transition-transform ${isDropdownOpen[index] ? "rotate-90" : "rotate-0"
                            }`}
                        />
                      </div>
                    </button>

                    {/* Dropdown Menu */}
                    {isDropdownOpen[index] && (
                      <div className="overflow-hidden transition-all duration-300">
                        <div className="w-full bg-white text-black py-4">
                          <CategoryListSmall
                            keyword={item.keywords}
                            val={index}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>
        <div className='flex justify-between items-center shadow'>
          <div className='flex justify-start mx-2 items-center'>
            <MdMenu size={24} onClick={toggleMenu} />
            <Link to="/"><img src={ShopSphere_initial} width={40} className='p-2' /></Link>
          </div>
          <div className='flex justify-end items-center'>
            <Link to="/cart"><div className={`w-4 h-4 bg-red-500 rounded-full border-4 border-red-500 absolute z-2 my-2 mx-8  flex items-center justify-center  ${cartNum > 0 ? 'visible' : 'hidden'}`}><p className="text-xs text-white font-bold">{cartNum}</p></div><MdOutlineShoppingCart className="mx-4" size={24}  ></MdOutlineShoppingCart></Link>
            <Link to="/wishlist"><div className={`w-4 h-4 bg-red-500 rounded-full border-4 border-red-500 absolute z-2 my-2 mx-8  flex items-center justify-center  ${wlNum > 0 ? 'visible' : 'hidden'}`}><p className="text-xs text-white font-bold">{wlNum}</p></div><IoMdHeartEmpty className='mx-4' size={24} /></Link>
          </div>
        </div>
        <div className='mx-auto flex justify-center items-center w-full'>

          <div className=' my-4'>
            <div className="items-center relative w-full">
              <div className="flex-grow">
                <input
                  className={`flex items-center  max-w-[400px] bg-white rounded-xl  shadow pl-10 pr-4 py-2 text-black`}
                  style={{ width: windowWidth }}
                  placeholder="Search Product"
                  onInput={search}
                />
              </div>
              <div
                className="absolute inset-y-0 left-0 pl-3 
                    flex items-center 
                    pointer-events-none"
              >
                <FaSearch className="m-1" style={{ color: "#F7569B" }} />
              </div>
            </div>
          </div>
        </div>
      </div >
    </>
  );
};

export default Navbar;
