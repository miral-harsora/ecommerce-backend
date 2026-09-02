const AUTH_KEY = "shopsphere-auth";

export const getAuth = () => {
  try { return JSON.parse(localStorage.getItem(AUTH_KEY) || "null"); } catch { return null; }
};
export const saveAuth = (auth) => { localStorage.setItem(AUTH_KEY, JSON.stringify(auth)); window.dispatchEvent(new Event("shopsphere-auth")); };
export const clearAuth = () => { localStorage.removeItem(AUTH_KEY); window.dispatchEvent(new Event("shopsphere-auth")); };
export const authToken = () => getAuth()?.token || "";
