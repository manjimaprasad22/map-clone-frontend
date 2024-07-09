import React from 'react'
import LoginBanner from '../components/LoginBanner'
import '../assest/style.css'
import '../assest/resposive.css'
import Register from '../components/Register'

const Singup = () => {
  return (
    <div className='container d-flex full-login'>
    <div className="col-6 d-none d-lg-block">
      <LoginBanner/>
    </div>
    <div className="col-12 col-lg-6 detail">
      <Register/>
    </div>
  </div>
  )
}

export default Singup
