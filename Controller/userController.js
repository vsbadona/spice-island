import User from "../models/userSchema.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const getUsers = async (req, res) => {
 const {Id} = req.query
 if(!Id){
    res.json({alert : "Please Provide Id"})
 }else{
    const FindUser = await User.findById(Id)
    if(FindUser){
        res.json({user : FindUser})
    }else{
        res.json({alert : "No User found"})
    }
 }
}

export const allUsers = async(req,res) => {
    const Users = await User.find()
    res.json(Users)
}

export const Register = async(req,res) => {
    const {email,password,name} = req.body.detail
    if (!name || !email || !password) {
        res.json({ alert: "All fields are required" })
    }
    else{
        const ifExist = await User.findOne({ email: email })
    if (ifExist) {
        res.json({ alert: "email already registered" })
    } else {
        const passwordToken = await bcrypt.hash(password , 12)
        const getUser = await new User({
            name: name,
            email: email,
            password: passwordToken
        })
        if (getUser) {
            res.json({ success: "User Registered Successfully" })
            await getUser.save()
        } else {
            res.json({ error: "Unable to register user" })
        }
    }
    }
}

const generateToken = async(req,res) => {
   const _id = req._id
   const payload = JSON.stringify(req)
 
   const token  = jwt.sign(payload, process.env.SECRET)
    if(token){
        const findUser = await User.findById(_id)
        if(findUser){
           findUser.token = token
           await findUser.save()
        }else{
            res.json({alert : "User Not Found"})
        }
    }else{
       res.json({alert : "Invalid Id Provided"})     
    }
}

export const Login = async (req, res) => {
    const { email, password } = req.body.detail
    if (!email || !password) {
        res.json({ alert: "Please enter both email and password" })
    }
    else{
        const checkUser = await User.findOne({ email: email })
    if (!checkUser) {
        res.json({ alert: "email not registered" })
    }
    else {
        
        const isMatch = await bcrypt.compare(password, checkUser.password)
        if (isMatch) {
          generateToken(checkUser)
      res.json({token : checkUser.token,Id : checkUser._id })
  } else {
      res.json({ alert: "incorrect password" })
  }}
    }
}

export const updateUser = async (req, res) => {
    const { name, image, phone, id } = req.body.Data
    if ( !name && !image && !phone) {
        res.json({ alert: "enter something to change" })
    } else {
        const data = {
            name : name,
            image : image,
            phone : phone
        }
        try {
            const user = await User.findByIdAndUpdate(id, data, {
              new: true,
              runValidators: true
            });
            if (!user) {
              return res.status(404).send('User not found');
            }
            res.json({success : "Updated"});
          } catch (err) {
            res.status(400).send(err.message);
          }

    }
}