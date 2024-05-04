import User from "../models/User.js";

export const getAllUsers = async(req,res,next)=>{
    let users;
    try {
        users = await User.find();
    } catch (error) {
        return next(error);
    }
    if(!users){
        return res.status(404).json({message:"No user found"})
    }
    return res.status(200).json({users});
}

export const signUp = async(req,res,next)=>{
    const {user,password} = req.body;
    let existingUser;
    try{
        existingUser = await User.findOne({user: user});
    }
    catch(err){
        console.log(err);
    }
    if(existingUser){ 
        return res.status(409).json({message:'user already exists'});
    }
    // const hashedPassword = bcrypt.hashSync(password);
    const newUser = new User({
        user:user,
        password:password,
    });
    
    try{
       await newUser.save()
    }catch(err){
        console.log(err);
    }
    return res.status(200).json({newUser});
}

export const login = async(req, res, next) => {
    const { user, password } = req.body;
    if(!user){
        return res.status(400).json({ message: "user name required" });
    }
    if(!password){
        return res.status(400).json({ message: "password is required" });
    }
    console.log(`user name: ${user}`);
    console.log(`Password: ${password}`);

    let existingUser;
    let hashedPassword;

    try {
        existingUser = await User.findOne({ user });
        console.log(`Existing User: ${existingUser}`);
        
    } catch(err) {
        console.log(`Error finding user: ${err}`);
    }

    if (!existingUser) {
        return res.status(404).json({ message: "user not found" });
    }


    let checkPass=0;

    if(existingUser.password===password){
        checkPass=1;
    }
    console.log(`Password check result: ${checkPass}`);

    if (!checkPass) {
        return res.status(404).json({ message: "Password is incorrect" });
    }

    return res.status(200).json({ message: "Login successful!" });
}

export const updatePassword = async(req,res,next) => {
    const { user, oldpassword, newpassword } = req.body;
    console.log(`user name: ${user}`);
    console.log(`Old Password: ${oldpassword}`);
    console.log(`New Password: ${newpassword}`);

    try{
        const existingUser = await User.findOne({ user: user });
        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
        }

        if (existingUser.password !== oldpassword) {
            return res.status(400).json({ message: "Old password is incorrect" });
        }
        if(oldpassword === newpassword){
            return res.status(427).json({ message: "New password is same as old password" });
        }
        existingUser.password = newpassword;
        await existingUser.save();

        return res.status(200).json({ message: "Password updated successfully" });
    }catch(err){
        console.log(err);
    }
}

export const deleteAccount = async (req, res, next) => {
    const { user, password } = req.body;
    console.log(`User name: ${user}`);

    try {
        const existingUser = await User.findOne({ user: user });
        
        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
        }

        if (password !== existingUser.password) {
            return res.status(401).json({ message: "Password is incorrect" });
        }

        await existingUser.deleteOne();

        return res.status(200).json({ message: "User deleted successfully" });
    } catch (err) {
        console.error("Error deleting user:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
};
