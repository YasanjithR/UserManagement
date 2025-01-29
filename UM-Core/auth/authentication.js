const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET 



const generateToken = (id, firstname, email) => {
    const payload = {
      id,
      firstname,
      email
    };
    return jwt.sign(payload, SECRET_KEY, { expiresIn: '2h' });
  };

const authenticate = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).send('Access denied');
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        next();
    } catch {
        res.status(403).send('Invalid token');
    }
}

module.exports = { generateToken , authenticate };



