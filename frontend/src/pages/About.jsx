import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-4 text-gray-500">
        <p>ABOUT <span className="text-gray-700 font-medium">US</span></p>
      </div>

      <div className="my-5 flex flex-col md:flex-row gap-12">
        <img className="w-full md:max-w-[360px]"
        src={assets.about_image} alt="about-image" />

        <div className="flex flex-col ustify-center gap-6 md:w-2/4 text-sm text-gray-600">
          <p>Prescripto is a simple and user-friendly hospital appointment booking website that helps patients easily schedule appointments with doctors. It allows users to view doctor profiles, specialties, experience, and fees.</p>
          <p>Patients can choose available time slots for the next seven days and book appointments instantly without waiting or calling. The platform ensures convenience, speed, and transparency in the booking process.</p>
          <b className="text-gray-800">Our Vision</b>
          <p>Prescripto is designed to make hospital visits more organized and efficient, benefiting both patients and doctors by managing schedules smoothly and reducing appointment conflicts.</p>
        </div>
      </div>

      <div className="text-xl my-4">
        <p>WHY <span className="text-gray-700 font-semibold">CHOOSE US</span></p>
      </div>

      <div className="flex flex-col md:flex-row mb-20">

        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-indigo-400 hover:text-white transition-all duration-300 text-gary-600 cursor-pointer">
          <b>Efficieny:</b>
          <p>Streamlined appointment scheduling that fits into your busy lifestyle.</p>
        </div>

        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-indigo-400 hover:text-white transition-all duration-300 text-gary-600 cursor-pointer">
          <b>Convenience</b>
          <p>Access to a network of trusted healthcare professionals in your area.</p>
        </div>

        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-indigo-400 hover:text-white transition-all duration-300 text-gary-600 cursor-pointer">
          <b>Personalization</b>
          <p>Tailored recommendations and reminders to help you stay on top of your health.</p>
        </div>

      </div>

    </div>
  )
}

export default About