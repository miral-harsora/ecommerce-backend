import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";
import { saveAuth } from "../helper/authStorage";
import { emailRegex, passwordRegex } from "../helper/Regex";

const Login = () => {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const update = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  const submit = async (event) => {
    event.preventDefault(); setError(""); setMessage("");
    if (mode === "signup" && form.name.trim().length < 2) return setError("Please enter your name.");
    if (!emailRegex.test(form.email)) return setError("Please enter a valid email.");
    if (!passwordRegex.test(form.password)) return setError("Use 8+ characters with uppercase, lowercase, number, and symbol.");
    setLoading(true);
    try {
      const response = await api.post(`/auth/${mode}`, form);
      saveAuth(response.data); setMessage(mode === "signup" ? "Account created — welcome to ShopSphere." : "Welcome back.");
      setTimeout(() => navigate("/"), 500);
    } catch (requestError) { setError(requestError.response?.data?.error || "Something went wrong. Please try again."); }
    finally { setLoading(false); }
  };
  return <main className="min-h-[75vh] bg-[#fcfaf8] px-4 py-12"><div className="mx-auto w-full max-w-md surface-card p-7 sm:p-9"><div className="mb-7 text-center"><p className="text-xs font-semibold tracking-[0.2em] text-sphere-rose">YOUR SHOPSPHERE ACCOUNT</p><h1 className="mt-3 text-3xl font-semibold tracking-tight text-sphere-ink">{mode === "login" ? "Welcome back" : "Create your account"}</h1><p className="mt-2 text-sm text-stone-500">{mode === "login" ? "Sign in to keep your favourites and cart close." : "Join for a more personal shopping experience."}</p></div><form onSubmit={submit} className="space-y-4" noValidate>{mode === "signup" && <div><label htmlFor="name" className="mb-1 block text-sm font-medium">Full name</label><input id="name" name="name" value={form.name} onChange={update} autoComplete="name" className="w-full rounded-xl border border-sphere-line p-3 outline-none focus:border-sphere-rose" placeholder="Alex Morgan" /></div>}<div><label htmlFor="email" className="mb-1 block text-sm font-medium">Email address</label><input id="email" name="email" type="email" value={form.email} onChange={update} autoComplete="email" className="w-full rounded-xl border border-sphere-line p-3 outline-none focus:border-sphere-rose" placeholder="you@example.com" /></div><div><label htmlFor="password" className="mb-1 block text-sm font-medium">Password</label><input id="password" name="password" type="password" value={form.password} onChange={update} autoComplete={mode === "login" ? "current-password" : "new-password"} className="w-full rounded-xl border border-sphere-line p-3 outline-none focus:border-sphere-rose" placeholder="••••••••" /><p className="mt-1 text-xs text-stone-500">8+ chars, uppercase, lowercase, number and symbol.</p></div>{error && <p className="rounded-lg bg-[#fff0ed] p-3 text-sm text-sphere-rose" role="alert">{error}</p>}{message && <p className="rounded-lg bg-[#edf7f0] p-3 text-sm text-green-700" role="status">{message}</p>}<button disabled={loading} className="btn-primary w-full p-3 disabled:cursor-not-allowed disabled:opacity-60">{loading ? "Please wait…" : mode === "login" ? "Sign in" : "Create account"}</button></form><p className="mt-6 text-center text-sm text-stone-500">{mode === "login" ? "New to ShopSphere?" : "Already have an account?"} <button type="button" className="font-semibold text-sphere-rose hover:underline" onClick={() => { setMode(mode === "login" ? "signup" : "login"); setError(""); setMessage(""); }}>{mode === "login" ? "Create an account" : "Sign in"}</button></p></div></main>;
};

export default Login;
