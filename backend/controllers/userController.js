import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import userModel from '../model/userModel.js'

const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET)
}

// route for register user
const registerUser = async (req, res) => {
    try {
        const {name, email, password} =req.body;
        const profileImage = req.file ? req.file.path : '';

        //checking wheather the user already exists or not
        const exists = await userModel.findOne({email});
        if(exists){
            return res.json({success: false, message: "user already exists."})
        }

        //validating email format and strong password
        if(!validator.isEmail(email)){
            return res.json({success: false, message: "Please enter the valid email."})
        }
        if (password.length < 8) {
            return res.json({success: false, message: "Please enter the strong password"})
        }

        // hashing user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name, 
            email,
            password: hashedPassword,
            profileImage,
        })

        const user = await newUser.save();
        const token = createToken(user._id)
        res.json({success:true, token})
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}


//route for login user
const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;
        
        const user = await userModel.findOne({email})

        if (!user) {
            return res.json({success: false, message: "user does not exists."})
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            const token = createToken(user._id);
            res.json({success: true, token})
        } else {
            res.json({success: false, message: "invalid credentials"})
        }
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

// API to get user profile
const userProfile = async (req, res) => {
    try {

        const { userId } = req.body

        if (!userId) {
            return res.status(400).json({ success: false, message: 'User ID is required' });
        }

        const profileData = await userModel.findById(userId).select('-password')

        res.json({ success: true, profileData })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export {registerUser, loginUser, userProfile}

