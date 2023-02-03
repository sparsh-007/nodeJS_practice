const PASS = process.env.PASS;

const verifyAuth = (request, response, next) => {
  const { authorization } = request.headers;
  console.log("in auth");
  if (!authorization) {
    return response.status(403).json({ message: "unauthorized request" });
  }
  if (authorization !== PASS)
    return response.status(403).json({ message: "unauthorized request" });
  return next();
};
module.exports = {
  verifyAuth,
};
