const express = require('express');
const router = express.Router();
//const db = require('../config/database');
const Gig = require('../models/Gig');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

//Get List
router.get('/', (req, res) =>
    Gig.findAll()
        .then(gigs => {
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

    let { title, technologies, budget, description, contact_email } = req.body;
    let errors = [];

    if (!title) {
        errors.push({ text: "Please add a title" });
    };
    if (!technologies) {
        errors.push({ text: "Please add some technologies" });
    };
    if (!description) {
        errors.push({ text: "Please add some description" });
    };
    if (!contact_email) {
        errors.push({ text: "Please add a contact email" });
    };

    if (errors.length > 0) {
        res.render('add', {
            errors,
            title,
            technologies,
            budget,
            description,
            contact_email
        })
    } else {
        Gig.create({
            title,
            technologies,
            description,
            budget,
            contact_email
        })
            .then(gig => res.redirect('/gigs'))
            .catch(err => console.log("Error on create => " + err));
    }
});

// Search List
router.get('/search', (req, res) => {
    const { term } = req.query;
    Gig.findAll({ where: { technologies: { [Op.like]: "%" + term + "%" } } })
        .then(gigs => res.render('gigs', { gigs }))
        .catch(err => console.log(err));

})
// Delete item
router.post('/:id', (req, res) => {
    Gig.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(el => {
        res.redirect('/gigs')
    })
    .catch(err => console.log(err))
})


module.exports = router;