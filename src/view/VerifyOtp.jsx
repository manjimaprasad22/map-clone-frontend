import React from 'react'
import LoginBanner from '../components/LoginBanner'
import Login from '../components/Login'
import '../assest/style.css'
import '../assest/resposive.css'
import OtpComp from '../components/OtpComp'

const VerifyOtp = () => {
  return (
    <div className='container d-flex full-verify'>
    <div className="col-6 d-none d-lg-block">
      <LoginBanner/>
    </div>
    <div className="col-12 col-lg-6 detail-otp">
      <OtpComp/>
    </div>
  </div>
  )
}

export default VerifyOtp
