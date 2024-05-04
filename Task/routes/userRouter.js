import express from 'express';
import  {getAllUsers,signUp,login,updatePassword,deleteAccount}  from '../controllers/userController.js';
const router = express.Router();


router.get('/',(req,res) => {res.send("hi bro")})
router.get('/allusers',getAllUsers);
router.post("/signup",signUp);
router.post("/login",login);
router.put("/update",updatePassword);
router.delete("/delete",deleteAccount);

export default router;