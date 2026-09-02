import { Link } from "react-router-dom";
import { FiArrowRight, FiCheck } from "react-icons/fi";
import heroImage from "../assets/shopsphere-hero-v2.png";

const Banner = () => (
  <section className="relative overflow-hidden bg-[#3b1d2b]" aria-label="ShopSphere seasonal collection">
    <img src={heroImage} alt="Curated accessories and fashion essentials" className="absolute inset-0 h-full w-full object-cover object-[72%_center]" />
    <div className="absolute inset-0 bg-gradient-to-r from-[#2c1421] via-[#3d1d2b]/85 to-transparent" />
    <div className="relative mx-auto flex min-h-[480px] max-w-7xl items-center px-6 py-16 sm:min-h-[560px] sm:px-10 lg:px-14">
      <div className="max-w-xl text-white">
        <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold tracking-[0.18em] backdrop-blur"><FiCheck /> NEW SEASON, NEW ENERGY</p>
        <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">Everyday finds,<br />beautifully curated.</h1>
        <p className="mt-6 max-w-md text-base leading-7 text-white/80 sm:text-lg">Discover thoughtful pieces for your home, wardrobe and every in-between moment — all in one considered collection.</p>
        <div className="mt-8 flex flex-wrap gap-3"><a href="#featured-products" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-[#3b1d2b] transition hover:-translate-y-0.5 hover:bg-[#fff4ee]">Shop now <FiArrowRight /></a><Link to="/about" className="rounded-full border border-white/40 px-6 py-3 font-semibold text-white transition hover:bg-white/10">Our story</Link></div>
        <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-sm text-white/80"><span>Free delivery over $50</span><span>30-day easy returns</span><span>Secure checkout</span></div>
      </div>
    </div>
  </section>
);

export default Banner;
