const express = require('express');
const router = express.Router();
const Page = require('../models/page');
const Question = require('../models/questionBlock');
const Pool = require('../models/pool')

router.post('/', async function(req, res){
    let ololo = req.body;
    const newAnswer = await Pool.create({
        name: ololo.pageName,
        form: ololo,
    })
    res.redirect('/');
})

module.exports = router;