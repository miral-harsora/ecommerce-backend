import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiBell, FiHeart, FiLogOut, FiMail, FiShield, FiShoppingBag } from "react-icons/fi";
import { clearAuth, getAuth } from "../helper/authStorage";

const PREFERENCES_KEY = "shopsphere-profile-preferences";
const defaults = { orderUpdates: true, offers: false, emailUpdates: true, privateProfile: true };

const Profile = () => {
  const [auth] = useState(() => getAuth());
  const [preferences, setPreferences] = useState(defaults);
  const navigate = useNavigate();
  useEffect(() => {
    if (!auth?.user) { navigate("/login", { replace: true }); return; }
    try { setPreferences({ ...defaults, ...JSON.parse(localStorage.getItem(PREFERENCES_KEY) || "{}") }); } catch { setPreferences(defaults); }
  }, [auth, navigate]);
  const toggle = (key) => setPreferences((current) => {
    const next = { ...current, [key]: !current[key] };
    localStorage.setItem(PREFERENCES_KEY, JSON.stringify(next));
    return next;
  });
  const signOut = () => { clearAuth(); navigate("/", { replace: true }); };
  if (!auth?.user) return null;
  const settings = [["orderUpdates", "Order updates", "Get delivery and order-status alerts", FiShoppingBag], ["offers", "Offers & new arrivals", "Receive curated deals and collection notes", FiBell], ["emailUpdates", "Email updates", "Stay informed about account activity", FiMail], ["privateProfile", "Private profile", "Keep account details visible only to you", FiShield]];
  return <main className="min-h-[75vh] bg-[#fcfaf8] px-4 py-10"><div className="mx-auto max-w-5xl"><p className="text-sm text-stone-500"><Link to="/" className="hover:text-sphere-rose hover:underline">Home</Link> / My profile</p><div className="mt-5 grid gap-6 lg:grid-cols-[.8fr_1.6fr]"><aside className="surface-card h-fit p-6"><div className="grid h-14 w-14 place-items-center rounded-full bg-[#f5ded7] text-xl font-semibold text-sphere-plum">{auth.user.name.charAt(0).toUpperCase()}</div><h1 className="mt-4 text-2xl font-semibold tracking-tight text-sphere-ink">{auth.user.name}</h1><p className="mt-1 text-sm text-stone-500">{auth.user.email}</p><div className="mt-6 space-y-2 border-t border-sphere-line pt-5"><Link to="/wishlist" className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-semibold text-sphere-plum hover:bg-[#f7f0ec]"><FiHeart /> My wishlist</Link><Link to="/cart" className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-semibold text-sphere-plum hover:bg-[#f7f0ec]"><FiShoppingBag /> My cart</Link></div><button type="button" onClick={signOut} className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-sphere-rose px-4 py-3 text-sm font-semibold text-sphere-rose transition hover:bg-[#f9eef0]"><FiLogOut /> Sign out</button></aside><section className="surface-card p-6 sm:p-8"><p className="text-xs font-semibold tracking-[0.18em] text-sphere-rose">ACCOUNT SETTINGS</p><h2 className="mt-2 text-3xl font-semibold tracking-tight text-sphere-ink">Make ShopSphere yours</h2><p className="mt-2 text-sm leading-6 text-stone-500">These preferences are saved locally in your browser for this portfolio demo.</p><div className="mt-7 divide-y divide-sphere-line">{settings.map(([key, title, detail, Icon]) => <div key={key} className="flex items-center gap-4 py-5"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#f7f0ec] text-sphere-rose"><Icon /></span><div className="min-w-0 flex-1"><p className="font-semibold text-sphere-ink">{title}</p><p className="mt-1 text-sm text-stone-500">{detail}</p></div><button type="button" role="switch" aria-checked={preferences[key]} aria-label={title} onClick={() => toggle(key)} className={`relative h-7 w-12 shrink-0 rounded-full transition ${preferences[key] ? "bg-sphere-rose" : "bg-stone-300"}`}><span className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition ${preferences[key] ? "left-6" : "left-1"}`} /></button></div>)}</div></section></div></div></main>;
};

export default Profile;
