let express = require("express");
let router = express.Router();
const mongoose = require("mongoose");
const Post = mongoose.model("Post");

// router.use((req, res, next) => {
//   console.log("api middleware");
//   if (req.method === "GET") {
//     return next();
//   }
//   if (!req.isAuthenticated()) {
//     console.log("not auth");
//     res.redirect("/#login");
//   }
//   next();
// });

router.get("/posts", (req, res) => {
  Post.find({}, (err, posts)=>{
    if(err) return res.status(500).send(err);
    return res.send(posts);
  })
});

router.post("/posts", (req, res) => {
  
  const post = new Post();
  post.text = req.body.text;
  post.username = req.body.created_by;

  post.save((err, post)=>{
    if(err) return res.send(500, err);
    console.log(post);
    return res.send(post);
  })
});


router.get("/posts/:id", (req, res) => {
  Post.findById(req.params.id, (err, post) => {
    if(err)
      return res.send(500, err);

    if(!post){
      return res.send(404, err);
    }
    return res.send(post);
  })
});


router.put("/posts/:id", (req, res) => {

  Post.findById(req.params.id, (err, post) => {
    if(err)
     return res.send(500, err);

    if(!post){
      return res.send(404, err);
    }
    post.username = req.body.created_by;
    post.text = req.body.text;

    post.save((err, post)=>{
      if(err)
        return res.send(500, err)
      return res.send(post); 
    })
  })
});



router.delete("/posts/:id", (req, res) => {
  Post.findByIdAndDelete(req.body.id, (err)=>{
    if(err)
      return res.send(500, err);
    return res.send("deleted")
  })
});

module.exports = router;
