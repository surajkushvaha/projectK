const express = require('express');
const router = express.Router();

const {addUser, getUserById, getUserList, isEmailExist, isUserUnique} = require('../controllers/usersDetailsController');

router.get('/getUserList', (req, res) => {
    // Your code to handle GET /api/users
    res.json({data: getUserList()});
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
