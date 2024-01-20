const express = require('express');
const router = express.Router();

router.get('/getUserData', (req, res) => {
    // Your code to handle GET /api/users
    res.json({ message: 'Get all users' });
});

router.post('/checkusername', (req, res) => {
    // Your code to handle POST /api/users
    const user = req.body;
    console.log('Received user:', user);
    res.json({ message: 'User created successfully' });
});
router.post('checkuseremail', (req, res) => {
    const user = req.body;
    console.log('Received user:', user);
    res.json({ message: 'User created successfully' });
})

module.exports = router;
