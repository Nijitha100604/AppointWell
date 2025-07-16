import { createContext, useEffect, useState } from "react";
import axios from 'axios';
import {toast} from 'react-toastify'

// eslint-disable-next-line react-refresh/only-export-components
export const AppContext = createContext();

const AppContextProvider = (props) =>{

    const currencySymbol = '$'
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [doctors, setDoctors] = useState([])

    const [token, setToken] = useState(localStorage.getItem('token')? localStorage.getItem('token') : '')

    const [userData, setUserData] = useState({
        name: '',
        email: '',
        phone: '',
        image: '',
        gender: '',
        dob: '',
        address:{
            line1: '',
            line2: ''
        }
    })


    const getDoctorsData = async() =>{
        try{
            const {data} = await axios.get(backendUrl + '/api/doctor/list')
            if(data.success){
                setDoctors(data.doctors)
            }
            else{
                toast.error(data.message)
            }
        } catch(error)
        {
            console.log(error)
            toast.error(error.message)
        }
    }


    const loadUserProfileData = async() =>{
        try{

            const {data} = await axios.get(backendUrl + '/api/user/get-profile', {headers: {token}}) 
            console.log("Fetched user profile: ", data)
            if(data.success)
            {
                setUserData(data.userData)
            }
            else
            {
                toast.error(data.message)
            }

        } catch(error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const value = {
        doctors, getDoctorsData,
        currencySymbol,
        token, setToken,
        userData, setUserData,
        loadUserProfileData,
        backendUrl
    };

    useEffect(()=>{
        getDoctorsData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(()=>{
        if(token)
        {
            loadUserProfileData()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token])

    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )

}

export default AppContextProvider