import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import search_icon from '../assets/search.png'
import wind_icon from '../assets/wind.png'
import humidity_icon from '../assets/humidity.png'

const Weather = () => {
  const [weatherarr,setweatherar]=useState({})
  const inputref=useRef('')
  useEffect(()=>{
    search('New Delhi')
  },[])
   async function search(city){
    if(city===''){
      alert('Enter City name')
      return
    }
    try{
      const url=`https://api.weatherapi.com/v1/current.json?key=1c2ab0eeb5ab4c3eba1100456250104&q=${city}&aqi=no`
      const response=await fetch(url)
      const data=await response.json()
      console.log(data)

      if (data.error) {
        alert('City not found! Please try another one.')
        return
      }

      if(data.current&&data.location){
      setweatherar({
        humidity:data.current.humidity,
        windSpeed:data.current.wind_kph,
        temperature:data.current.temp_c,
        location:data.location.name,
        icon:data.current.condition.icon
      })}
       inputref.current.value = ''
    }catch(e){
      console.log(e)
    }
   }
  return (
    <div className='weather'>
      <div className="searchbar">
        <input  ref={inputref} type='text' placeholder='search' />
        <img src={search_icon} alt='' onClick={()=>search(inputref.current.value)}/>
      </div>
      <img src={weatherarr.icon} alt='' className='weathericon' />
      <p className='temperature'>{weatherarr.temperature??'...Loading...'}{String.fromCharCode(176)}C</p>
      <p className='location'>{weatherarr.location}</p>
      <div className='weatherdata'>
        <div className='col'>
          <img src={humidity_icon} alt='' />
          <div>
            <p>{weatherarr.humidity}%</p>
            <span>Humidity</span>
          </div>
        </div>
        <div className='col'>
          <img src={wind_icon} alt='' />
          <div>
            <p>{weatherarr.windSpeed} km/h</p>
            <span>Wind Speed</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Weather
