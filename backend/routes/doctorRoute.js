import express from 'express'
import { doctorList, loginDoctor, appointmentsDoctor, cancelAppointment, completeAppointment, DoctorDashboard, doctorProfile, updateDoctorProfile} from '../controllers/doctorController.js'
import authDoctor from '../middlewares/authDoctor.js'

const doctorRouter = express.Router()

// API for getting all doctors in frontend

doctorRouter.get('/list', doctorList)
doctorRouter.post('/login', loginDoctor)
doctorRouter.get('/appointments', authDoctor, appointmentsDoctor)
doctorRouter.post('/complete-appointment', authDoctor, completeAppointment)
doctorRouter.post('/cancel-appointment', authDoctor, cancelAppointment)
doctorRouter.get('/dashboard', authDoctor, DoctorDashboard)
doctorRouter.get('/profile', authDoctor, doctorProfile)
doctorRouter.post('/update-profile', authDoctor, updateDoctorProfile)

export default doctorRouter