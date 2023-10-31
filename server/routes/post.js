const express =require('express')
const router = express.Router()
const mongoose = require('mongoose')
const requireLogin = require('../middleware/requireLogin')
const Post = mongoose.model('Post')

router.get('/allpost',(req, res) => {
    Post.find()
    .populate("postedBy","id name")
    .populate("comments.postedBy","_id name")
    .then(posts=>{
        res.json({posts})
    })
    .catch(err=>{
        console.log(err)
    })
})
router.post('/createpost',requireLogin,(req,res)=>{
    const {title,body,pic} = req.body
    if(!title || !body || !pic){
        return res.status(422).json({error:"please fill all fields data"})
    }
    req.user.password=undefined;
    const post = new Post({
        title,
        body,
        image:pic,
        postedBy:req.user
    })
    post.save().then(result=>{
        res.json({post:result})
    })
    .catch(err =>{
        console.log(err)
    })
})

router.get('/mypost',requireLogin,(req,res)=>{
    Post.find({postedBy:req.user._id})
    .populate("postedBy","id name")
    .then(mypost=>{
        res.json({mypost});
    })
    .catch(err=>{
        console.log(err)
    })
})
router.put('/like',requireLogin,(req,res)=>{
    Post.findByIdAndUpdate(req.body.postId,{
        $push:{likes:req.user._id}
    },{
        new:true
    }).then(result => {
        res.json(result);
    })
    .catch(err => {
        return res.status(422).json({ error: err });
    });
    })

router.put('/unlike',requireLogin,(req,res)=>{
    Post.findByIdAndUpdate(req.body.postId,{
        $pull:{likes:req.user._id}
    },{
        new:true
    }).then(result => {
        res.json(result);
    })
    .catch(err => {
        return res.status(422).json({ error: err });
    });
    })

router.put('/comment',requireLogin,(req,res)=>{
    const comment = {
        text:req.body.text,
        postedBy:req.user._id
    }
    Post.findByIdAndUpdate(req.body.postId,{
        $push:{comments:comment}
    },{
        new:true
    })
    .populate("comments.postedBy","_id name")
    .populate("postedBy","_id name")            
    .then(result => {
        res.json(result);
    })
    .catch(err => {
        return res.status(422).json({ error: err });
    });
    })

    router.delete('/deletepost/:postId', requireLogin, (req, res) => {
        Post.findOne({ _id: req.params.postId })
          .populate("postedBy", "_id")
          .then((post) => {
            if (!post) {
              return res.status(422).json({ error: "Post not found" });
            }
            if (post.postedBy._id.toString() === req.user._id.toString()) {
              Post.findByIdAndRemove(req.params.postId)
                .then((result) => {
                  res.json({ result });
                })
                .catch((err) => {
                  console.log(err);
                });
            } else {
              return res.status(422).json({ error: "You are not authorized to delete this post" });
            }
          })
          .catch((err) => {
            return res.status(422).json({ error: err });
          });
      });
      
    module.exports = router