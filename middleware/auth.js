const crypto = require("node:crypto");

const secret = () => process.env.JWT_SECRET || "shopsphere-development-secret-change-me";
const encode = (value) => Buffer.from(JSON.stringify(value)).toString("base64url");

const createToken = (userId) => {
    const header = encode({ alg: "HS256", typ: "JWT" });
    const payload = encode({ sub: String(userId), exp: Math.floor(Date.now() / 1000) + (7 * 24 * 60 * 60) });
    const signature = crypto.createHmac("sha256", secret()).update(`${header}.${payload}`).digest("base64url");
    return `${header}.${payload}.${signature}`;
};

const verifyToken = (token) => {
    const [header, payload, signature] = String(token || "").split(".");
    if (!header || !payload || !signature) return null;
    const expected = crypto.createHmac("sha256", secret()).update(`${header}.${payload}`).digest("base64url");
    const valid = Buffer.byteLength(signature) === Buffer.byteLength(expected) && crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
    if (!valid) return null;
    const decoded = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    if (!decoded.sub || decoded.exp < Math.floor(Date.now() / 1000)) return null;
    return decoded;
};

const requireAuth = (req, res, next) => {
    const token = req.headers.authorization?.startsWith("Bearer ") ? req.headers.authorization.slice(7) : null;
    const decoded = verifyToken(token);
    if (!decoded) return res.status(401).json({ error: "Authentication required." });
    req.userId = decoded.sub;
    next();
};

module.exports = { createToken, verifyToken, requireAuth };
