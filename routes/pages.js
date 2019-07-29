const express = require('express');
const router = express.Router();
const Page = require('../models/page');
const Question = require('../models/questionBlock');
const Pool = require('../models/pool');


router.get('/', async (req, res, next) => {
    const pages = await Page.find()
    const pool = await Pool.find()
    console.log(pool);
    
    res.render('pages/pages', { pages, pool})
})

router.get('/:id', async (req, res, next) => {
    const pageId = req.params.id
    const page = await Page.findOne({
        _id:pageId,
    });
    const questionText = await Question.find({
        page:pageId,
        type: "text"
    })
    const questionRadio = await Question.find({
        page: pageId,
        type: "radio"
    })

    const questions = await Question.find({
        page: pageId
    })

    let a = questions.map(el=> {
        el.isText = el.type === "text"
        el.isRadio = el.type === "radio"
        return el;
    })
    res.render('pages/page', { questionRadio, page, questionText, a, questions})
})

router.post('/create', async (req, res, next) => {
    await Page.create({
        name: req.body.name,
    })
    res.redirect('/pages')
   
})


module.exports = router;