import jwt from "jsonwebtoken";

export const verifyAdmin = (req, res, next) => {
  try {
    const token = req.cookies?.adminToken;  // ✅ match cookie name

    if (!token) {
      return res.status(401).json({ success: false, message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.admin = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ success: false, message: "Invalid or expired token" });
  }
};
