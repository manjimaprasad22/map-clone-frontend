import React, { useEffect } from 'react'
import Googlemap from '../components/Googlemap'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const token = localStorage.getItem("accessToken")
  const navigate= useNavigate()
  useEffect(() => {
   if(!token){
    navigate('/')
   }
  }, [])
  
  return (
    <div>
      <Googlemap/>
    </div>
  )
}

export default Home
