const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const { authenticate, generateToken} = require('../auth/authentication');
const { body, validationResult } = require('express-validator');
const router = express.Router();


router.post('/login', 
    body('email').isString().notEmpty(),
    body('password').isString().notEmpty(),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;
        try {
            const user = await User.findOne({ email });
            if (user && bcrypt.compareSync(password, user.password)) {
                const token = await generateToken(user.id, user.firstname, user.email);
                res.json({ token });
            } else {
                res.status(401).send('Invalid credentials');
            }
        } catch (error) {
            res.status(500).send('Server error' + error);
        }
    }
);


router.post('/users', 
    authenticate,
    body('firstname').isString().notEmpty(),
    body('lastname').isString().notEmpty(),
    body('email').isEmail(),
    body('password').isLength({ min: 6 }),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { firstname, lastname, email, password } = req.body;
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = new User({ firstname, lastname, email, password: hashedPassword });
            await user.save();
            res.json(user);
        } catch (error) {
            res.status(500).send('Server error');
        }
    }
);

router.get('/users', authenticate, async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).send('Server error');
    }
});

router.put('/users/:id', 
    authenticate,
    body('firstname').optional().isString().notEmpty(),
    body('lastname').optional().isString().notEmpty(),
    body('email').optional().isEmail(),
    body('password').optional().isLength({ min: 6 }),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
            res.json(user);
        } catch (error) {
            res.status(500).send('Server error');
        }
    }
);

router.delete('/users/:id', authenticate, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.send('User deleted');
    } catch (error) {
        res.status(500).send('Server error');
    }
});

router.get('/users/:id', authenticate, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.json(user);
    } catch (error) {
        res.status(500).send('Server error');
    }
});

module.exports = router;
