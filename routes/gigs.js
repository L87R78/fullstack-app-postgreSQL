const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Gig = require('../models/Gig');

//Get List
router.get('/', (req, res) =>
    Gig.findAll()
        .then(gigs => {
            //res.send('yes')
            res.render('gigs', {
                gigs
            })
        })
        .catch(err => console.log(err))
)

//Add a gig
router.get('/add', (req, res) => {
    res.render('add')
})
router.post('/add', (req, res) => {
    const data = {
        title: "Simple Website Wordpress",
        technologies: "React",
        description: "something",
        budget: "$30000",
        contact_email: "user1@gmal.com"
    }

    let { title, technologies, budget, description, contact_email } = data;
    Gig.create({
        title,
        technologies,
        description,
        budget,
        contact_email
    })
        .then(gig => res.redirect('/gigs'))
        .catch(err => console.log("Error on create => " + err));
});

module.exports = router;