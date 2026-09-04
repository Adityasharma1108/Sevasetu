import jwt from 'jsonwebtoken';

// Token check karne ka middleware
export const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: "Access Denied. Please login first." });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid or Expired Token." });
  }
};

// Admin check karne ka middleware
export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user && req.user.role === 'admin') {
      next(); // Agar admin hai, toh aage badhne do
    } else {
      res.status(403).json({ message: "Access Denied. Only Admins can perform this action." });
    }
  });
};