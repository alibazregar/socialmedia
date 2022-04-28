const Controller = require("./../controller")
const PostMessage = require('./../../models/postMessage')
module.exports = new(class extends Controller {

  async getPosts(req,res){
    const postMessages = await PostMessage.find({}) 
    res.status(200).json(postMessages)
  }
  async createPost(req,res){
    const post = req.body
    const newPost = new PostMessage(post);
    await newPost.save()
    res.status.json(newPost)

  }

  async deletePost(req, res){

  }
  
  async updatePost(req, res){

  }

  async likePost(req, res){
    
  }

})