const jwt = require("jsonwebtoken");

const verifyUser = async (req, res, next) => {
  try {
    if (!req.headers.cookie) {
      return res.json({ success: false, message: "No Cookie found" });
    }

    const clientToken = req.headers.cookie.split("=")[1];
    // console.log(clientToken);

    if (!clientToken) {
      res.json({ success: false, message: "No Cookie Found" });
    }
    jwt.verify(clientToken, process.env.JWT_SECRET_KEY, (err, decoded) => {
      if (err) {
        res.json({ success: false, message: "Wrong Token" });
      } else {
        req.id = decoded.id;
        // res.send("Verified User");
        next();
      }
    });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { verifyUser };
