const Controller = require("./../controller")
const PostMessage = require('./../../models/postMessage')
const mongoose = require("mongoose")
module.exports = new(class extends Controller {

  async getPosts(req,res){
    const postMessages = await PostMessage.find({}) 
    res.status(200).json(postMessages)
  }
  async createPost(req,res){
   
    const post = req.body
    
    if(!req.userId) return res.json ({message: "unauthenticated"})
    const newPost = new PostMessage(post);
    await newPost.save()
    res.status.json(newPost)

  }

  async deletePost(req, res){
    const { id } = req.params;
    if(!req.userId) return res.json ({message: "unauthenticated"})
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await PostMessage.findByIdAndRemove(id);

    res.json({ message: "Post deleted successfully." });
    
  }
  
  async updatePost(req, res){
    if(!req.userId) return res.json ({message: "unauthenticated"})
    const { id } = req.params;
    const { title, message, creator, selectedFile, tags } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedPost = { creator, title, message, tags, selectedFile, _id: id };

    await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(updatedPost);
  }

  async likePost(req, res){
    const {id} = req.params
    
    if(!req.userId) return res.json ({message: "unauthenticated"})

    if(!mongoose.Types.ObjectId.isValid(id)) {
      return res.status.send("No Posts available with current id")
    }

    const post = await PostMessage.findById(id)
    const index =await post.likes.findIndex((id)=>id == String(req.userId))

    if(index == -1){
      post.likes.push(req.userId)
    }else{
      post.likes = post.likes.filter(id=>id !== String(req.userId))
    }
    
    const updatedPost = await PostMessage.findByIdAndUpdate(id,post,{new:true})

  }

})