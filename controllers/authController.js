const crypto = require("node:crypto");
const User = require("../models/User");
const { createToken } = require("../middleware/auth");

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;
const hashPassword = (password, salt = crypto.randomBytes(16).toString("hex")) => `${salt}:${crypto.scryptSync(password, salt, 64).toString("hex")}`;
const matchesPassword = (password, stored) => {
    const [salt, hash] = String(stored).split(":");
    if (!salt || !hash) return false;
    const candidate = crypto.scryptSync(password, salt, 64);
    const expected = Buffer.from(hash, "hex");
    return candidate.length === expected.length && crypto.timingSafeEqual(candidate, expected);
};
const publicUser = (user) => ({ id: user._id, name: user.name, email: user.email });

const signup = async (req, res) => {
    try {
        const name = String(req.body.name || "").trim();
        const email = String(req.body.email || "").trim().toLowerCase();
        const password = String(req.body.password || "");
        if (name.length < 2) return res.status(400).json({ error: "Please enter your name." });
        if (!emailPattern.test(email)) return res.status(400).json({ error: "Please enter a valid email." });
        if (!passwordPattern.test(password)) return res.status(400).json({ error: "Password must be 8+ characters with uppercase, lowercase, number, and symbol." });
        if (await User.exists({ email })) return res.status(409).json({ error: "An account with this email already exists." });
        const user = await User.create({ name, email, passwordHash: hashPassword(password) });
        res.status(201).json({ token: createToken(user._id), user: publicUser(user) });
    } catch (error) {
        if (error.code === 11000) return res.status(409).json({ error: "An account with this email already exists." });
        res.status(500).json({ error: "Unable to create account." });
    }
};

const login = async (req, res) => {
    try {
        const email = String(req.body.email || "").trim().toLowerCase();
        const password = String(req.body.password || "");
        const user = await User.findOne({ email }).select("+passwordHash");
        if (!user || !matchesPassword(password, user.passwordHash)) return res.status(401).json({ error: "Email or password is incorrect." });
        res.status(200).json({ token: createToken(user._id), user: publicUser(user) });
    } catch {
        res.status(500).json({ error: "Unable to sign in right now." });
    }
};

module.exports = { signup, login };
