import express from 'express'
import { doctorList } from '../controllers/doctorController.js'

const doctorRouter = express.Router()

// API for getting all doctors in frontend

doctorRouter.get('/list', doctorList)

export default doctorRouter