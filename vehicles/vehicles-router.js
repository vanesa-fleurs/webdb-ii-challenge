const express = require('express');

const router = express.Router();

router.get('/', (req,res) => {
    // res.send('hit the get GET /api/posts');
    db.select('*').from('vehicles')
        .then(cars => {
            res.status(200).json(cars);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({error: `error getting all vehicles!`})
        });
})

module.exports = router;