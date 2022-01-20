const jwt = require("jsonwebtoken");

module.exports = async function (req, res, next) {
  try {
    const token = req.header("auth-token");
    if (!token) {
      throw new Error("Access Deniged");
    }

    const verify = await jwt.verify(token, process.env.SECRET);

    req.user = verify;
    next();
  } catch (error) {
    res.status(401).send({ error: error.message });
  }
};
