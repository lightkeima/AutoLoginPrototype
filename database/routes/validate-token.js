const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.header("auth-token");
  if(!token){
    return res.status(401).json({error: "Access Denied"});
  }
  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.requestUser = verified;

    next();
  } catch (error) {
    res.status(400).json({error: "Token is not valid"});
  }
};

module.exports = verifyToken;
