import { useState } from "react";
import { FiArrowRight, FiCheckCircle } from "react-icons/fi";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const subscribe = (event) => {
    event.preventDefault();
    setStatus(/^\S+@\S+\.\S+$/.test(email) ? "success" : "error");
  };

  return <section className="mx-auto my-16 max-w-7xl px-4 sm:px-6"><div className="grid gap-8 overflow-hidden rounded-3xl bg-[#2f1830] px-6 py-10 text-white sm:px-10 lg:grid-cols-[1.1fr_.9fr] lg:px-14 lg:py-14"><div><p className="text-xs font-semibold tracking-[0.2em] text-[#ffb6a4]">THE SPHERELIST</p><h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">A little inspiration,<br />straight to your inbox.</h2><p className="mt-4 max-w-md leading-7 text-white/70">Get new-arrival notes, styling ideas and members-only offers. No noise — unsubscribe whenever you like.</p></div><form className="self-end" onSubmit={subscribe} noValidate><label className="sr-only" htmlFor="newsletter-email">Email address</label><div className="flex rounded-2xl bg-white p-1.5 shadow-lg"><input id="newsletter-email" value={email} onChange={(event) => { setEmail(event.target.value); setStatus("idle"); }} type="email" placeholder="you@example.com" className="min-w-0 flex-1 rounded-xl px-4 py-3 text-[#2f1830] outline-none" /><button type="submit" className="inline-flex items-center gap-2 rounded-xl bg-[#f77a66] px-4 py-3 font-semibold transition hover:bg-[#ff927f] sm:px-5">Join <FiArrowRight /></button></div><p className={`mt-3 text-sm ${status === "error" ? "text-[#ffb6a4]" : "text-white/70"}`} aria-live="polite">{status === "success" && <><FiCheckCircle className="mr-1 inline" /> You’re on the list — welcome to ShopSphere.</>}{status === "error" && "Enter a valid email address to join the list."}</p></form></div></section>;
};

export default Newsletter;
