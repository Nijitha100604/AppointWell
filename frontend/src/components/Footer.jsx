import React from 'react'
import { assets } from '../assets/assets';
const Footer = () => {
  return (
    <div className="md:mx-10">
        <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
            {/* ----- Left Section ----- */}
            <div>
                <img className="mb-5 w-40"
                 src={assets.logo} alt="logo" />
                <p className="w-full md:w-2/3 text=gray-600 leading-6">Our hospital appointment booking platform offers a fast, secure, and convenient way to connect patients with trusted doctors. Book appointments, view doctor profiles, and manage your healthcare needs - all in one place.</p>
            </div>

            {/* ----- Middle Section ----- */}
            <div>
                <p className="text-xl font-medium mb-5">COMPANY</p>
                <ul className="flex flex-col gap-2 text-gray-600">
                    <li>Home</li>
                    <li>About us</li>
                    <li>Contact us</li>
                    <li>Privacy policy</li>
                </ul>
            </div>

            {/* ----- Right Section ----- */}
            <div>
                <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
                <ul className="flex flex-col gap-2 text-gray-600">
                    <li>+1-212-456-7899</li>
                    <li>example@gmail.com</li>
                </ul>
            </div>
        </div>
        <div>
            {/* ------ Copyright Text ------ */}
            <div>
                <hr />
                <p className="py-5 text-sm text-center">Copyright 2025@ Prescripto - All Rights Reserved</p>
            </div>
        </div>
    </div>
  )
}

export default Footer