const requireLogin = require("../middleware/requireLogin");
const router = require("./post");

router.put('follow',requireLogin,(req,res)=>{
    User.findByIdAndUpadate(req.body.followId,{
        $push:{followers:req.user._id}
    },{
        new:true
    },(result)=>{
        User.findByIdAndUpadate(req.user._id,{
            $push:{following:req.body.followId}
        },{new:true})
        .then(result=>{
            res.json(result);
        })
        .catch(err=>{
            return res.status(422).json({error:err})
        })
    }
    ) 
})

router.put('unfollow',requireLogin,(req,res)=>{
    User.findByIdAndUpadate(req.body.unfollowId,{
        $pull:{followers:req.user._id}
    },{
        new:true
    },(result)=>{
        User.findByIdAndUpadate(req.user._id,{
            $pull:{following:req.body.unfollowId}
        },{new:true})
        .then(result=>{
            res.json(result);
        })
        .catch(err=>{
            return res.status(422).json({error:err})
        })
    }
    ) 
})