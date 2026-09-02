import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getSingleProduct } from "../action";

const RecentlyViewed = () => {
  const [items, setItems] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => { try { setItems(JSON.parse(localStorage.getItem("shopsphere-recently-viewed") || "[]")); } catch { setItems([]); } }, []);
  if (!items.length) return null;
  return <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6"><div className="mb-6 flex items-end justify-between"><div><p className="text-xs font-semibold tracking-[0.18em] text-[#b45061]">PICK UP WHERE YOU LEFT OFF</p><h2 className="mt-2 text-2xl font-semibold tracking-tight">Recently viewed</h2></div><Link to="/" className="text-sm font-semibold text-[#8e3446] hover:underline">Browse all</Link></div><div className="grid grid-cols-2 gap-4 sm:grid-cols-4">{items.slice(0, 4).map((item) => <Link key={item.id} to={`/products/${item.id}`} onClick={() => dispatch(getSingleProduct(item.id))} className="group rounded-2xl border border-stone-200 bg-white p-3 transition hover:-translate-y-1 hover:shadow-lg"><img src={item.thumbnail} alt={item.title} className="aspect-square w-full rounded-xl bg-stone-100 object-cover" /><p className="mt-3 truncate text-sm font-medium">{item.title}</p><p className="mt-1 text-sm font-semibold text-[#8e3446]">${item.price}</p></Link>)}</div></section>;
};

export default RecentlyViewed;
