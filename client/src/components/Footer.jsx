import Brand from "./Brand";
import { IoCallOutline } from "react-icons/io5";
import { FaFacebookF, FaInstagram, FaTelegram, FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";

const footerLinkClass = "block w-fit py-1 text-stone-600 transition hover:text-sphere-rose hover:underline";

const Footer = () => (
  <footer className="border-t border-sphere-line bg-[#f7f0ec] py-12 px-6">
    <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 md:grid-cols-4">
      <div>
        <Link to="/" aria-label="ShopSphere home" className="mb-3 inline-block"><Brand /></Link>
        <p className="text-justify text-sm">At <strong>ShopSphere</strong>, we bring you quality products, secure transactions, and dedicated support for a seamless shopping experience.</p>
        <a href="tel:+0123456789" className="flex items-center mt-4 border border-sphere-line bg-white p-3 rounded-xl transition hover:border-sphere-rose" aria-label="Call ShopSphere support">
          <IoCallOutline size={24} className="mr-2" />
          <span><span className="block">Got Questions? Call us 24/7</span><span className="text-sphere-rose font-bold">+0123 456 789</span></span>
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
        <Link className={footerLinkClass} to="/profile">My Profile</Link><Link className={footerLinkClass} to="/cart">View Cart</Link>
        <Link className={footerLinkClass} to="/wishlist">My Wishlist</Link><Link className={footerLinkClass} to="/track-order">Track My Order</Link><Link className={footerLinkClass} to="/help">Help</Link>
      </nav>
    </div>
    <hr className="mx-auto my-8 max-w-7xl border-t border-sphere-line" />
    <div className="mx-auto flex max-w-7xl flex-col items-center justify-between text-sm text-stone-600 md:flex-row">
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
