const express = require("express")
const router = express.Router()

const controller = require('./controller')

router.get("/",controller.getPosts)

module.exports = router