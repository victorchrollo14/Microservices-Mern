import jwt from "jsonwebtoken";

const verifyToken = async (req, res, next) => {
  let token = req.header("Authorization");
  try {
    if (!token) {
      res.status(401).send("Unauthorized User");
    }

    if (token.startsWith("Bearer")) {
      token = token.slice(7, token.length).trimLeft();
    }

    const verified = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    req.user = verified;
    next();
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export { verifyToken };