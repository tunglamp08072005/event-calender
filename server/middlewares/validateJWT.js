const jwt = require("jsonwebtoken");

const validateJWT = (req, res, next) => {
  const token = req.get("x-token");

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: "No token provided",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.id = decoded.id;
    req.name = decoded.name;
  } catch (err) {
    return res.status(401).json({
      ok: false,
      msg: "Invalid token",
    });
  }

  next();
};

module.exports = validateJWT;
