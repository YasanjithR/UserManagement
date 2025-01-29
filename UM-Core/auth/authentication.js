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
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(403).send('Access denied');
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET );
        req.user = decoded;
        next();
    } catch(error) {
        res.status(403).send('Invalid token' +error);
    }
}

module.exports = { generateToken , authenticate };



