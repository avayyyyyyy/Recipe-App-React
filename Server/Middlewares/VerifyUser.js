const jwt = require("jsonwebtoken");

const verifyUser = async (req, res, next) => {
  const clientToken = req.cookies.token;

  if (!clientToken) {
    res.json({ success: false, message: "Login First" });
  }
  try {
    jwt.verify(clientToken, process.env.JWT_SECRET_KEY, (err, decoded) => {
      if (err) {
        res.json({ success: false, message: "Wrong Token" });
      }
      req.id = decoded.id;
    });

    next();
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { verifyUser };
