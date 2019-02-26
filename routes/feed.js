const express=require('express');

const router=express.Router();
const feedController=require('../controllers/feed');



router.post('/getUser/:id',feedController.getUser);


module.exports=router;