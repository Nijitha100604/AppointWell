import React from 'react'
import { assets } from './../assets/assets';

const Header = () => {
  return (
    <div className="flex flex-col md:flex-row flex-wrap bg-cyan-600 rounded-lg px-6 md:px-8 lg:px-10">

        {/* -------Left Side------- */}
        <div className="md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px]">
            <p className="text-2xl md:text-3xl lg:text-4xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight">
                Book Appointment <br /> With Trusted Doctors
            </p>
            <div className="flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light">
                <img className="w-28"
                src={assets.group_profiles} alt="group-profiles" />
                <p>
                    Simply browse through our extensive list of doctors,<br className="hidden sm:block"/> schedule your appointment hassle-free
                </p>
            </div>
            <a href="#speciality" className="flex items-center gap-2 bg-white px-8 py-3 rounded-full text-gray-600 text-sm m-auto md:m-0 hover:scale-105 transistion-all duration-300">
                Book appointment <img className="w-3" src={assets.arrow_icon} alt="arrow-icon" />
            </a>
        </div>


        {/* -------Right Side------- */}
        <div className="md: w-1/2 relative">
            <img className="w-full md:absolute bottom-0 h-auto rounded-lg"
            src={assets.header_img} alt="header-img" />
        </div>
    </div>
  )
}

export default Header