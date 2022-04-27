const Controller = require("./../controller")
module.exports = new(class extends Controller {

  async getPosts(req,res){
      res.send("allPosts")
  }
})