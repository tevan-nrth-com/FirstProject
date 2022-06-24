const {Router } =require('express');
const passport =require ('passport');
const local = require('./local')
const router = Router();



    // router.post('./Login',passport.authenticate('local',(req,res)=>{
    //     res.successRedirect('./index'), 
    //     res.failureRedirect('./Register'),
    //     res.failureFlash(true)
    
    
  
    //     }))
  
         
router.get('/login')(passport.authenticate('local', { failureRedirect: '/Register' }),(req,res) => {
    res.redirect('/index');
  });
          



  
 

module.exports=router;
