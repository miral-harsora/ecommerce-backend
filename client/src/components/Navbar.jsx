import React, { useEffect, useState, useLayoutEffect } from 'react';
import Brand from './Brand'
import { FaSearch, FaChevronDown, FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import { MdMenu, MdOutlineShoppingCart } from "react-icons/md";
import { IoMdHeartEmpty } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { getCart, getCategories, getCategorizedProducts, getWishlist, searchProd } from '../action';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import cartImg from "../assets/cart.png"
import { getAuth } from "../helper/authStorage";
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
  const [auth, setAuth] = useState(() => getAuth());
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
    setIsMenuOpen(false)
    setIsDropdownOpen({})
    dispatch(getCategorizedProducts(val))
    navigate(`/category/${val}`);
    if (num !== undefined) toggleDropdown(num)
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
  useEffect(() => {
    const syncAuth = () => setAuth(getAuth());
    window.addEventListener("shopsphere-auth", syncAuth);
    return () => window.removeEventListener("shopsphere-auth", syncAuth);
  }, []);
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
    >
      <div className="flex items-center h-full">
        <button type="button" onClick={() => setIsDropdownOpen((current) => current[dropId] ? {} : { [dropId]: true })} className={`inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold transition ${isDropdownOpen[dropId] ? "bg-[#f7f0ec] text-sphere-rose" : "text-sphere-ink hover:bg-[#f7f0ec] hover:text-sphere-rose"}`}>
          {title}<FaChevronDown className={`text-[10px] transition-transform ${isDropdownOpen[dropId] ? "rotate-180" : ""}`} />
        </button>
      </div>
      {isDropdownOpen[dropId] && (
        <div className="absolute left-0 top-full z-40 min-w-[42rem] overflow-hidden rounded-b-2xl rounded-t-none border border-sphere-line bg-white shadow-[0_24px_55px_rgba(47,24,48,0.18)]">
          <div className="border-b border-sphere-line bg-[#fcfaf8] px-7 py-4"><p className="text-xs font-semibold tracking-[0.18em] text-sphere-rose">EXPLORE {title.toUpperCase()}</p></div>
          <div className="grid grid-cols-4 gap-3 p-5 text-sm text-stone-600">
            {Object.entries(megaMenuData[dataKey]).map(([heading, items]) => (
              <div key={heading} className="rounded-xl p-3">
                <button type="button" onClick={() => onCategory(items[0])} className="mb-3 inline-flex w-fit cursor-pointer items-center justify-center rounded-lg px-3 py-2 text-left text-xs font-bold tracking-[0.12em] text-sphere-plum transition hover:bg-[#f5ded7] hover:text-sphere-rose hover:shadow-sm">{heading.toUpperCase()}</button>
                <ul className="space-y-1.5">
                  {items.filter(item => categories.includes(item)).map(category => (
                    <li
                      key={category}
                      onClick={() => onCategory(category)}
                      className="block w-fit cursor-pointer rounded-lg px-3 py-2 text-left capitalize transition hover:bg-[#f5ded7] hover:text-sphere-plum hover:shadow-sm"
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

                className="px-4 py-2 hover:bg-sphere-plum hover:text-white rounded-xl transition-all duration-300 cursor-pointer"
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

                  className="block w-full cursor-pointer rounded-xl px-3 py-2 text-left capitalize transition-all duration-300 hover:bg-[#f5ded7] hover:text-sphere-plum"
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
      <div ref={desktopNavbarRef} className="sticky top-0 z-50 hidden min-xl:flex min-h-[76px] w-full justify-between items-center border-b border-sphere-line bg-white/95 px-5 shadow-sm backdrop-blur" data-testid="navbar">
        <div className='flex h-full items-center justify-start gap-7'>
          <Link to="/" aria-label="ShopSphere home" className="shrink-0"><Brand /></Link>
          {/* <div
            className="relative group flex items-center mx-4"
            onMouseEnter={() => setIsDropdownOpen({ ...isDropdownOpen, [1]: true })}
            onMouseLeave={() => setIsDropdownOpen({ ...isDropdownOpen, [1]: false })}
          >
            <button className="bg-white text-black px-4 py-2 hover:text-sphere-rose transition-all duration-300">
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
          
            <button className="bg-white text-black px-4 py-2 hover:text-sphere-rose transition-all duration-300">

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
           
            <button className="bg-white text-black px-4 py-2 hover:text-sphere-rose transition-all duration-300">
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
          
            <button className="bg-white text-black px-4 py-2 hover:text-sphere-rose transition-all duration-300">
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
           
            <button className="bg-white text-black px-4 py-2 hover:text-sphere-rose transition-all duration-300">
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
          
            <button className="bg-white text-black px-4 py-2 hover:text-sphere-rose transition-all duration-300">
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
              <FaSearch className="m-1 text-sphere-rose" />
            </div>
          </div>
        </div>
        <div className='flex justify-end items-center'>
          {auth?.user ? (
            <Link to="/profile" className='mx-3 rounded-xl px-3 py-2 text-sm font-semibold text-sphere-plum transition hover:bg-[#f7f0ec]'>My profile</Link>
          ) : (
            <Link to="/login"><p className='font-bold mx-4' data-testid="login">Login / SignUp</p></Link>
          )}
          <Link to="/cart"><div data-testid="cart" className={`w-4 h-4 bg-sphere-rose rounded-full border-4 border-sphere-rose absolute z-2 my-2 mx-8 flex items-center justify-center ${cartNum > 0 ? 'visible' : 'hidden'}`}><p className='text-xs text-white font-bold'>{cartNum}</p></div><MdOutlineShoppingCart className='mx-4 text-sphere-plum' size={22} /></Link>
          <Link to="/wishlist"><div data-testid="wishlist_link" className={`w-4 h-4 bg-sphere-rose rounded-full border-4 border-sphere-rose absolute z-2 my-2 mx-8 flex items-center justify-center ${wlNum > 0 ? 'visible' : 'hidden'}`}><p className='text-xs text-white font-bold'>{wlNum}</p></div><IoMdHeartEmpty className='mx-4 text-sphere-plum' size={22} /></Link>
        </div>
      </div>
      {/* Mobile View */}
      <div ref={mobileNavbarRef} className='sticky top-0 z-50 flex flex-col py-3 min-xl:hidden w-full border-b border-sphere-line bg-white shadow-sm h-auto' >
        <div className={`${isMenuOpen ? 'visible' : 'hidden'} fixed inset-0 z-50 flex bg-[#2f1830]/35 backdrop-blur-sm`} onClick={toggleMenu}>
          <div className="h-full w-[85%] max-w-sm overflow-y-auto bg-[#fcfaf8] shadow-2xl" onClick={(e) => e.stopPropagation()} >

            <div className='flex flex-col'>

              {/* Header Banner */}
              <div className='flex justify-between items-center bg-[#f5ded7] p-4'>
                <img src={cartImg} width={100} className='mx-2' />
                <p className='text-xs min-sm:text-base  p-2'>
                  {auth?.user ? <>Welcome back, {auth.user.name.split(" ")[0]}<br /><Link to="/profile"><span className='text-sphere-rose'>MY PROFILE</span></Link></> : <>Hurry up! Flat 5% OFF on your first Order<br /><Link to="/login"><span className='text-sphere-rose'>SIGN IN</span></Link></>}
                </p>
              </div>

              {/* Category List */}
              <div className='flex flex-col gap-1 p-3'>
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
                    className="flex flex-col items-start"
                    onClick={() => toggleDropdownSmall(index)}
                  >
                    {/* Dropdown Button */}
                    <button className={`w-full rounded-xl px-3 py-3 text-sphere-ink transition ${isDropdownOpen[index] ? "bg-white shadow-sm" : "hover:bg-white/70"}`}>
                      <div className='flex items-center justify-between'>
                        <p className='font-semibold'>{item.label}</p>
                        <FaChevronRight
                          className={`mx-2 transform transition-transform ${isDropdownOpen[index] ? "rotate-90" : "rotate-0"
                            }`}
                        />
                      </div>
                    </button>

                    {/* Dropdown Menu */}
                    {isDropdownOpen[index] && (
                      <div className="w-full overflow-hidden transition-all duration-300">
                        <div className="m-1 rounded-xl bg-white px-3 py-3 text-black shadow-sm">
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
        <div className='flex min-h-[48px] justify-between items-center'>
          <div className='flex justify-start mx-2 items-center'>
            <MdMenu className='text-sphere-plum' size={24} onClick={toggleMenu} />
            <Link to="/" aria-label="ShopSphere home"><Brand /></Link>
          </div>
          <div className='flex justify-end items-center'>
            <Link to="/cart"><div className={`w-4 h-4 bg-sphere-rose rounded-full border-4 border-sphere-rose absolute z-2 my-2 mx-8 flex items-center justify-center ${cartNum > 0 ? 'visible' : 'hidden'}`}><p className="text-xs text-white font-bold">{cartNum}</p></div><MdOutlineShoppingCart className="mx-4 text-sphere-plum" size={24} /></Link>
            <Link to="/wishlist"><div className={`w-4 h-4 bg-sphere-rose rounded-full border-4 border-sphere-rose absolute z-2 my-2 mx-8 flex items-center justify-center ${wlNum > 0 ? 'visible' : 'hidden'}`}><p className="text-xs text-white font-bold">{wlNum}</p></div><IoMdHeartEmpty className='mx-4 text-sphere-plum' size={24} /></Link>
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
                <FaSearch className="m-1 text-sphere-rose" />
              </div>
            </div>
          </div>
        </div>
      </div >
    </>
  );
};

export default Navbar;
