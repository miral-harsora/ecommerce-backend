import ShopSphere from "../assets/ShopSphere_logo.png";
import { IoCallOutline } from "react-icons/io5";
import { FaFacebookF, FaInstagram, FaTelegram, FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";

const footerLinkClass = "block w-fit py-0.5 hover:text-[#F7569B] hover:underline";

const Footer = () => (
  <footer className="bg-gray-100 py-8 px-6">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-16">
      <div>
        <Link to="/" aria-label="ShopSphere home"><img src={ShopSphere} alt="ShopSphere" width={100} className="mb-3" /></Link>
        <p className="text-justify text-sm">At <strong>ShopSphere</strong>, we bring you quality products, secure transactions, and dedicated support for a seamless shopping experience.</p>
        <a href="tel:+0123456789" className="flex items-center mt-4 border border-gray-300 p-2 rounded-lg hover:border-[#F7569B]" aria-label="Call ShopSphere support">
          <IoCallOutline size={24} className="mr-2" />
          <span><span className="block">Got Questions? Call us 24/7</span><span className="text-[#F7569B] font-bold">+0123 456 789</span></span>
        </a>
      </div>

      <nav aria-label="Useful links"><p className="font-bold mb-2">Useful Links</p>
        <Link className={footerLinkClass} to="/about">About</Link><Link className={footerLinkClass} to="/services">Our Services</Link>
        <Link className={footerLinkClass} to="/how-to-shop">How to Shop</Link><Link className={footerLinkClass} to="/faqs">FAQ</Link><Link className={footerLinkClass} to="/contact">Contact Us</Link>
      </nav>

      <nav aria-label="Customer service"><p className="font-bold mb-2">Customer Service</p>
        <Link className={footerLinkClass} to="/payment-methods">Payment Methods</Link><Link className={footerLinkClass} to="/money-back-guarantee">Money-back Guarantee</Link>
        <Link className={footerLinkClass} to="/returns">Returns</Link><Link className={footerLinkClass} to="/shipping">Shipping</Link>
        <Link className={footerLinkClass} to="/terms">Terms and Conditions</Link><Link className={footerLinkClass} to="/privacy">Privacy Policy</Link>
      </nav>

      <nav aria-label="My account"><p className="font-bold mb-2">My Account</p>
        <Link className={footerLinkClass} to="/login">Sign In</Link><Link className={footerLinkClass} to="/cart">View Cart</Link>
        <Link className={footerLinkClass} to="/wishlist">My Wishlist</Link><Link className={footerLinkClass} to="/track-order">Track My Order</Link><Link className={footerLinkClass} to="/help">Help</Link>
      </nav>
    </div>
    <hr className="my-6 border-t border-gray-300" />
    <div className="flex flex-col md:flex-row justify-between items-center text-sm">
      <p>&copy; {new Date().getFullYear()} ShopSphere. All rights reserved.</p>
      <div className="flex gap-4 mt-2 md:mt-0" aria-label="Social media">
        <a href="https://www.facebook.com/AlmaBetterOfficial" target="_blank" rel="noreferrer" aria-label="Facebook"><FaFacebookF size={20} /></a>
        <a href="https://x.com/AlmaBetter" target="_blank" rel="noreferrer" aria-label="X"><FaXTwitter size={20} /></a>
        <a href="https://www.instagram.com/almabetter/" target="_blank" rel="noreferrer" aria-label="Instagram"><FaInstagram size={20} /></a>
        <a href="https://t.me/almabetterofficial" target="_blank" rel="noreferrer" aria-label="Telegram"><FaTelegram size={20} /></a>
      </div>
    </div>
  </footer>
);

export default Footer;
