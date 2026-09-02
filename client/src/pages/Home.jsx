import Banner from "../components/Banner";
import Products from "../components/Products";
import Newsletter from "../components/Newsletter";
import RecentlyViewed from "../components/RecentlyViewed";
import { MdOutlineContactSupport, MdOutlineLocalShipping } from "react-icons/md";
import { FiRotateCcw, FiShield } from "react-icons/fi";

const promises = [[MdOutlineLocalShipping, "Free shipping", "On orders over $50"], [FiRotateCcw, "Easy returns", "30 days to decide"], [FiShield, "Secure payment", "Protected checkout"], [MdOutlineContactSupport, "Human support", "Here when you need us"]];

const Home = () => <><Banner /><section className="mx-auto grid max-w-7xl grid-cols-2 gap-3 px-4 py-6 sm:grid-cols-4 sm:px-6">{promises.map(([Icon, title, detail]) => <div key={title} className="flex items-center gap-3 rounded-2xl border border-stone-200 bg-white p-4"><Icon className="shrink-0 text-[#b45061]" size={25} /><div><p className="text-sm font-semibold">{title}</p><p className="mt-0.5 text-xs text-stone-500">{detail}</p></div></div>)}</section><section id="featured-products" className="scroll-mt-24 bg-[#fcfaf8] py-10"><Products /></section><RecentlyViewed /><Newsletter /></>;

export default Home;
