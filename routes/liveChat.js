const express = require('express')
const router = express.Router()

const users = ['admin'] // Dummy array for users

router.get('/', (req, res, next) => {
    res.render('pages/pr12-login', {
        title: 'Prove Activity 12',
        path: '/proveActivities/12'
    })
})

// Verify login submission to access chat room.
router.post('/login', (req, res, next) => {
     username = req.body.username;
     if (users.includes(username)) {
         console.log(username + ' already exists');
         return res.status(409).send({error: 'Username already exists'});
     } else {
         users.push(username);
         req.session.user = username;
         console.log('new user ' + username + ' entered');
         return res.status(200).send({message: 'Login successful'});
     }

})

// Render chat screen.
router.get('/chat', (req, res, next) => {
    res.render('pages/pr12-chat', {
        title: 'Chat Page',
        user: req.session.user
    })
})

module.exports = router
