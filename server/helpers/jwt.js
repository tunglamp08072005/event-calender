const jwt = require("jsonwebtoken");

const generateJWT = (id, name) => {
  const payload = { id, name };

  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.JWT_SECRET_KEY,
      { expiresIn: "24h" },
      (error, token) => {
        if (error) {
          console.error("Error generating JWT:", error);
          return reject("Token generation failed");
        }
        resolve(token);
      }
    );
  });
};

module.exports = generateJWT;
