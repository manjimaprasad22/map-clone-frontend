import React from 'react'
import banner from '../assest/banner.jpg'
import '../assest/style.css'

const LoginBanner = () => {
  return (
    <div>
      <img src={banner} alt="" className='banner' />
    </div>
  )
}

export default LoginBanner