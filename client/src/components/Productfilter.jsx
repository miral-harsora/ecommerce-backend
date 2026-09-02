import { useState } from "react";
import RangeSlider from "./RangeSlider";
import DiscountFilter from "./DiscountFilter";

const Productfilter = ({ setPriceRange, setSelectedDiscount, setSelectedRating, setInStockOnly, setSelectedCategory, categories = [] }) => {
  const [localPrice, setLocalPrice] = useState([1, 14000]);
  const [localDiscount, setLocalDiscount] = useState("");
  const [localRating, setLocalRating] = useState(0);
  const [localStock, setLocalStock] = useState(false);
  const [localCategory, setLocalCategory] = useState("");
  const clear = () => {
    setLocalPrice([1, 14000]); setLocalDiscount(""); setLocalRating(0); setLocalStock(false); setLocalCategory("");
    setPriceRange([1, 14000]); setSelectedDiscount(""); setSelectedRating(0); setInStockOnly(false); setSelectedCategory("");
  };
  return <div className="rounded-2xl border border-sphere-line bg-white p-4 shadow-sm"><div className="flex items-center justify-between"><div><p className="text-xs font-bold tracking-[0.15em] text-sphere-plum">FILTERS</p><p className="mt-1 text-xs text-stone-500">Refine your search</p></div><button type="button" className="text-xs font-semibold text-sphere-rose hover:underline" onClick={clear}>CLEAR ALL</button></div><hr className="my-4 border-sphere-line" />
    <label className="mb-2 block text-xs font-bold tracking-[0.12em] text-sphere-plum" htmlFor="category-filter">CATEGORY</label><select id="category-filter" value={localCategory} onChange={(event) => { setLocalCategory(event.target.value); setSelectedCategory(event.target.value); }} className="w-full rounded-xl border border-sphere-line bg-white p-2 text-sm capitalize outline-none focus:border-sphere-rose"><option value="">All categories</option>{categories.map((category) => <option key={category} value={category}>{category.replaceAll("-", " ")}</option>)}</select><hr className="my-4 border-sphere-line" />
    <p className="text-xs font-bold tracking-[0.12em] text-sphere-plum">PRICE</p><RangeSlider value={localPrice} onChange={(value) => { setLocalPrice(value); setPriceRange(value); }} /><hr className="my-4 border-sphere-line" />
    <p className="text-xs font-bold tracking-[0.12em] text-sphere-plum">DISCOUNT</p><DiscountFilter value={localDiscount} onChange={(value) => { setLocalDiscount(value); setSelectedDiscount(value); }} /><hr className="my-4 border-sphere-line" />
    <p className="text-xs font-bold tracking-[0.12em] text-sphere-plum">CUSTOMER RATING</p><div className="mt-3 grid grid-cols-2 gap-2">{[4, 3, 2].map((rating) => <button key={rating} type="button" onClick={() => { const next = localRating === rating ? 0 : rating; setLocalRating(next); setSelectedRating(next); }} className={`rounded-lg border px-2 py-2 text-xs font-semibold transition ${localRating === rating ? "border-sphere-rose bg-[#f9eef0] text-sphere-rose" : "border-sphere-line text-stone-600 hover:border-sphere-rose"}`}>{rating}+ stars</button>)}</div><label className="mt-4 flex cursor-pointer items-center gap-2 text-sm text-stone-600"><input type="checkbox" checked={localStock} onChange={(event) => { setLocalStock(event.target.checked); setInStockOnly(event.target.checked); }} className="h-4 w-4 accent-[#b45061]" /> In stock only</label>
  </div>;
};

export default Productfilter;
