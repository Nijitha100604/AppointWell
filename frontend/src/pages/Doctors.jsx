import React, { useContext, useEffect, useState } from 'react'
import {useParams, useNavigate} from 'react-router-dom';
import { AppContext } from './../context/AppContext';

const Doctors = () => {

  const navigate = useNavigate();
  const { speciality } = useParams();
  const [filterDoc, setFilterDoc] = useState([]);
  const {doctors} = useContext(AppContext);
  const [showFilter, setShowFilter] = useState(false);

  const applyFilter = () =>{
    if(speciality){
      setFilterDoc(doctors.filter(doc => doc.speciality === speciality))
    }
    else{
      setFilterDoc(doctors);
    }
  }

  useEffect(()=>{
    applyFilter()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [doctors, speciality])

  return (
    <div>
      <p className="text-gray-600">Browse through the doctors specialist</p>

      <button onClick={()=>setShowFilter(!showFilter)}
      className={`px-4 py-1 border border-gray-400 rounded-full font-light mt-4 md:hidden cursor-pointer ${showFilter ? "bg-indigo-400 text-white" : "text-gray-400"}`}>Filter</button>
      <div className="flex flex-col sm:flex-row items-start gap-5 mt-5 ">

        <div className="flex flex-col gap-4 text-sm text-gray-600 hidden md:block">

          <p onClick={()=> speciality === 'General physician' ? navigate('/doctors') : navigate('/doctors/General physician')} 
          className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "General physician" ? "bg-indigo-100 text-black" : ""}`}>General physician</p>

          <p onClick={()=> speciality === 'Gynecologist' ? navigate('/doctors') : navigate('/doctors/Gynecologist')} 
          className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Gynecologist" ? "bg-indigo-100 text-black" : ""}`}>Gynecologist</p>

          <p onClick={()=> speciality === 'Dermatologist' ? navigate('/doctors') : navigate('/doctors/Dermatologist')} 
          className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Dermatologist" ? "bg-indigo-100 text-black" : ""}`}>Dermatologist</p>

          <p onClick={()=> speciality === 'Pediatricians' ? navigate('/doctors') : navigate('/doctors/Pediatricians')} 
          className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Pediatricians" ? "bg-indigo-100 text-black" : ""}`}>Pediatricians</p>

          <p onClick={()=> speciality === 'Neurologist' ? navigate('/doctors') : navigate('/doctors/Neurologist')} 
          className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Neurologist" ? "bg-indigo-100 text-black" : ""}`}>Neurologist</p>

          <p onClick={()=> speciality === 'Gastroenterologist' ? navigate('/doctors') : navigate('/doctors/Gastroenterologist')} 
          className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Gastroenterologist" ? "bg-indigo-100 text-black" : ""}`}>Gastroenterologist</p>

        </div>

        {
          showFilter && 

          <div className="flex flex-col gap-4 text-sm text-gray-600 md:hidden">

          <p onClick={()=> {speciality === 'General physician' ? navigate('/doctors') : navigate('/doctors/General physician'); setShowFilter(!showFilter)}} 
          className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "General physician" ? "bg-indigo-100 text-black" : ""}`}>General physician</p>

          <p onClick={()=> {speciality === 'General physician' ? navigate('/doctors') : navigate('/doctors/General physician'); setShowFilter(!showFilter)}}
          className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Gynecologist" ? "bg-indigo-100 text-black" : ""}`}>Gynecologist</p>

          <p onClick={()=> {speciality === 'General physician' ? navigate('/doctors') : navigate('/doctors/General physician'); setShowFilter(!showFilter)}}
          className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Dermatologist" ? "bg-indigo-100 text-black" : ""}`}>Dermatologist</p>

          <p onClick={()=> {speciality === 'General physician' ? navigate('/doctors') : navigate('/doctors/General physician'); setShowFilter(!showFilter)}}
          className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Pediatricians" ? "bg-indigo-100 text-black" : ""}`}>Pediatricians</p>

          <p onClick={()=> {speciality === 'General physician' ? navigate('/doctors') : navigate('/doctors/General physician'); setShowFilter(!showFilter)}}
          className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Neurologist" ? "bg-indigo-100 text-black" : ""}`}>Neurologist</p>

          <p onClick={()=> {speciality === 'General physician' ? navigate('/doctors') : navigate('/doctors/General physician'); setShowFilter(!showFilter)}}
          className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Gastroenterologist" ? "bg-indigo-100 text-black" : ""}`}>Gastroenterologist</p>

          </div>

        }

        <div className="w-full grid [grid-template-columns:repeat(auto-fill,_minmax(200px,_1fr))] gap-4 gap-y-6">
          {
            filterDoc.map((item, index)=>(
                    <div  onClick={()=>navigate(`/appointment/${item._id}`)}
                    className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
                    key={index}>
                         <img className="bg-blue-50" 
                         src={item.image} alt="doctor-image" />
                         <div className="p-4">

                            <div className={`flex items-center gap-2 text-sm text-center ${item.available ? 'text-green-500' : 'text-gray-500'}`}>
                                <p className={`w-2 h-2 ${item.available ? 'bg-green-500' : 'bg-gray-500'} rounded-full`}></p><p>{item.available ? 'Available' : 'Not available'}</p>
                            </div> 
                            <p className="text-gray-900 text-lg font-medium">{item.name}</p>
                            <p className="text-gray-600 text-sm">{item.speciality}</p>
                         </div>
                    </div>
                ))
          }
        </div>

      </div>
    </div>
  )
}

export default Doctors