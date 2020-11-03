const express = require('express')
const mainRouter = express.Router()

mainRouter.get('', async(req, res) => {
    res.render('main')
})

module.export = mainRouter