const express = require("express")
const router = express.Router()

const controller = require('./controller')

router.get("/",controller.getPosts)
router.post("/",controller.createPost)

module.exports = router