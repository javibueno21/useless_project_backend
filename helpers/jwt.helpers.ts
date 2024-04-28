const jwt = require('jsonwebtoken');

const jwtSignToken = (
  id: string,
  expirationTime: string,
  purpose: string
): string => {
  return jwt.sign({ id, purpose }, process.env.JWT_SECRET, {
    expiresIn: expirationTime,
  });
};

export { jwtSignToken };
