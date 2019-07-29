const express = require('express');
const router = express.Router();
const Question = require('../models/questionBlock');
const Page = require('../models/page')

router.post('/create', async (req, res, next) => {
    const request = req.body
    
    const question = await Question.create({
        name: request.bbName,
        options: request.option,
        type: request.type,
        page: request.document
    });
    res.redirect('/create')
})

module.exports = router;