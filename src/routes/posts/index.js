const express = require("express")
const router = express.Router()
const auth = require("./../../middleware/auth")
const controller = require('./controller')

router.get("/",controller.getPosts)
router.post("/",auth,controller.createPost)
router.delete('/:id',auth,controller.deletePost)
router.patch('/:id',auth,controller.updatePost)
router.patch('/:id/likePost',controller.likePost)

module.exports = router