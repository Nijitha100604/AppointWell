import validator from 'validator'
import bcrypt from 'bcrypt'
import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import {v2 as cloudinary} from 'cloudinary'
import doctorModel from './../models/doctorModel.js';
import appointmentModel from './../models/appointmentModel.js'
import razorpay from 'razorpay'

// API to register user

const registerUser = async(req, res) =>{
    try{

        const {name, email, password} = req.body
        if(!name || !email || !password)
        {
            return res.json({success: false, message: "Missing Details"})
        }

        // validating email

        if(!validator.isEmail(email))
        {
            return res.json({success: false, message: "Please provide valid email"})
        }

        // validating strong password

        if(password.length < 8)
        {
            return res.json({success: false, message: "Enter a strong password"})
        }

        // hashing user password

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const userData = {
            name,
            email,
            password: hashedPassword
        }

        const newUser = new userModel(userData)
        const user = await newUser.save()

        // creating a token

        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET)

        res.json({success: true, token})
        

    } catch(error){
        console.log(error)
        res.json({success: false, message: error.message})
    }
}


// API for user login

const loginUser = async (req,res) => {

    try{

        const {email,password} = req.body
        const user = await userModel.findOne({email})

        if(!user)
        {
            return res.json({success: false, message: "User does not exist"})
        }

        const isMatch = await bcrypt.compare(password,user.password)

        if(isMatch)
        {
            const token = jwt.sign({id:user._id}, process.env.JWT_SECRET)
            res.json({success: true, token})
        }
        else
        {
            res.json({success: false, message: "Invalid Credentials"})
        }

    } catch(error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }

}

// API for getting user profile data

const getProfile = async (req,res) =>{

    try{
        const userData = await userModel.findById(req.user.userId).select('-password')

        res.json({success: true, userData})

    } catch(error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }

}

// API for updating the user profile

const updateProfile = async (req, res) =>{
    try{

        const { name, phone, address, dob, gender} = req.body
        const userId = req.user.userId
        const imageFile = req.file

        if(!name || !phone || !address || !dob || !gender)
        {
            return res.json({success: false, message: "Data Missing"})
        }

        await userModel.findByIdAndUpdate(userId, {name, phone, address: JSON.parse(address), dob, gender})

        if(imageFile)
        {
            // upload image to cloudinary

            const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type: 'image'})
            const imageUrl = imageUpload.secure_url

            await userModel.findByIdAndUpdate(userId, {image: imageUrl})
        }

        res.json({success: true, message: "Profile updated"})

    } catch(error){
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

// API for booking appointment

const bookAppointment = async(req, res) =>{

    try{

        const {docId, slotDate, slotTime} = req.body

        const {token} = req.headers
        if(!token)
        {
            return res.json({success: false, message: "Unauthorized user"})
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const userId = decoded.id

        const docData = await doctorModel.findById(docId).select('-password')

        if(!docData.available)
        {
            return res.json({success: false, message: "Doctor not vailable"})
        }

        let slots_booked = docData.slots_booked

        // checking for slots availability

        if(slots_booked[slotDate])
        {
            if(slots_booked[slotDate].includes(slotTime))
            {
                return res.json({success: false, message: "Slot Not available"})
            }
            else
            {
                slots_booked[slotDate].push(slotTime)
            }
        }
        else
        {
            slots_booked[slotDate] = []
            slots_booked[slotDate].push(slotTime)
        }

        const userData = await userModel.findById(userId).select('-password')

        delete docData.slots_booked

        const appointmentData = {
            userId,
            docId,
            userData,
            docData,
            amount: docData.fees,
            slotTime,
            slotDate,
            date: Date.now()
        }

        const newAppointment = new appointmentModel(appointmentData)
        await newAppointment.save()
        
        // save new slots data in docData

        await doctorModel.findByIdAndUpdate(docId, {slots_booked})

        res.json({success: true, message: "Appointment Booked"})


    } catch(error){
        console.log(error)
        res.json({success: false, message: error.message})
    }

}


// API to get appointments for frontend my-appointmnet page

const listAppointment = async(req, res) =>{

    try{

        const {token} = req.headers
        if(!token)
        {
            return res.json({success: false, message: "Unauthorized user"})
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const userId = decoded.id

        const appointments = await appointmentModel.find({userId})
        res.json({success: true, appointments})

    }
    catch(error)
    {
        console.log(error)
        res.json({success: false, message: error.message})
    }

}


// API to cancel appointment

const cancelAppointment = async(req, res) =>{

    try{

        const {token} = req.headers
        if(!token)
        {
            res.json({success: false, message: "Unauthorized user"})
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const userId = decoded.id

        const {appointmentId} = req.body

        const appointmentData = await appointmentModel.findById(appointmentId)

        // verify appointment user

        if(appointmentData.userId !== userId)
        {
            return res.json({success: false, message: "Unauthorized action"})
        }

        await appointmentModel.findByIdAndUpdate(appointmentId, {cancelled : true})

        // releasing doctor slot

        const {docId, slotDate, slotTime} = appointmentData

        const doctorData = await doctorModel.findById(docId)

        let slots_booked = doctorData.slots_booked

        slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime)

        await doctorModel.findByIdAndUpdate(docId, {slots_booked})

        res.json({success: true, message: "Appointment Cancelled"})

    } catch(error)
    {
        console.log(error)
        res.json({success: false, message: error.message})
    }

}


const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})

// API to make payment of appointment using razorpay

const paymentRazorpay = async(req, res) =>{

    try{
        const {appointmentId} = req.body
        const appointmentData = await appointmentModel.findById(appointmentId)
    
        if(appointmentData || appointmentData.cancelled)
        {
            return res.json({success: false, message: "Appointment cancelled or not found"})
        }

        // creating options for razorpay payment

        const options = {
            amount: appointmentData.amount * 100,
            currency: process.env.CURRENCY,
            receipt: appointmentId
        }

        // creation of an order

        const order = await razorpayInstance.orders.create(options)

        res.json({success: true, order})
    }
    catch(error)
    {
        console.log(error)
        res.json({success: false, message: error.message})
    }
    
}

// API to verify payment of razorpay

const verifyRazorpay = async(req, res) => {
    try{
        const {razorpay_order_id} = req.body
        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)

        if(orderInfo.status === 'paid')
        {
            await appointmentModel.findByIdAndUpdate(orderInfo.receipt, {payment: true})
            res.json({success: true, message: "Payment Successful"})
        }
        else
        {
            res.json({success: false, message: "Payment Failed"})
        }

    } catch(error){
        console.log(error)
        res.json({success: false, message: error.message})
    }
}


// A temporary API for updating the payment 

const updatePayment = async(req, res) => {
    try{
        const {appointmentId} = req.body
        const update = await appointmentModel.findByIdAndUpdate(appointmentId, {payment: true})
        if(!update)
        {
            res.json({success: false, message: "Appointment Id not found"})
        }
        res.json({success: true, message: "Paid Successfully"})

    } catch(error){
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

export {registerUser, loginUser, getProfile, updateProfile, bookAppointment, listAppointment, cancelAppointment, paymentRazorpay, verifyRazorpay, updatePayment} 